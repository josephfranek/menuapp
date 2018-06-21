//this is the neo4j integration which automates the resolvers
import { neo4jgraphql } from "neo4j-graphql-js";

export const typeDefs = `
type Sysco_MA {
  maId: String!
  name: String!
  opcoDistrictId: String!
  restaurants: [Restaurant] 
}

type Restaurant {
  _id: ID!
  name: String!
  primaryCat: String
  secondaryCat: String
  cuisines: String
  website: String
  categories(first: Int = 10, offset: Int = 0): [Category] @relation(name: "Belongs_To", direction: "IN")
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
    restaurants(name: String, first: Int = 10, offset: Int = 0): [Restaurant]
    users(name: String, first: Int = 10, offset: Int = 0): [Sysco_MA]
  
}
`;

export const resolvers = {
  Query: {
    restaurants: neo4jgraphql,
    users: neo4jgraphql
  }
};