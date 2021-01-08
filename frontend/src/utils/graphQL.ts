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