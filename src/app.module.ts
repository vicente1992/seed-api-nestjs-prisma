import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from '@modules/city/city.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, CityModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
