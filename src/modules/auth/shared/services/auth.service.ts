import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '@modules/auth/dto/create-auth.dto';
import { PrismaService } from '@modules/prisma/prisma.service';
import { comparePassword, hashPassword } from '@utils/handle/handlePassword';
import { HttpException } from '@nestjs/common';
import { handleHttpError } from '@utils/handle/handleError';
import { LoginDto } from '@modules/auth/dto/login.dto';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from '@modules/auth/entities/auth.entity';
import { JwtPayload } from '../models/jwt-payload';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async create(createAuthDto: CreateAuthDto) {
    try {
      const { password, email } = createAuthDto;
      createAuthDto.password = await hashPassword(password);

      const userExists = await this.prisma.user.findUnique({
        where: { email },
      });

      if (userExists) {
        throw new HttpException('EMAIL_EXISTS', 402);
      }

      const user = await this.prisma.user.create({ data: createAuthDto });

      const token: string = await this.tokenSing(user);

      return {
        user: {
          email,
          name: user.name,
        },
        token,
      };
    } catch (error) {
      handleHttpError(error.response, error.status);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const userExists = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!userExists) throw new NotFoundException('USER_NOT_EXISTS');

      const checkPassword = await comparePassword(
        password,
        userExists.password,
      );

      if (!checkPassword) throw new NotFoundException('USER_NOT_EXISTS');
      const token: string = await this.tokenSing(userExists);

      return {
        user: {
          email,
          name: userExists.name,
        },
        token,
      };
    } catch (error) {
      handleHttpError(error.response, error.status);
    }
  }

  async tokenSing(user: AuthEntity): Promise<string> {
    const { id, email, name } = user;
    const payload: JwtPayload = { id, email, name };
    const token: string = await this.jwtService.sign(payload);

    return token;
  }
}
