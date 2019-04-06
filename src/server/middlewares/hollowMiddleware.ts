import express, {Request, Response, NextFunction} from 'express';

export function hollow(req: Request, res: Response, next: NextFunction){
  next();
}