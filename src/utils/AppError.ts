import { GraphQLError } from 'graphql';

export class AppError extends GraphQLError {
  public statusCode: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}
