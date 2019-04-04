
import React from 'react';
import Col from 'react-bootstrap/Col';
import { CodeBlock } from '../lib/components/codeBlock/codeBlock';

export function services(props?:any) {
    return <Col>
<h2>Creating the Services</h2>
<p>
The service classes will be used to abstract data manipulation and logic implementation from our future controller classes, leaving the controllers responsible only for calling methods from the services classes.
 We are going to create five services, one for each entity and a file uploader service to be able to upload profile pictures. Inside the <code>server</code> folder create a new folder called <code>services</code> and place these five files:
</p>
    <CodeBlock>
{`//my-project/src/server/services/userService.ts

import { User } from './../entities/User';
import { userRepository } from "../repositories/userRepository";
import { Role } from '../entities/Role';

export class UserService {

  public constructor() { }

  public create(newUser: User) {
    // Create a new user object
    const user = new User(
      newUser.firstName, newUser.lastName, 
      newUser.email, newUser.password
    );
    // Save user in database and return it
    return userRepository().save(user);
  }

  public save(user: User) {
    // Save user in database and return it
    return userRepository().save(user);
  }

  public findAll() {
    // Find all users in database and return then with the profile image and roles
    return userRepository().find({ relations: ['profileImage', 'roles'] });
  }

  public findById(id: number){
    // Find a user by id and return it with the profile image and roles
    return userRepository().findOne(id, { relations: ['profileImage', 'roles'] });
  }

  public update(user: User, values: any) {
    // Get all properties to be updated
    const properties = Object.keys(values);
    // For each property update in user
    properties.forEach(property => {
      (user as any)[property] = values[property];
    });
    // Save and return the updated user
    return userRepository().save(user);
  }

  public delete(id: number){
    // Delete a user by id
    return userRepository().delete(id);
  }

  public addRole(role: Role, user: User) {
    // Add role in the user's roles
    user.roles.push(role);
    // Save and return the user
    return userRepository().save(user);
  }

  public removeRole(role: Role, user: User) {
    // Remove the passed role from user roles
    user.roles = user.roles.filter(r => r.name !== role.name);
    // Save and return the user
    return userRepository().save(user);
  }

}`}</CodeBlock>
<CodeBlock>
  {`//my-project/src/server/services/articleService.ts

import {User } from './../entities/User';
import {Article } from './../entities/Article';
import{articleRepository } from "../repositories/articleRepository";

export class ArticleService{

  public constructor(){ }

  public create(newArticle: Article, user: User) {
    // Asign the user as the article's owner
    newArticle.user = user;
    // Save the article and return it
    return articleRepository().save(newArticle);
  }

  public findAll(){
    // Find all articles in database
    return articleRepository().find();
  }

  public findById(id: number){
    // Find an article by id in database
    return articleRepository().findOne(id, {relations: ['user']});
  }

  public update(article: Article, values: any) {
    // Get all properties to be updated
    const properties = Object.keys(values);
    // For each property update in the article
    properties.forEach(property => {
      (article as any)[property] = (values)[property];
    });
    // Save and return the updated article
    return articleRepository().save(article);
  }

  public delete(id: number) {
    // Delete an article by id 
    return articleRepository().delete(id);
  }

}`}</CodeBlock>
  <CodeBlock>
    {`//my-project/src/server/services/roleService.ts

import {roleRepository } from "../repositories/roleRepository";

export class RoleService {

  public constructor(){ }

  public findAll() {
    // Find all roles in database
    return roleRepository().find();
  }

  public findById(id: number) {
    // Find an article by id and return it
    return roleRepository().findOne(id);
  }

}
  `}
  </CodeBlock>
  <CodeBlock>
    {`//my-project/src/server/services/profileImageService.ts

import { User } from './../entities/User';
import { ProfileImage } from './../entities/ProfileImage';
import { profileImageRepository } from "../repositories/profileImageRepository";

export class ProfileImageService {

  public constructor(){ }

  public create(image: ProfileImage, user: User) {
    // Assign a user to the profile image
    image.user = user;
    // Save and return it
    return profileImageRepository().save(image);
  }

}
    `}
  </CodeBlock>
<CodeBlock>
  {`//my-project/src/server/services/fileUploaderService.ts

import multer from 'multer';
import{ Request } from 'express';

// Set the file destination folder and it's filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/images'),
  filename: (req, file, cb) => cb(null, new Date().toISOString() + file.originalname)
});

// Accepts only 'jpeg' and 'png' image formats
const fileFilter = (req: Request, file: any, cb: any) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
}

// Return the uploader setting the max image size to 5MB
export const uploader = multer({
  storage: storage,
  limits: {fileSize: 1024*1024*5},
  fileFilter: fileFilter
});`}</CodeBlock>
<p>
We have informed multer to store the images in the <strong>my-project/uploads/images</strong> directory, but it is not enough, we still need to create these new folders and inform express about this new route.
 Create a new folder called <code>uploads</code> inside the <code>my-project</code> root folder. Inside <code>uploads</code> create another folder called <code>images</code>. After that open the <code>app.ts</code> file and include a new route pointing to the new static folder:
</p>
<CodeBlock>
  {`//my-project/src/server/app.ts

import express from 'express';
import { createDbConnection } from './config/db';
import { router } from './router';

export async function createApp() {

  // Create database connection
  await createDbConnection();

  // Create express application
  const app = express();

  // For each route in the router use the route endpoint
  router.forEach(route => {
    app.use(\`/api/v1\${route.path}\`, route.endpoints);
  });

  // Inform express to look for a new static route 'uploads/images'
  app.use('/uploads/images', express.static('uploads/images'));
  
  // Add route '/' to application
  app.get('/', (req, res) =>{
    res.send('<h2>It\'s working</h2>');
  });

  return app;
}`}
  </CodeBlock> 
</Col>
}
