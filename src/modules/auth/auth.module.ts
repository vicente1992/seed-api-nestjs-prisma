import { Module } from '@nestjs/common';
import { AuthService } from './shared/services/auth.service';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { AuthController } from './shared/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './shared/strategy/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
