import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Category} from "../category/category.model";

@Table
export class Product extends Model<Product> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    @ApiProperty({ description: "Product identifier", nullable: false })
    id: number

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    @ApiProperty({ description: "Product name", nullable: false })
    productName: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    @ApiProperty({ description: "Product description", nullable: true })
    productDescription: string;

    @Column({
        type: DataType.REAL,
    })
    @ApiProperty({ description: "Product price", nullable: false })
    price: number

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    @ApiProperty({ description: "Product's count", nullable: false })
    count: number

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    @ApiProperty({ description: "Category identifier", nullable: false })
    categoryId: number;

    @BelongsTo(() => Category)
    category: Category;
}