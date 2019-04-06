import express from 'express';
import { createDbConnection } from './config/db';
import router from './router';
import bodyParser = require('body-parser');

export async function createApp() {

  await createDbConnection();

  // Create express application
  const app = express();
  // Add body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Add CORS functionality
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
    next();
  });
  // Add route for image folder
  app.use('/uploads/images', express.static('uploads/images'));
  // Add client build path
  app.use(express.static('src/client/build'));
  // Add application router
  app.use('/', router);

  return app;
}
