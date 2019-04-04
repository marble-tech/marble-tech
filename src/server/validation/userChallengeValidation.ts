import * as joi from 'joi';
import { UserChallenge } from '../entities/UserChallenge';

export function validateUserChallenge(userChallenge: UserChallenge){
  const schema = joi.object({
// Declare Joi Schema so we can validate challenges
  userId: joi
    .number()
    .required(),
  // challengeId: joi
  //   .number()
  //   .required(),
  // date: joi
  //   .date()
  //   .required(),
  score: joi
    .number()
    .required(),
  user_attempt: joi
    .string()
    .required(),
    // The strip unknown options removes unknown elements from 
    // objects and arrays, blocking their inclusion in the database 
  }).options({stripUnknown: true});

  return joi.validate(userChallenge, schema);
}