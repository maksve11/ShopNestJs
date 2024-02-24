import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/createproduct.dto';
import { UpdateProductDTO } from './dto/updateproduct.dto';

@Injectable()
export class ProductService {
  constructor(private readonly ProductRepository: ProductRepository) {}

  async getAll() {
    return await this.ProductRepository.getAll();
  }

  async getById(id: number) {
    return await this.ProductRepository.getById(id);
  }

  async getAllinCategory(categoryId: number) {
    return await this.ProductRepository.getAllinCategory(categoryId);
  }

  async update(Id: number, updatedFields: Partial<UpdateProductDTO>) {
    return await this.ProductRepository.updateById(Id, updatedFields);
  }

  async deleteById(Id: number) {
    await this.ProductRepository.deleteById(Id);
  }

  async create(body: CreateProductDTO) {
    return await this.ProductRepository.create(body);
  }
}
