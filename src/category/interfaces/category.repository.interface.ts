import {Category} from "../category.model";

export interface ICategoryRepository{
    getAll(): Promise<Category[]>;

    getByName(name: string): Promise<Category>;

    getById(id: number): Promise<Category>;

    updateById(id: number,
               updatedFields: Partial<Category>
    ): Promise<Category>;

    create(Body: Partial<Category>): Promise<Category>;

    delete(id: number): Promise<void>;
}