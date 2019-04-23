import { ChallengeService } from '../services/challengeService';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

const challengeService = new ChallengeService();

/**
 * Write a test file to file system
 * @param req 
 * @param res 
 * @param next 
 */
export async function testFileWritter(req: Request, res: Response, next: NextFunction) {
  // Get challenge id from request
  const challengeId = +req.params.id;
  // Get user attempt from body
  const challengeAnswer = req.body;
  // Get the challenge from database
  const challenge = await challengeService.findById(challengeId);
  // Get logged user ID
  const userId = (req as any).userId;

  // Create app file to be tested
  const appFile = await new Promise<any>(async (resolve, reject) => {
    // Set filename to be created
    const filename = `tempChallenges/app${userId}.ts`;
    (req as any).appFilePath = filename;
    // Extract appFile content from challenge
    const challengeAppFile = challenge!.appFile;
    // Insert user answer to challengeAppFile
    const content = challengeAppFile.replace('// insert answer here', challengeAnswer);
    // Create user application file to be tested
    fs.writeFile(
      filename,
      content,
      (error) => {
        if (error) reject(error);
        else resolve(`Created: ${filename}`);
      }
    );
  });
  // Log file status to console
  console.log(appFile);

  // Create challenge test file
  const testFile = await new Promise<any>(async (resolve, reject) => {
    // Set filename to be created
    const filename = `tempChallenges/test${userId}.test.ts`;
    (req as any).testFilePath = filename;
    const challengeTestFile = challenge!.testFile;
    // Extract sample answer from challenge
    const content = challengeTestFile.replace('testFilename', `app${userId}`);
    // Create challenge test file
    fs.writeFile(
      filename,
      content,
      (error) => {
        if (error) reject(error);
        else resolve(`Created: ${filename}`);
      }
    );
  });
  // Log file status to console
  console.log(testFile);

  // Clear test cache 
  var testModule = require.resolve(`./../../../tempChallenges/test${userId}.test.ts`);
  delete require.cache[testModule];

  // Clear test cache 
  var testModule2 = require.resolve(`./../../../tempChallenges/app${userId}.ts`);
  delete require.cache[testModule2];

  // Procedes to next middleware / controller
  next();
}