import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email', nullable: false })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User password', nullable: false })
  password: string;
}
