import express, {Request, Response, NextFunction} from 'express';

// Get an empty middleware for typescript restrition
export function hollow(req: Request, res: Response, next: NextFunction){
  next();
}