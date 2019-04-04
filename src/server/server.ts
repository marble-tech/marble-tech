import dotenv from 'dotenv';
// Get Environment Variables from .env file
dotenv.config();
import { createApp } from "./app";

(async () => {

    // Create the express application
    const app = await createApp();

    // Get the port number from the Environment Variable
    const port = process.env.PORT || 3000; 

    // Start the server
    app.listen(port, () => {
        console.log(
            `The server is running on port ${port}!`
        );
    });
})();