
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

interface JwtPayload {
  sub: number;  // or any other identifying field, like email
  username: string; // Optional: if you want to include the username in the JWT payload
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username };
    // const user = await this.prisma.user.findUnique({
    //   where: { id: payload.userId },
    // });

    // if (!user) {
    //   throw new Error('User not found');
    // }
    // return user;
  }
}
