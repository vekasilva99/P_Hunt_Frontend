import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation($mail: String!, $password: String!, $role: String!) {
    userLogin(mail: $mail, password: $password, role: $role) {
      user {
        _id
        role
        name
        lastName
        mail
        createdAt
        updatedAt
      }
      token
      tokenExpiration
    }
  }
`;

export const REGISTER_USER = gql`
  mutation($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      _id
      name
      lastName
      mail
      password
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($updateInput: UpdateUserInput!) {
    updateUser(updateInput: $updateInput) {
      name
      lastName
      mail
    }
  }
`;

export const UPDATE_FOUNDER = gql`
  mutation($updateInput: UpdateUserInput!) {
    updateRepartidor(updateInput: $updateInput) {
      name
      lastName
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation($productInput: ProductInput!) {
    createProduct(productInput: $productInput) {
      _id
      user {
        _id
        name
        lastName
      }
      name
      description
      logo
      images
      link
    }
  }
`;

export const ADD_VOTE = gql`
  mutation($id: String!) {
    addVote(id: $id) {
      name
      votes
    }
  }
`;
