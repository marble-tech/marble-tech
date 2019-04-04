import React from 'react';
import Col from 'react-bootstrap/Col';
import { CodeBlock } from '../lib/components/codeBlock/codeBlock';

export function database(props?:any) {
    return <Col>

        <h2>Database Configuration</h2>

        <p>To link your application with the MySQL Database you'll need to follow a few steps:
        </p>
        <p className="lead">
        Create the MySQL database
        </p> 
        <p>Create a new database called <code>my_project</code> using a MySQL database manager or type the following command in mysql shell:
        </p>
        <CodeBlock>
          {'mysql> create database my_project;'}
        </CodeBlock>
        <p>
        Inside the <code>server</code> folder create a new folder called <code>config</code> and add a new file named <code>db.ts</code>.
        </p>
        <CodeBlock>
          {`//my-project/src/server/config/db.ts
import { createConnection, getConnectionManager } from "typeorm";

export async function createDbConnection() {

  // Set database variables from environment
  const DATABASE_HOST = process.env.DATABASE_HOST;
  const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
  const DATABASE_USER = process.env.DATABASE_USER;
  const DATABASE_DB = process.env.DATABASE_DB;

  // Create a database connection
  await createConnection({
    type: "mysql",
    host: DATABASE_HOST,
    port: 3306,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DB,
    entities: [],
    synchronize: true
  });

  // Check if connection is successful
  const connection = getConnectionManager();
  console.log('Is DB connected:', connection.connections[0].isConnected);
}
`}
        </CodeBlock>
        <p>
        Now open the <code>app.ts</code> file, import the createDbConnection and call the function to initialise the database: 
        </p>
        <CodeBlock>
{`//my-project/src/server/app.ts

import express from 'express';
import {'{'} createDbConnection } from './config/db'; //  Add this line

export async function createApp() {'{'}

  await createDbConnection(); //  Add this line

  const app = express();

  app.get('/', (req, res) => {'{'}
    res.send('<h2>It\'s working</h2>');
  });

  return app;
}`}
        </CodeBlock>
        <p>
        If everything was done right you should see this message on your terminal:
        </p>
        <CodeBlock>
{`Is DB connected: true
The server is running on port 3000!`}
        </CodeBlock>

  </Col>;
}