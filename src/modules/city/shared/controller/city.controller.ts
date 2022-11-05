import { UseGuards } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { CreateCityDto } from '@modules/city/dto/create-city.dto';
import { UpdateCityDto } from '@modules/city/dto/update-city.dto';
import { CityEntity } from '@modules/city/entities/city.entity';
import { CityService } from '../service/city.service';

@UseGuards(JwtAuthGuard)
@ApiTags('city')
@ApiBearerAuth()
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @ApiCreatedResponse({ type: CityEntity })
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  @ApiOkResponse({ type: CityEntity, isArray: true })
  findAll() {
    return this.cityService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CityEntity })
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CityEntity })
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CityEntity })
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }
}
