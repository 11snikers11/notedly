import { gql } from 'apollo-server-express';
import { typeDefs } from 'graphql-scalars';

export default gql`
  type Note {
    id: ID!
    content: String!
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
    favoriteCount: Int!
    favoritedBy: [User!]
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
    favorites: [Note!]!
  }

  type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Query {
    notes: [Note!]!
    note(_id: ID!): Note!
    noteFeed(cursor: String): NoteFeed
    user(username: String!): User
    users: [User!]!
    me: User!
  }

  type Mutation {
    newNote(content: String!): Note!
    updateNote(_id: ID!, content: String!): Note!
    deleteNote(_id: ID!): Boolean
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
    toggleFavorite(_id: ID!): Note!
  }

  ${typeDefs}
`;
