import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Role's title", nullable: false })
  title: string;

  @IsString()
  @ApiProperty({ description: "Role's title", nullable: true })
  description: string;
}
