import jwt from 'jsonwebtoken';
import env from '../config';


export default (email: string, userId: string) => {
  return jwt.sign({ email, userId }, env.JWT_SECRET, { expiresIn: '1h' });
}