import { isNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDTO {
  @IsString()
  @ApiProperty({ description: 'Category name', nullable: false })
  categoryName: string;

  @IsString()
  @ApiProperty({ description: 'Category description', nullable: true })
  categoryDescription: string;

  constructor(category_name: string, category_description: string) {
    if (isNotEmpty(category_name) && isNotEmpty(category_description)) {
      this.categoryName = category_name;
      this.categoryDescription = category_description;
    } else {
      throw new Error('Invalid category DTO');
    }
  }
}
