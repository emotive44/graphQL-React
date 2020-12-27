import userResolvers from './user';
import postResolvers from './post';

export default {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  }
}