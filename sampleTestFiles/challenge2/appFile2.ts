import express from "express";
import bodyParser from "body-parser";

export async function createApp() {

    // Creates app
    const app = express();

    // Server config to be able to send JSON
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // insert answer here

    app.use('*', (req, res) => {res.status(404).json({error: 'Route not found'})});

    return app;
};