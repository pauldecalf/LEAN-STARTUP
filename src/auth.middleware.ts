import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    try {
      const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      req['user'] = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  }
}
