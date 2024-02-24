import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDTO } from './dto/createcategory.dto';
import { UpdateCategoryDTO } from './dto/updatecategory.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAll() {
    return await this.categoryRepository.getAll();
  }

  async getById(id: number) {
    return await this.categoryRepository.getById(id);
  }

  async getByName(name: string) {
    return await this.categoryRepository.getByName(name);
  }

  async update(Id: number, updatedFields: Partial<UpdateCategoryDTO>) {
    return await this.categoryRepository.updateById(Id, updatedFields);
  }

  async deleteById(Id: number) {
    await this.categoryRepository.delete(Id);
  }

  async create(body: CreateCategoryDTO) {
    return await this.categoryRepository.create(body);
  }
}
