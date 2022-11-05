import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export class AuthEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty({ nullable: true })
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
