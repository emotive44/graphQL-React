import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import env from '../config';
import User from '../models/User'; 
import { TExistUser } from '../graphql/resolvers/user';


interface DecodedData {
  userId: string
  email: string
}

// use this code to add new property on request obejct
declare global {
  namespace Express {
    interface Request {
      authUser: TExistUser
    }
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.split('Bearer ')[1];

  if(!token) {
    return next();
  }
  
  const decodedData = jwt.verify(token, env.JWT_SECRET) as DecodedData;

  let authUser: TExistUser;
  try {
    authUser = await User.findById(decodedData.userId);
  } catch (error) {
    return next();
  }

  if(authUser) {
    req.authUser = authUser;
    return next();
  }
}