import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '@nestjs/common';

export function checkForBearerToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorizationHeader = req.header('Authorization');
  if (!authorizationHeader) {
    throw new UnauthorizedException('No token provided');
  } else {
    next();
  }
}
