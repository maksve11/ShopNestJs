import { Product } from '../product.model';

export interface IProductRepository {
  getAll(): Promise<Product[]>;

  getById(id: number): Promise<Product>;

  getAllinCategory(categoryId: number): Promise<Product[]>;

  updateById(id: number, updatedFields: Partial<Product>): Promise<Product>;

  create(Body: Partial<Product>): Promise<Product>;

  deleteById(id: number): Promise<void>;
}