import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category.model';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  imports: [SequelizeModule.forFeature([Category])],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
