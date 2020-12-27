import { ApolloError, UserInputError } from 'apollo-server-express';

import Post, { IPost } from '../../models/Post';
import { validatePostInput } from '../../validators/post';
import { TExistUser } from './user';
import User from '../../models/User';


export default {
  Query: {

  },

  Mutation: {
    async createPost(_: any, { text, creator }: { text: string, creator: string }) {
      const { errors, valid } = validatePostInput({ text, creator });

      if(!valid) {
        throw new UserInputError('Errors', { errors })
      }

      let existUser: TExistUser;
      try {
        existUser = await User.findById(creator);
      } catch (error) {
        throw new ApolloError('Creating post failed, please try again', '500');
      }

      if(!existUser) {
        throw new UserInputError('User with this id, does not exist in database');
      }

      const newPost = new Post({
        text,
        creator
      });

      try {
        await newPost.save();
      } catch (err) {
        throw new ApolloError('Creating post failed, please try again', '500');
      }

      return newPost;
    }
  }
}