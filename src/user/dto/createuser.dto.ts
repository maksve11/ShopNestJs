import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email', nullable: false })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User password', nullable: false })
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "Role's id", nullable: false })
  roleId: number;

  constructor(email: string, password: string, roleId: number) {
    if (isNotEmpty(email) && isNotEmpty(password) && isNotEmpty(roleId)) {
      this.email = email;
      this.password = password;
      this.roleId = roleId;
    } else {
      throw new Error('Invalid user DTO');
    }
  }
}
