import React from 'react';
import Col from 'react-bootstrap/Col';
import { CodeBlock } from '../lib/components/codeBlock/codeBlock';

export function controllers(props?:any) {
    return <Col>
<h2>Creating the Controllers</h2>
<p>The controller classes will be responsible for receiving the HTTP requests, dealing with services to process what was requested and sending a response back to the client that accessed its endpoint.
 For our application we only need to build two controllers. Please create a new folder named <code>controllers</code> inside the <code>server</code> folder and place these two classes:
</p>
<CodeBlock>
  {`//my-project/src/server/controllers/userController.ts

import { ProfileImage } from './../entities/ProfileImage';
import { ProfileImageService } from './../services/profileImageService';
import { UserService } from './../services/userService';
import { Request, Response } from 'express';
import { validateUser } from '../validation/userValidation';
import { RoleService } from '../services/roleService';

const userService = new UserService();
const roleService = new RoleService();
const imageService = new ProfileImageService();

export default class UserController {

  public constructor() { }

  public async create(req: Request, res: Response) {
    try {

      // Validate user input
      const validation = validateUser(req.body);

      // If any error return a Bad Request status and error details
      if(validation.error) return res.status(400).json(
        {error: validation.error.details}
      );

      // Create a new user with given inputs
      let newUser = await userService.create(req.body);

      // Get the role 'user' with id = 1
      const userRole = await roleService.findById(1);

      // A file has been sent, create a profile image and assign it to the user
      if(req.file) {
        const profileImage = new ProfileImage(\`http://localhost:3000/\${req.file.path}\`)
        await imageService.create(profileImage, newUser);
      }

      // Get the create user from database
      const user = await userService.findById(newUser.id);

      // Add the 'user' role to the user
      await userService.addRole(userRole!, user!);

      // // Return the created user from database
      return res.status(201).json(user);

    }catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const values = req.body;

      // Validate user input
      const validation = validateUser(req.body);
      if(validation.error) return res.status(400).json(
        {error: validation.error.details}
      );

      // Find user by id
      const user = await userService.findById(id);
      // If the user is not found return a 404 'Not found' error
      if(!user) return res.status(404).json({error: \`User id \${id} not found\`});

      // Update user properties to passed values
      const updated = await userService.update(user, values);

      // Return updated user
      res.status(200).json(updated);
      
    }catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public async findAll(req: Request, res: Response) {
    try {
      // Find all users from database
      const users = await userService.findAll();

      // Return found users to client
      return res.status(200).json(users);

    }catch(error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  public async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      // Find user by id
      const user = await userService.findById(id);
      // If id does not exist, return a 404 'Not found' error
      if(!user) return res.status(404).json({error: \`User id \${id} not found\`});

      // Return found user
      return res.status(200).json(user);

    }catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      // Get id from request parameters
      const id = req.params.id;

      // Delete user from database
      const deleted = await userService.delete(id);

      // If no user deleted, return Not Found error
      if(deleted.affected === 0) return res.status(404).json({error: \`User id \${id} not found\`});
    
      // Return status OK with deletion message
      return res.status(200).json({message: \`User id \${id} deleted\`});
    
    }catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public async addRole(req: Request, res: Response) {
    try {
      const roleId = req.params.roleId;
      const userId = req.params.id;

      // Find user by id
      const user = await userService.findById(userId);
      // If id does not exist, return a 404 'Not found' error
      if(!user) return res.status(404).json({error: \`User id \${userId} not found\`});

      // Find role to be added by its id
      const role = await roleService.findById(roleId);
      // If role does not exist return a 404 'Not found' error
      if(!role) return res.status(404).json({error: \`Role id \${roleId} not found\`});

      // Add role to the user
      const updated = await userService.addRole(role, user);

      // Return updated user
      res.status(201).json(updated);

    }catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public async removeRole(req: Request, res: Response) {
    try {
      const roleId = req.params.roleId;
      const userId = req.params.id;

      // Find user by id
      const user = await userService.findById(userId);
      // If id does not exist, return a 404 'Not found' error
      if(!user) return res.status(404).json({error: \`User id \${userId} not found\`});

      // Find role by id
      const role = await roleService.findById(roleId);
      // If role does not exist return a 404 'Not found' error
      if(!role) return res.status(404).json({error: \`Role id \${roleId} not found\`});

      // Remove the passed role from user
      const updated = await userService.removeRole(roleId, user);

      // Return the updated user
      res.status(200).json(updated);

    }catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

}
  `}
</CodeBlock>
<CodeBlock>
  {`//my-project/src/server/controllers/articleController.ts

import { UserService } from './../services/userService';
import { Request, Response } from 'express';
import { ArticleService } from '../services/articleService';
import { validateArticle } from '../validation/articleValidation';

const articleService = new ArticleService();
const userService = new UserService();

export class ArticleController {

  public constructor() { }

  public async create(req: Request, res: Response) {
    try {
      const userId = req.body.userId;

      // Create a new article from request body
      const newArticle = req.body.article;

      // Validate article input
      const validation = validateArticle(newArticle);

      // If any error return a Bad Request status and error details
      if(validation.error) return res.status(400).json(
        {error: validation.error.details}
      );

      // Find user by id
      const user = await userService.findById(userId);
      // If user does not exist return a 404 'Not found' error
      if(!user) return res.status(404).json({error: \`User id \${userId} not found\`});

      // Create a new article with given inputs and the owner user
      const article = await articleService.create(newArticle, user);

      // Return the created article from database
      return res.status(201).json(article);

    }catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const values = req.body;

      // Validate user input
      const validation = validateArticle(req.body);
      if(validation.error) return res.status(400).json(
        {error: validation.error.details}
      );

      // Find article by id
      const article = await articleService.findById(id);
      // If article does not exist return a 404 'Not found' error
      if(!article) return res.status(404).json({error: \`Article id \${id} not found\`});

      // Update article with passed values
      const updated = await articleService.update(article, values);

      // Return the updated article
      res.status(200).json(updated);
      
    }catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public async findAll(req: Request, res: Response) {
    try {
      // Find all articles from database
      const articles = await articleService.findAll();

      // Return all found articles
      return res.status(200).json(articles);

    }catch(error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  public async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      // Find article by id
      const article = await articleService.findById(id);
      // If article does not exist return a 404 'Not found' error
      if(!article) return res.status(404).json({error: \`Article id \${id} not found\`});

      // Return article to the client
      return res.status(200).json(article);

    }catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      // Get id from request parameters
      const id = req.params.id;

      // Delete article from database
      const deleted = await articleService.delete(id);

      // If no article deleted, return Not Found error
      if(deleted.affected === 0) return res.status(404).json({error: \`Article id \${id} not found\`});
    
      // Return status OK with deletion message
      return res.status(200).json({message: \`Article id \${id} deleted\`});
    
    }catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

}
  `}
</CodeBlock>
<p>We have created a method to deal with each one of the user and article routes we have previously created.
 To link these methods to the API routes we have to change the user and article routes a little bit:

</p>

<CodeBlock>
  {`//my-project/src/server/routes/userRoute.ts

import express from 'express';
import UserController from '../controllers/userController';
import { uploader } from '../services/fileUploaderService';

// Initialise user controller
const userController = new UserController();

// Create a new express router
const routes = express.Router();

// Add routes to the router

routes.get('/', userController.findAll);
routes.get('/:id', userController.findById);
routes.get('/:id/roles/add/:roleId', userController.addRole);
routes.get('/:id/roles/remove/:roleId', userController.removeRole);

routes.post('/', uploader.single('profileImage'), userController.create);

routes.patch('/:id', userController.update);

routes.delete('/:id', userController.delete);

export default routes;
  `}
</CodeBlock>
<CodeBlock>
  {`//my-project/src/server/routes/articleRoute.ts

import { ArticleController } from './../controllers/articleController';
import express from 'express';

// Initialise user controller
const articleController = new ArticleController();

// Create a new express router
const routes = express.Router();

// Add routes to the router

routes.get('/', articleController.findAll);
routes.get('/:id', articleController.findById);

routes.post('/', articleController.create);

routes.patch('/:id', articleController.update);

routes.delete('/:id', articleController.delete);

export default routes;
  `}
</CodeBlock>
</Col>
}