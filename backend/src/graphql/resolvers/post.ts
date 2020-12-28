import { ApolloError, UserInputError, AuthenticationError, PubSub } from 'apollo-server-express';
import { Request } from 'express';

import Post from '../../models/Post';
import { validatePostInput } from '../../validators/post';
import { TExistUser } from './user';
import User from '../../models/User';


interface IContext {
  req: Request,
  pubsub: PubSub
}

export default {
  Query: {

  },

  Mutation: {
    async createPost(_: any, { text }: { text: string }, context: IContext) {
      const { req, pubsub } = context;

      if(!req.authUser) {
        throw new AuthenticationError('You need be authenticated, to create post');
      }

      const { errors, valid } = validatePostInput({ text });

      if(!valid) {
        throw new UserInputError('Errors', { errors })
      }

      let existUser: TExistUser;
      try {
        existUser = await User.findById(req.authUser.id);
      } catch (error) {
        throw new ApolloError('Creating post failed, please try again', '500');
      }

      if(!existUser) {
        throw new UserInputError('User with this id, does not exist in database');
      }

      const newPost = new Post({
        text,
        creator: req.authUser.id
      });

      try {
        await newPost.save();
      } catch (err) {
        throw new ApolloError('Creating post failed, please try again', '500');
      }

      pubsub.publish('NEW_POST', { newPost: newPost });

      return newPost;
    }
  },

  Subscription: {
    newPost: {
      subscribe(_: any, __: any, { pubsub }: { pubsub: PubSub }) {
        return pubsub.asyncIterator('NEW_POST');
      }
    }
  }
}