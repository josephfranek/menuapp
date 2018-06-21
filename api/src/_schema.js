//this is the neo4j integration which automates the resolvers
import { neo4jgraphql } from "neo4j-graphql-js";

export const typeDefs = `
type Sysco_MA {
  maId: ID!
  maName: String!
  restaurants: [Restaurant] @cypher(statement: "match (m:Sysco_MA),(r:Restaurant) where m.maId = r.maId return r")
}

type Restaurant {
  _id: ID!
  name: String!
  primaryCat: String
  secondaryCat: String
  cuisines: String
  website: String
  categories: String
  items(first: Int = 10, offset: Int = 0): [MenuItem]
}

type Category {
  _id: ID!
  name: String!
  items(first: Int = 10, offset: Int = 0): [MenuItem] @relation(name: "Belongs_To", direction: "IN")
}

type MenuItem {
  _id: ID!
  name: String!
  description: String
  price: Float
}

type Query {
    restaurants(first: Int = 10, offset: Int = 0): [Restaurant]
  
}
`;

export const resolvers = {
  Query: {
    restaurants: (root, args, context) => {
      let session = context.driver.session();
      let query = "MATCH (restaurant:Restaurant) WHERE exists(restaurant.name) = true RETURN restaurant;"
      return session.run(query, args)
        .then( result => { return result.records.map(record => { return record.get("restaurant").properties })})
    },
  },
  Restaurant: {
    categories: (restaurant, _, context) => {
      let session = context.driver.session();
      let params = {restaurantId: restaurant.restaurantId}
      let query = `
        MATCH (r:Restaurant)<-[:Belongs_To]-(c:Category)
        WHERE r.restaurantId = $restaurantId
        RETURN c.name as category
      `;

      return session.run(query)
        .then( result => { return result.record.map(record => {return record.get("category").properties })})

    },
    items: (category, _, context) => {
      let session = context.driver.session();
      let query = `
        MATCH (c:Category)<-[:Belongs_To]-(i:MenuItem)
        WHERE c._id = $categoryId
        RETURN i.name, i.description AS item
      `;

      return session.run(query)
        .then( result => { return result.records.map(record => {return record.get("item").properties })})
    }
  }

};
