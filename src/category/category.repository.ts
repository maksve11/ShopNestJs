import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ICategoryRepository} from "./interfaces/category.repository.interface";
import {Category} from "./category.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class CategoryRepository implements ICategoryRepository {
    constructor(
        @InjectModel(Category)
        private categoryModel: typeof Category,
    ) {}
    async create(Body: Partial<Category>): Promise<Category> {
        return await this.categoryModel.create(Body);
    }

    async delete(id: number): Promise<void> {
        const category = await this.categoryModel.destroy({
            where: { id: id },
        });
        if (!category)
            throw new HttpException(
                "Category not found and couldn't be deleted",
                HttpStatus.NOT_FOUND,
            );
    }

    async getAll(): Promise<Category[]> {
        return this.categoryModel.findAll();
    }

    async getByName(name: string): Promise<Category> {
        const category = await this.categoryModel.findOne({
            where: {categoryName: name},
            include: {
                all: true,
            },
        })
        if (category) return category;
        else throw new HttpException('Category with this name not found', HttpStatus.NOT_FOUND);
    }

    async getById(id: number): Promise<Category> {
        const category = await this.categoryModel.findOne({
            where: { id: id },
        })
        if (category) return category;
        else throw new HttpException('Category with this id not found', HttpStatus.NOT_FOUND);
    }

    async updateById(id: number, updatedFields: Partial<Category>): Promise<Category> {
        const [affectedCount, affectedRows] = await this.categoryModel.update(
            updatedFields,
            { where: { id }, returning: true },
        );
        if (affectedCount === 0) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        return affectedRows[0];
    }
}