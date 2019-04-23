import { User } from '../entities/User';
import * as joi from 'joi';

/**
 * Validates user creation
 * @param user 
 */
export function validateUser(user: User) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    f_name: joi.string().required(),
    l_name: joi.string().required(),
    username: joi.string().required()
    // The strip unknown options removes unknown elements from 
    // objects and arrays, blocking their inclusion in the database 
  }).options({ stripUnknown: true });

  return joi.validate(user, schema);
}

/**
 * Validates the user login data
 * @param data 
 */
export function validateLogin(data: any) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }).options({ stripUnknown: true });

  return joi.validate(data, schema);
}