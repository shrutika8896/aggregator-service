import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './AppError';
import { HttpStatusCodes } from './constant';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    throw new AppError('Authorization header is missing', HttpStatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

  if (!token) {
    throw new AppError('Token is missing', HttpStatusCodes.UNAUTHORIZED);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!); // Verify the token
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    throw new AppError('Invalid or expired token', HttpStatusCodes.UNAUTHORIZED);
  }
};