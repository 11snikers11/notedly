import Query from './query';
import Mutation from './mutations';
import Note from './note';
import User from './user';
import { resolvers } from 'graphql-scalars';

export default {
  Query,
  Mutation,
  Note,
  User,
  ...resolvers,
};
