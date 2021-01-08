import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(
      loginInput: {
        email: $email,
        password: $password
    }) {
      id,
      token,
      username
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $username: String!) {
    registerUser(
      registerInput: {
        email: $email,
        username: $username,
        password: $password
    }) {
      id,
      token,
      username
    }
  }
`;

export const GET_POSTS = gql`
  {
    getPosts {
      id,
      text,
      creator{
        username
      }
    }
  }
`;