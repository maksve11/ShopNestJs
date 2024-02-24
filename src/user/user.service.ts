import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './dto/createuser.dto';
import { Role } from '../role/role.model';
import { AddRoleToUserDTO } from './dto/addroleuser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Role)
    private readonly roleModel: typeof Role,
  ) {}

  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const role = await this.roleModel.findByPk(createUserDto.roleId);
    if (!role) {
      throw new Error('Role not found');
    }
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    await user.$set('role', role);
    return user.save();
  }

  async addRoleToUser(
    id: number,
    addRoleToUserDto: AddRoleToUserDTO,
  ): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    const role = await this.roleModel.findByPk(addRoleToUserDto.roleId);
    if (!role) {
      throw new Error('Role not found');
    }
    await user.$add('role', role);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      include: {
        all: true,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findOne({
      where: { id },
      include: {
        all: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async deleteByID(id: number): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }
}
