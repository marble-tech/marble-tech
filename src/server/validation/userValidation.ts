import { User } from '../entities/User';
import * as joi from 'joi';

export function validateUser(user: User) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    f_name: joi.string().required(),
    l_name: joi.string().required()
    // The strip unknown options removes unknown elements from 
    // objects and arrays, blocking their inclusion in the database 
  }).options({ stripUnknown: true });

  return joi.validate(user, schema);
}


export function validateLogin(info: any) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }).options({ stripUnknown: true });

  return joi.validate(info, schema);
}