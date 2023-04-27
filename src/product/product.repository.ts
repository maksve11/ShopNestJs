import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {IProductRepository} from "./interfaces/product.repository.interface";
import {Product} from "./product.model";
import {InjectModel} from "@nestjs/sequelize";
import {Category} from "../category/category.model";

@Injectable()
export class ProductRepository implements IProductRepository {
    constructor(
        @InjectModel(Product)
        private ProductModel: typeof Product,
    ) {}
    async create(Body: Partial<Product>): Promise<Product> {
        return await this.ProductModel.create(Body);
    }

    async deleteById(id: number): Promise<void> {
        const Product = await this.ProductModel.destroy({
            where: { id: id },
        });
        if (!Product)
            throw new HttpException(
                "Product not found and couldn't be deleted",
                HttpStatus.NOT_FOUND,
            );
    }

    async getAll(): Promise<Product[]> {
        return this.ProductModel.findAll();
    }

    async getById(id: number): Promise<Product> {
        const Product = await this.ProductModel.findOne({
            where: { id: id },
        })
        if (Product) return Product;
        else throw new HttpException('Product with this id not found', HttpStatus.NOT_FOUND);
    }

    async updateById(id: number, updatedFields: Partial<Product>): Promise<Product> {
        const [affectedCount, affectedRows] = await this.ProductModel.update(
            updatedFields,
            { where: { id }, returning: true },
        );
        if (affectedCount === 0) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        return affectedRows[0];
    }

    async getAllinCategory(categoryId: number): Promise<Product[]> {
        return this.ProductModel.findAll({
            include: [{
                model: Category,
                where: { id: categoryId }
            }]
        });
    }
}