import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDTO } from './createproduct.dto';

export class UpdateProductDTO extends PartialType(CreateProductDTO) {
  @IsString()
  @ApiProperty({ description: 'Product name', nullable: false })
  ProductName: string;

  @IsString()
  @ApiProperty({ description: 'Product description', nullable: true })
  ProductDescription: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product price', nullable: false })
  price: number;

  @IsNumber()
  @ApiProperty({ description: "Product's count", nullable: true })
  count: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "Category's id", nullable: false })
  categoryId: number;
}
