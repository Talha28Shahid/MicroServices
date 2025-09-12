import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/models/user.schema';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configSERvice: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, res: Response) {
    const tockenPayload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configSERvice.get('JWT_EXPIRATION_TIME'),
    );

    const token = this.jwtService.sign(tockenPayload);
    res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
