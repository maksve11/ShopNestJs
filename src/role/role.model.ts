import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../user/user.model";

@Table
export class Role extends Model<Role>
{
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    @ApiProperty({ description: "Role identifier", nullable: false })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    @ApiProperty({ description: "Title of role", nullable: false, example: "Admin/base" })
    title: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    @ApiProperty({ description: "Role's description", nullable: false })
    description: string

    @HasMany(() => User)
    users: User[];
}