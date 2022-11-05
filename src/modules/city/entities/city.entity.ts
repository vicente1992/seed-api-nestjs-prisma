import { ApiProperty } from '@nestjs/swagger';
import { City } from '@prisma/client';
export class CityEntity implements City {
  @ApiProperty()
  id: number;

  @ApiProperty({ nullable: false })
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
