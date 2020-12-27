import { ApolloError, UserInputError } from 'apollo-server-express';

import User, { IUser } from '../../models/User';
import { validateRegisterInput, validateLoginInput } from '../../validators/user';

interface IRegisterInput {
  email: string
  username: string
  password: string
}

interface ILoginInput {
  email: string
  password: string
}

export type TExistUser = IUser | null;

export default {

  Query: {
    async getUsers (_:any, { page } : { page: number }) {
      let users: IUser[] = [];
      const perPage = 1;
      const currPage = page || 1;

      console.log(page)

      try {
        users = await User
          .find()
          .skip((currPage - 1) * perPage)
          .limit(perPage)
          .select('-password');
      } catch (err) {
        throw new ApolloError('Fetching users failed, please try again.', '500');
      }
    
      if (users.length < 1) {
        throw new ApolloError('Sorry, do not have more users', '404');
      }

      return users;
    }
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

    async loginUser(_: any, { loginInput }: { loginInput: ILoginInput }) {
      const { errors, valid } = validateLoginInput(loginInput);

      if(!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const { email, password } = loginInput;

      let existUser: TExistUser;
      try {
        existUser = await User.findOne({ email });
      } catch (err) {
        throw new ApolloError('Login failed, please try again.', '500');
      }

      if (!existUser) {
        throw new UserInputError('Invalid email or password.');
      }
      
      let isValidPass = false;
      try {
        isValidPass = await existUser.comparePassword(password);
      } catch (err) {
        throw new ApolloError('Login failed, please try again.', '500');
      }

      if (!isValidPass) {
        throw new UserInputError('Invalid email or password, login failed.');
      }


      return {
        id: existUser.id,
        email: existUser.email,
        username: existUser.username
      }
    }
  }
}