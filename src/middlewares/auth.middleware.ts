import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('middlewaree!');
    const token = req.headers['auth-user'] as string;

    if (!token) {
      throw new UnauthorizedException('Access denied: No token provided.');
    }

    try {
      const decoded = verify(token, 'secret');
      console.log(decoded);
      req['userId'] = decoded['userId']; // Attach the userId from the token to the request object
      next(); // Pass to the next middleware or route handler
    } catch (err) {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
