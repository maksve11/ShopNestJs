import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDTO } from './dto/createrole.dto';
import { UpdateRoleDTO } from './dto/updaterole.dto';
import { Role } from './role.model';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Role })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async createRole(@Body() dto: CreateRoleDTO) {
    return await this.roleService.createRole(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update role with specified id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Role })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async updateRole(@Param('id') id: number, @Body() dto: UpdateRoleDTO) {
    return await this.roleService.updateRole(id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find role with specified id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Role })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getRoleById(@Param('id') id: number) {
    return await this.roleService.findRoleById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Find all roles' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Role })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getAllRoles() {
    return await this.roleService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete role with specified id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Role })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async deleteRole(@Param('id') id: number) {
    await this.roleService.deleteRole(id);
  }
}
