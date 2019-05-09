import { User } from '../entities/User';
import * as joi from 'joi';

/**
 * Validates user creation
 * @param user 
 */
export function validateUser(user: User) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    f_name: joi.string().min(3).required(),
    l_name: joi.string().min(3).required(),
    username: joi.string().alphanum().min(6).max(11).required()
    // The strip unknown options removes unknown elements from 
    // objects and arrays, blocking their inclusion in the database 
  }).options({ stripUnknown: true });

  return joi.validate(user, schema);
}

/**
 * Validates user update
 * @param user 
 */
export function validateUserUpdate(user: User) {
  const schema = joi.object({
    password: joi.string().min(6).required(),
    f_name: joi.string().min(3).required(),
    l_name: joi.string().min(3).required(),
    username: joi.string().alphanum().min(6).max(11).required()
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
    password: joi.string().min(6).required(),
  }).options({ stripUnknown: true });

  return joi.validate(data, schema);
}