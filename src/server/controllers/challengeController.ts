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

/**
 * Challenge controller class
 */
export class ChallengeController {

  public constructor() {
  }

  /**
   * Create new challenge from body. If successful, returns saved challenge.
   * @param req containing challenge info.
   * @param res saved challenge
   */
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

  /**
   * Update challenge. If successful, returns updated challenge.
   * @param req challenge id and information to update
   * @param res updated challenge
   */
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

  /**
   * Retrieve all challenges.
   * @param req 
   * @param res 
   */
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

  /**
   * Retrieves challenge information using challenge ID.
   * @param req params containing id.
   * @param res challenge information
   */
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

  /**
   * Delete a challenge using challenge ID.
   * @param req params containing id.
   * @param res deletion result
   */
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
  
  /**
   * Run test using user's input, saving the result to the database. Returns test result.
   * @param req containing appfilepath and testfilepath information.
   * @param res test results
   */
  public async test(req: Request, res: Response) {
    try {
      // get app file path from request
      const appFilePath = (req as any).appFilePath; 
      // get test file path from request
      const testFilePath = (req as any).testFilePath; 
      // run test and retrieve the results
      const testResult = await testRunner(appFilePath, testFilePath);

      // get logged user, to save to DB.
      const loggedUser = await userService.findById((req as any).userId);
      if (!loggedUser) return res.status(404).json({ Error: "User not found." }) // return error if not found

      // get challenge info, to save to DB
      const challenge = await challengeService.findById(req.params.id); // get challenge from DB
      if (!challenge) return res.status(404).json({ Error: "Challenge not found." }) // return error if not found

      // create new instance of the UserChallenge entity, using the information provided
      const userChallenge = new UserChallenge(loggedUser, challenge, new Date(), testResult.score, req.body);
      
      // save this instance to the database.
      const savedInfo = await userChallengeService.create(userChallenge);
      if(!savedInfo) return res.status(400).json({ Error: "UserChallenge couldn't be saved."}) // return error if unsuccessful

      // return status 200 and the test results.
      return res.status(200).json(testResult).send();

    } catch (error) {
      // remove test files
      testFileRemover([(req as any).appFilePath, (req as any).testFilePath]);

      // retrieve error info as string[] and filter result to clear error messages.
      let errors = error.diagnosticText.split('\n') as Array<string>;
      errors = errors.filter(e => e !== '');
      
      // return error information
      res.status(500).json({Error: errors});
    }
  }
}