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

export const CREATE_POST = gql`
  mutation CreatePost($text: String!) {
    createPost(text: $text) {
      id,
      text,
      creator {
        username
      }
    }
  }
`

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

export const GET_USERS = gql`
  {
    getUsers {
      id,
      email,
      username,
    }
  }
`;

export const NEW_POST = gql`
  subscription {
    newPost {
      id,
      text,
      creator {
        username
      }
    }
  }
`;