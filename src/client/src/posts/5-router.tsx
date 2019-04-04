import React from 'react';
import Col from 'react-bootstrap/Col';
import { CodeBlock } from '../lib/components/codeBlock/codeBlock';

export function router(props?:any) {
    return <Col>

  <h2>Creating the Routes and App Router</h2>

  <p>
  To be able to access the different routes (endpoints) in the application we need to create two routes files <code>userRoutes</code> and <code>articleRoutes</code> and a <code>router</code> that will deal with the API routing.

  Create a new folder called <code>routes</code> inside the <code>server</code> folder. Please place these two files inside it:
  </p>
<CodeBlock>
  {`//my-project/src/server/routes/userRoutes.ts

import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => res.send('<h1>get all users</h1>'));
routes.get('/:id', (req, res) => res.send('get user by id'));
routes.get('/:id/roles/add/:roleId', (req, res) => res.send('add role to user'));
routes.get('/:id/roles/remove/:roleId', (req, res) => res.send('remove role from user'));

routes.post('/', (req, res) => res.send('create user'));

routes.patch('/:id', (req, res) => res.send('update user'));

routes.delete('/:id', (req, res) => res.send('delete user'));

export default routes;`}
</CodeBlock>
<CodeBlock>
{`//my-project/src/server/routes/articleRoutes.ts
import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => res.send('<h1>get all articles</h1>'));
routes.get('/:id', (req, res) => res.send('get article by id'));

routes.post('/', (req, res) => res.send('create article'));

routes.patch('/:id', (req, res) => res.send('update an article'));

routes.delete('/:id', (req, res) => res.send('delete an article'));

export default routes;

`}
</CodeBlock>

<p>
To be able to access these routes we still need to create a <code>router.ts</code> file inside the <code>server</code> folder:
</p>
<CodeBlock>
{`//my-project/src/server/router.ts

import articleRoutes from './routes/articleRoutes';
  import userRoutes from './routes/userRoutes';

  export const router = [
    {path: '/articles', endpoints: articleRoutes},
    {path: '/users', endpoints: userRoutes}
  ];`}  
</CodeBlock>
<p>
Finally we need to import this newly created router into the <code>app.ts</code> file and initialize it:
</p>
<CodeBlock>
  {`//my-project/src/server/app.ts

import express from 'express';
import { createDbConnection } from './config/db';
import { router } from './router'; // Add this line

export async function createApp() {

  await createDbConnection();

  const app = express();

  // For each route in the router profide the path and response
  router.forEach(route => { // Add this loop
    app.use(\`/api/v1\${route.path}\`, route.endpoints);
  });
  
  app.get('/', (req, res) =>{
    res.send('<h2>It\'s working</h2>');
  });

  return app;
}`}</CodeBlock>
<p>These routes are not doing anything smart for now, they are only returning some dummy text as the response. Run the app with the command <code>npm start</code>, open your browser and type the following routes in the browser address:
</p>
 <p>localhost:3000/api/v1/users</p>

  <img src='/images/getAllUsersRoute.png' width='100%'></img>

  <p>localhost:3000/api/v1/articles</p>

  <img src='/images/getAllArticlesRoute.png' width='100%'></img>

</Col>
}
