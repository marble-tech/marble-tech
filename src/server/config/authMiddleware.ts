import * as express from "express";
import jwt from "jsonwebtoken";

// Middleware function used to log request URLs
export function loggerMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    console.log(req.url);
    next();
}

// Middleware function used for JWT token validation
export function authMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    // Read token signature from environment variables (or use default)
    const AUTH_SECRET = process.env.AUTH_SECRET;
    // Read token from request headers
    const token = req.headers["x-auth-token"];
    // Client error if no token found in request headers
    if (typeof token !== "string") return res.status(400).send();

    // Server error if environment variable is not set
    if (AUTH_SECRET === undefined) return res.status(500).send();
        
    try {
        // Check that the token is valid
        const obj = jwt.verify(token, AUTH_SECRET) as any;
        // Add the user ID to the HTTP request object so we can access it from the NEXT request handler
        (req as any).userId = obj.id;
        // Invoke NEXT request handler
        next();
    } catch(err) {
        // Unauthorized if token cannot be verified
        return res.status(401).send({msg: "Unauthorized!"});
    }

}
