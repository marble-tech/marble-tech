import * as joi from 'joi';
import { Challenge, ChallengeLevel } from '../entities/Challenge';

const creationSchema = joi.object({
  // Declare Joi Schema so we can validate challenges
    title: joi
      .string()
      .required(),
    description: joi
      .string()
      .required(),
    sampleAnswer: joi
      .string()
      .required(),
    level: joi
      .string()
      .valid([ChallengeLevel.ADVANCED, ChallengeLevel.BASIC, ChallengeLevel.INTERMEDIATE])
      .required(),
    appFile: joi
      .string()
      .required(),
    testFile: joi
      .string()
      .required()
      // The strip unknown options removes unknown elements from 
      // objects and arrays, blocking their inclusion in the database 
    }).options({stripUnknown: true});

    const updateSchema = joi.object({
      // Declare Joi Schema so we can validate challenges
        title: joi
          .string(),
        description: joi
          .string(),
        sampleAnswer: joi
          .string(),
        level: joi
          .string()
          .valid([ChallengeLevel.ADVANCED, ChallengeLevel.BASIC, ChallengeLevel.INTERMEDIATE]),
        appFile: joi
          .string(),
        testFile: joi
          .string()
          // The strip unknown options removes unknown elements from 
          // objects and arrays, blocking their inclusion in the database 
        }).options({stripUnknown: true});
    

export function validateChallenge(challenge: Challenge){
  return joi.validate(challenge, creationSchema);
}

export function validateUpdatedChallenge(challenge: Challenge){
  return joi.validate(challenge, updateSchema);
}