import jwt from 'jsonwebtoken';
import { AppError } from './AppError';
import { HttpStatusCodes } from './constant';
import { LoggerService as logger } from '../services/logger';

export const authenticateUser = (req: any) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    throw new AppError(
      'Authorization header is missing',
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

  if (!token) {
    throw new AppError('Token is missing', HttpStatusCodes.UNAUTHORIZED);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!); // Verify the token
    return decoded;
  } catch (error: any) {
    logger.error(error);
    throw new AppError(
      'Invalid or expired token',
      HttpStatusCodes.UNAUTHORIZED
    );
  }
};
