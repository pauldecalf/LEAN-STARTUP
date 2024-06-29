import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      console.error('Token manquant');
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token manquant' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      console.log('Decoded token:', decoded); // Log pour vérifier le contenu du token
      req['user'] = decoded;
      console.log('User added to request:', req['user']); // Vérifiez que l'utilisateur est ajouté à la requête
      next();
    } catch (error) {
      console.error('Error verifying token:', error); // Log pour vérifier les erreurs de vérification du token
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token invalide' });
    }
  }
}
