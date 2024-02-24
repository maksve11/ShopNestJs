import { IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDTO } from './createcategory.dto';

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {
  @IsString()
  @ApiProperty({ description: 'Category name', nullable: false })
  categoryName: string;

  @IsString()
  @ApiProperty({ description: 'Category description', nullable: true })
  categoryDescription: string;
}
