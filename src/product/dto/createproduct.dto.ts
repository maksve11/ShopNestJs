import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @IsString()
  @ApiProperty({ description: 'Product name', nullable: false })
  productName: string;

  @IsString()
  @ApiProperty({ description: 'Product description', nullable: true })
  productDescription: string;

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

  constructor(
    product_name: string,
    product_description: string,
    price: number,
    count: number,
    categoryId: number,
  ) {
    if (
      isNotEmpty(product_name) &&
      isNotEmpty(product_description) &&
      isNotEmpty(price)
    ) {
      this.productName = product_name;
      this.productDescription = product_description;
      this.price = price;
      this.count = count;
      this.categoryId = categoryId;
    } else {
      throw new Error('Invalid product DTO');
    }
  }
}
