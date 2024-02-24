import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './role.model';
import { CreateRoleDTO } from './dto/createrole.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateRoleDTO } from './dto/updaterole.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
  ) {}

  async createRole(dto: CreateRoleDTO): Promise<Role> {
    return await this.roleModel.create(dto);
  }

  async updateRole(id: number, dto: UpdateRoleDTO): Promise<Role> {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    await role.update(dto);
    return role;
  }

  async deleteRole(id: number): Promise<void> {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    await role.destroy();
  }

  async findRoleById(id: number): Promise<Role> {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return role;
  }

  async findAll(): Promise<Role[]> {
    return await this.roleModel.findAll();
  }
}
