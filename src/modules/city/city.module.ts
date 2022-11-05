import { Module } from '@nestjs/common';
import { CityService } from './shared/service/city.service';
import { CityController } from './shared/controller/city.controller';
import { PrismaModule } from '@modules/prisma/prisma.module';

@Module({
  controllers: [CityController],
  providers: [CityService],
  imports: [PrismaModule],
})
export class CityModule {}
