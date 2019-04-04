import React from 'react';
import Col from 'react-bootstrap/Col';
import { CodeBlock } from '../lib/components/codeBlock/codeBlock';

export function validations(props?:any) {
    return <Col>
    <h2>Implementing validation</h2>

    <p>To add a layer of validation in our API we will use a library called Joi. It provides functionalities to help on data validation. This library was already installed within the <code>npm install</code> command at the begining of this tutorial. 

<strong>To check all the project dependencies open the package.json file and check the dependencies object.</strong>

Create a new folder called <code>validation</code> inside the <code>server</code> folder and add these two files:</p>

    <CodeBlock>
{`//my-project/src/server/validation/userValidation.ts

import { User } from '../entities/User';
import * as joi from 'joi';

export function validateUser(user: User){
  const schema = joi.object({
    // Should be a string with at maximum 30 characters
    firstName: joi.string().max(30),
    // Should be a string with at maximum 50 characters
    lastName: joi.string().max(50),
    // Should be a string in an email format
    email: joi.string().email(),
    // Should be a string with at least 6 characters
    password: joi.string().min(6)
    // The strip unknown options removes unknown elements from 
    // objects and arrays, blocking their inclusion in the database 
  }).options({stripUnknown: true});

  return joi.validate(user, schema);
}`}
    </CodeBlock>
<CodeBlock>
  {`//my-project/src/server/validation/articleValidation.ts


import { Article } from '../entities/Article';
import * as joi from 'joi';

export function validateArticle(article: Article){
  const schema = joi.object({
    // Should be a string with at maximum 50 characters
    title: joi.string().max(50),
    // Should be a string with at minimum 50 characters
    content: joi.string().min(50),
    // The strip unknown options removes unknown elements from 
    // objects and arrays, blocking their inclusion in the database 
  }).options({stripUnknown: true});

  return joi.validate(article, schema);
}`}</CodeBlock>
<p>Before moving to the next step let's check our <strong>project folder structure</strong>. After all those changes it should look like this:</p>


<img src='/images/folderStructureAfterValidation.png' width='100%'></img>

</Col>}