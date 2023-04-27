import {isNotEmpty, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "Role's title", nullable: false})
    title: string

    @IsString()
    @ApiProperty({description: "Role's title", nullable: true})
    description: string

    constructor(title: string, description: string) {
        if (isNotEmpty(title) && isNotEmpty(description)) {
            this.title = title;
            this.description = description;
        } else {
            throw new Error("Invalid user DTO")
        }
    }
}