import { PrismaService } from '@modules/prisma/prisma.service';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../models/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const { email } = payload;
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new UnauthorizedException();

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
