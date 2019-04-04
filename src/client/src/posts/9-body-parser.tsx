import React from 'react';
import Col from 'react-bootstrap/Col';
import { CodeBlock } from '../lib/components/codeBlock/codeBlock';

export function bodyParser(props?:any) {
    return <Col>
      
     <h2>Implementing Body Parser</h2>

     <p>
      Now that our routes and controllers are implemented we will be able to access most of the endpoints, but not yet those that use POST methodos. Our express application can not read the values that are being passed through the body of the request. 
       To be able to do it we need to implement the bodyParser library. Open the app.ts file and tell express to use the bodyParser library:
     </p>

<CodeBlock>
  {`//my-project/src/server/app.ts

import express from 'express';
import { createDbConnection } from './config/db';
import { router } from './router';
import bodyParser from 'body-parser';

export async function createApp() {

  // Create database connection
  await createDbConnection();

  // Create express application
  const app = express();

  // Inform express to use bodyParser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // For each route define the path and endpoint
  router.forEach(route => {
    app.use(\`/api/v1\${route.path}\`, route.endpoints);
  });

  // Inform express to look for a new static route 'uploads/images'
  app.use('/uploads/images', express.static('uploads/images'));
  
  // Add route '/' to application
  app.get('/', (req, res) => {
    res.send("<h2>It\'s working</h2>");
  });

  // If a  path is not found return a 404 'Not found' error
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route not found'});
  });

  return app;
}`}
</CodeBlock>

</Col>}
