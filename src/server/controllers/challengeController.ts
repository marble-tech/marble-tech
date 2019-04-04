import { Request, Response } from 'express';
import { testRunner } from '../handlers/testRunner';
import { ChallengeService } from '../services/challengeService';
import { validateChallenge, validateUpdatedChallenge } from '../validation/challengeValidation';
import { Challenge } from '../entities/Challenge';
import { UserService } from '../services/userService';
import { UserChallengeService } from '../services/userChallengeService';
import { UserChallenge } from '../entities/UserChallenge';
import { testFileRemover } from '../handlers/testFileRemover';

const challengeService = new ChallengeService();
const userService = new UserService();
const userChallengeService = new UserChallengeService();

export class ChallengeController {

  public constructor() {
  }

  public async create(req: Request, res: Response) {
      try {
        //Validate against the schema
        const result = validateChallenge(req.body);

        //If not valid, return status 400 with message
        if (result.error)
          return res.status(400).json({ Error: "Challenge is not valid. Please check the parameters sent." });

        // save challenge
        const savedChallenge = await challengeService.create(req.body);

        // if challenge wasn't saved
        if (!savedChallenge) return res.status(404).json({ Error: "Challenge could not be saved." }) // return error if not found

        // if it was saved, sent status 200.
        res.status(200).json(savedChallenge).send();

      } catch (error) { // catch any exception
        console.log(error);
        res.status(500).json({
          Error: "Exception caught!"
        });
      }
  }

  public async update(req: Request, res: Response) {
      try {
        const id = req.params.id;
        const values = req.body;

        //Validate against the schema
        const result = validateUpdatedChallenge(req.body);

        //If not valid, return status 400 with message
        if (result.error)
          return res.status(400).json({ Error: "Challenge information is not valid. Please check the parameters sent." });

        // get challenge from id
        const challenge = await challengeService.findById(id);

        // if not found, send 404 and display message
        if (!challenge) return res.status(404).json({ error: `User id ${id} not found` });

        // update user by calling update function from service, giving the challenge object and the values from body
        const updated = await challengeService.update(challenge, values);

        // return status 200 and the updated challenge.
        return res.status(200).json(updated);

      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
  }

  public async findAll(req: Request, res: Response) {
      try {
        const challengesRetrieved = await challengeService.findAll(); // get challenges from DB

        if (!challengesRetrieved) return res.status(404).json({ Error: "Challenges not found." }) // return error if not found

        // return status 200 and the challenges found
        return res.status(200).json(challengesRetrieved);

      } catch (error) { // catch any exception
        console.log(error);
        res.status(500).json({
          Error: "Exception caught!"
        });
      }
  }

  public async findById(req: Request, res: Response) {
      try {
        const id = req.params.id; // get challenge id by URL
        const challengeRetrieved = await challengeService.findById(id); // get challenge from DB

        if (!challengeRetrieved) return res.status(404).json({ Error: "Challenge not found." }) // return error if not found

        // return status 200 and the challenge found
        return res.status(200).json(challengeRetrieved);

      } catch (error) { // catch any exception
        console.log(error);
        res.status(500).json({
          Error: "Exception caught!"
        });
      }
  }

  public async delete(req: Request, res: Response) {
    try {
      // Get id from request parameters
      const id = req.params.id;

      // Delete challenge from database
      const deleted = await challengeService.delete(id);

      // If no challenge was deleted, return Not Found error
      if (!deleted) return res.status(404).json({ error: `Challenge id ${id} not found` });

      // Return status OK with deletion message
      return res.status(200).json({ message: `Challenge ID ${id} deleted` });

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  

  public async test(req: Request, res: Response) {
    try {
      const appFilePath = (req as any).appFilePath; // get app file path from request
      const testFilePath = (req as any).testFilePath; 
      const testResult = await testRunner(appFilePath, testFilePath);

      const loggedUser = await userService.findById((req as any).userId); // get user from DB
      if (!loggedUser) return res.status(404).json({ Error: "User not found." }) // return error if not found

      const challenge = await challengeService.findById(req.params.id); // get challenge from DB
      if (!challenge) return res.status(404).json({ Error: "Challenge not found." }) // return error if not found

      const userChallenge = new UserChallenge(loggedUser, challenge, new Date(), testResult.score, req.body);

      const savedInfo = await userChallengeService.create(userChallenge); // try to save UserChallenge

      if(!savedInfo) return res.status(400).json({ Error: "UserChallenge couldn't be saved."}) // return error if unsuccessful

      return res.status(200).json(testResult).send(); // return status 200 and the test results.

    } catch (error) {
      testFileRemover([(req as any).appFilePath, (req as any).testFilePath])
      // retrieve and clean error messages:

      // 1 - retrieve error text
      const errorText = error.diagnosticText;
      // 2 - remove color characters
      const cleanText = (errorText as string).replace((/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g), '');
      // 3 - remove line breaks
      const cleanestText = cleanText.replace((/\r?\n|\r/g), '');
      // 4 - split by dash symbol
      const errors = cleanestText.split(' - ');
      // 5 - get only strings that contains 'error'
      const onlyErrors = errors.filter((error)=>{
        if (error.includes('error')) return error;
      });
      // 6 - split by dot and retrieve only first substring
      const cleanErrors = onlyErrors.map((error)=> {
        return error.split('.')[0].concat('.');
      });
 
      console.log(cleanErrors);
      res.status(500).json(cleanErrors);
    }
  }

}