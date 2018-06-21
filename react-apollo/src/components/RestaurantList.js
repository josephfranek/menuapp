import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import '../styles/RestaurantList.css';
import { Table, Header } from "semantic-ui-react";

const RestaurantList = () => (
  <Query
    // this passes the gql query to the 'query' property of the 'Query' component
    // which is a react-apollo component
    //uses the 'render-prop-pattern' to share gql data with the UI
    query={gql`
      {
        restaurants(first: 10) {
          name
          primaryCat
          secondaryCat
          cuisines
          website
        }
      }
    `}
  >
    
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      return (
          <div className="RestaurantList">
            <Header as='h1'>
              Placeholder
            </Header>
              <Table celled inverted selectable>  
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Restaurant Name</Table.HeaderCell>
                    <Table.HeaderCell>Restaurant Type</Table.HeaderCell>
                    <Table.HeaderCell>Restaurant Style</Table.HeaderCell>
                    <Table.HeaderCell>Cuisine Type</Table.HeaderCell>
                    <Table.HeaderCell>Native Website</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                {data.restaurants.map(props => (
                  <Table.Row className="Table-rows">
                    <Table.Cell>{props.name}</Table.Cell>
                    <Table.Cell>{props.primaryCat}</Table.Cell>
                    <Table.Cell>{props.secondaryCat}</Table.Cell>
                    <Table.Cell>{props.cuisines}</Table.Cell>
                    <Table.Cell>{props.website}</Table.Cell>
                  </Table.Row>
                  ))}
                </Table.Body>
              </Table>
          </div>
      );
    }}
  </Query>
);

export default RestaurantList;