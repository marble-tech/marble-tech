import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CodeBlock } from '../lib/components/codeBlock/codeBlock';

export function structure(props?:any) {
    return (
      <Col>
      <h2>Setting Up the Project</h2>
      <p>
        Create a new folder called <code>my-project</code> and inside it type $<code>npm init</code>.
        This will fire some questions that you can setup:
      </p>

      <CodeBlock>
        {`npm init 
          
package name: (javascript) my-project
version: (1.0.0) 0.1.0
description: Fubeca API Tutorial
entry point: (index.js) app.ts
test command: 
git repository: 
keywords: 
author: Marble Tech
license: (ISC) 
About to write to /home/rbsrafa/projects/javascript/package.json:

{
  "name": "my-project",
  "version": "0.1.0",
  "description": "Fubeca API Tutorial",
  "main": "app.ts",
  "scripts": {'{'}
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Marble Tech",
  "license": "ISC"
}


Is this OK? (yes) y`}
      </CodeBlock>
          
      
      <p>By chosing yes a <code>package.json</code> file will be created for you. Now you need to install all the dependencies of the project with the command:</p>
      <CodeBlock>
        {'$ npm install --save body-parser chai express joi mocha nyc mysql2 reflect-metadata supertest ts-node typeorm typescript nodemon dotenv multer @types/body-parser @types/chai @types/express @types/joi @types/mocha @types/node @types/node @types/supertest @types/dotenv @types/multer'}
      </CodeBlock>
      <p>
        This command will create a <code>node_modules</code> folder and place all the dependencies inside it. It also creates a <code>package-lock.json</code> file for you.
        Once npm finishes the installation type <code>tsc --init</code> it will create a file called <code>tsconfig.json</code>, this file is responsible for the typescript configuration.
        We need to set the following configurations in <code>tsconfig.json</code>:
      </p>
      <CodeBlock>
        {`{
"compilerOptions": {
    /* Basic Options */
    "target": "es5",
    "module": "commonjs",
    "lib": ["es6", "dom"],
    
    /* Strict Type-Checking Options */
    "strict": true,
    "esModuleInterop": true,

    /* Experimental Options */
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    }
}`}
      </CodeBlock>

      <p>
      Create a file named <code>nodemon.json</code> and add these lines of code:
      </p>
      <CodeBlock>
{`{
  "watch": ["src", "tsconfig.json"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node ./src/server/server.ts"
}`}
      </CodeBlock>
      <p>
      We will use the <code>dotenv</code> library to read the system environment variables without having to set them in our local machine. To do it create a file called <code>.env</code> in the root folder <code>my-project</code>. We are going to create the environment inside this file and read their values in our application. Please <strong>DO NOT FORGET</strong> to change the values in <code>DATABASE_USER</code> and <code>DATABASE_PASSWORD</code> to match your database settings:
      </p>
      <CodeBlock>
        {`//my-project/.env

# SERVER
SERVER_PORT=3000

# DATABASE
DATABASE_HOST="localhost"
DATABASE_USER="user"
DATABASE_PASSWORD="password"
DATABASE_DB="my_project"`}
      </CodeBlock>
      
      <p>
      Create a folder named <code>src</code>. Inside the <code>src</code> folder create 2 other folders: <code>client</code> and <code>server</code>.

      Inside the <code>server</code> folder create 2 files: <code>app.ts</code> and <code>server.ts</code>.

      At this point your project structure should look like this:
      </p>
      <img src='./images/initialFolderStructure.png' width='100%' />
      <p>
      To test if everything is working we first need to modify the <code>package.json</code> file a little bit. Open it and add the "start" script inside the object "scripts":      
      </p>
      <CodeBlock>
{`{
  "name": "my-project",
  "version": "0.1.0",
  "description": "",
  "main": "app.ts",
  "scripts": {
    "start":"nodemon", // insert this line
    "test": "echo 'Error: no test specified' && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/body-parser": "^1.17.0",
    "@types/chai": "^4.1.7",
    "@types/dotenv": "^6.1.0",
    "@types/express": "^4.16.1",
    "@types/joi": "^14.3.2",
    "@types/mocha": "^5.2.6",
    "@types/node": "^11.9.5",
    "@types/supertest": "^2.0.7",
    "body-parser": "^1.18.3",
    "chai": "^4.2.0",
    "dotenv": "^6.2.0",
    "express": "^4.16.4",
    "joi": "^14.3.1",
    "mocha": "^6.0.2",
    "mysql2": "^1.6.5",
    "nodemon": "^1.18.10",
    "nyc": "^13.3.0",
    "reflect-metadata": "^0.1.13",
    "supertest": "^3.4.2",
    "ts-node": "^8.0.2",
    "typeorm": "^0.2.14",
    "typescript": "^3.3.3333"
  }
}`}
      </CodeBlock>
      <p>
      This change allows for running the application typing <code>npm start</code> in the terminal.
      Finally change the code inside the <code>app.ts</code> and <code>server.ts</code> respectively:
      </p>
      <CodeBlock>
      {`//my-project/src/server/app.ts

import express from 'express';

export async function createApp() {

    // Create express application
    const app = express();

    // Add the root route '/' to application
    app.get('/', (req, res) => {
      res.send("<h2>It\'s working</h2>");
    });

return app;
}`}
      </CodeBlock>

      <CodeBlock>
        {`//my-project/src/server/server.ts

import dotenv from 'dotenv';
// Get Environment Variables from .env file
dotenv.config();
import { createApp } from "./app";

(async () => {

    // Create the express application
    const app = await createApp();

    // Get the port number from the Environment Variable
    const port = process.env.SERVER_PORT; 

    // Start the server
    app.listen(port, () => {
        console.log(
            \`The server is running on port \${port}!\`
        );
    });

})();
`}
      </CodeBlock>

      <p>
      On your terminal type the command:
      </p>
      <CodeBlock>
        {'npm start'}
      </CodeBlock>

      <p>
        Nodemon will be watching for any changes in the entire project and will automatically reload it for us. We only have to save the changed files and see the magic happen.
        Open your browser of preference and type <code>localhost:3000</code>.
        You should then see the message `It's working` on it. If for some reason this port is already in use a error message will be shown in your terminal, to solve this problem you can just change the port number in the server.ts file or turn off your other application that is using this port. 
      </p>

      <img src='/images/itIsWorking.png' width='100%' />
      </Col>
    )
}
