import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  imports: [SequelizeModule.forFeature([Product])],
  exports: [ProductService, ProductRepository],
})
export class ProductModule {}
