import type { NextFunction, Response, Request } from 'express';
import type { HydratedDocument } from 'mongoose';
import { User } from '../model/User';
import type { UserFields, UserMethods } from '../types';

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields, UserMethods>;
}

export const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const headerValue = req.get('Authorization');

  if (!headerValue) {
    return res.status(401).send({ error: 'Header "Authorization" not found' });
  }

  const [_bearer, token] = headerValue.split(' ');

  if (!token) {
    return res.status(401).send({ error: 'Token not found' });
  }

  const user = await User.findOne({ token });

  if (!user) {
    return res.status(401).send({ error: 'Wrong Token!' });
  }

  req.user = user;

  return next();
};
