import {Table, Column, Model, DataType, HasMany} from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";
import {Product} from "../product/product.model";

@Table
export class Category extends Model<Category> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    @ApiProperty({ description: "Category identifier", nullable: false })
    id: number

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    @ApiProperty({ description: "Category name", nullable: false })
    categoryName: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    @ApiProperty({ description: "Category description", nullable: true })
    categoryDescription: string;

    @HasMany(() => Product)
    products: Product[];
}