import { gql } from "apollo-server-express";


export default gql`
  input RegisterInput {
    email: String!
    username: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    email: String!
    username: String!
  }

  type Query {
    hi: String!
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User!,
    loginUser(loginInput: LoginInput): User!
  }
`;