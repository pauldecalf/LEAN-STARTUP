import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {
  }
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(password: string, storedPasswordHash: string): Promise<boolean> {
    return bcrypt.compare(password, storedPasswordHash);
  }

  async generateToken(user: any): Promise<string> {
    const payload = { sub: user._id, email: user.email };
    return jwt.sign(payload, this.configService.get<string>('JWT_SECRET'), {
      expiresIn: '1h',
    });
  }
}
