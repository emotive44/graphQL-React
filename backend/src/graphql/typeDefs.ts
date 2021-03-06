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
    token: String!
    email: String!
    username: String!
  }

  type Post {
    id: ID!
    text: String!
    creator: User!
  }

  type Query {
    getUsers(page: Int): [User]!
    getPosts: [Post]!
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User!
    loginUser(loginInput: LoginInput): User!
    createPost(text: String!): Post!
  }

  type Subscription {
    newPost: Post!
  }
`;