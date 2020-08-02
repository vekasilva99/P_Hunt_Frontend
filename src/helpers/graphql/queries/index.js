import gql from "graphql-tag";

export const CURRENT_USER = gql`
  {
    currentUser {
      _id
      role
      name
      lastName
      mail
      products {
        _id
        user {
          _id
          name
          lastName
        }
        name
        description
        logo
        link
        images
        votes
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const PRODUCTS_ORDERED = gql`
  {
    productsOrdered {
      _id
      user {
        _id
        name
        lastName
      }
      name
      description
      logo
      link
      images
      votes
      createdAt
      updatedAt
    }
  }
`;
