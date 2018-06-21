import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import '../styles/User.css';
import { Card } from "semantic-ui-react";

const User = () => (
  <Query
    
    query={gql`
      {
        users(name: "Dan Stathos") {
          name
          maId
          opcoDistrictId
        }
      }
    `}
  >
    
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      return (
        
          <div className="User">
            <Card raised>
            {data.users.map(props => (
              <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                <Card.Meta>Unique ID: {props.maId}</Card.Meta>
                <Card.Meta>Opco Code: {props.opcoDistrictId}</Card.Meta>
              </Card.Content>
              ))}
            </Card>
          </div>
      );
    }}
  </Query>
);

export default User;