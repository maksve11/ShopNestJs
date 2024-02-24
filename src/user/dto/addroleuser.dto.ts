import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleToUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email', nullable: false })
  email: string;

  @IsString()
  @ApiProperty({ description: 'User password', nullable: true })
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "Role's id", nullable: false })
  roleId: number;
}
