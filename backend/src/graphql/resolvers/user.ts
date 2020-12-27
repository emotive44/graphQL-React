import { ApolloError, UserInputError } from 'apollo-server-express';

import User, { IUser } from '../../models/User';
import { validateRegisterInput } from '../../validators/user';

interface IRegisterInput {
  email: string
  username: string
  password: string
}

type TExistUser = IUser | null;

export default {

  Query: {
    hi: () => 'hi'
  },

  Mutation: {
    async registerUser (_: any, { registerInput }: { registerInput: IRegisterInput }) {
      const { errors, valid } = validateRegisterInput(registerInput);

      if(!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const { username, email, password } = registerInput;
      let existUser: TExistUser;

      try {
        existUser = await User.findOne({ email });
      } catch (error) {
        throw new ApolloError('Register failed, please try again', '500');
      }

      if(existUser) {
        throw new UserInputError('User exist already, you can try with new data', {
          errors: {
            email: 'This email is taken.'
          }
        });
      }

      const newUser = new User({
        email,
        username,
        password,
      });

      try {
        await newUser.save();
      } catch (err) {
        throw new ApolloError('Register failed, please try again', '500');
      }

      return {
        id: newUser.id,
        email: newUser.email,
        username: newUser.email
      }
    },
  }
}