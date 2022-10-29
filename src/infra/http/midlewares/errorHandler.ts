import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import AppError from '../../../shared/errors/AppError';

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.status).json({
      status: 'Error',
      message: error.message,
    });
  }

  console.error(error.stack);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
