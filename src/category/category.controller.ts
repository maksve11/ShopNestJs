import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './category.model';
import { CreateCategoryDTO } from './dto/createcategory.dto';
import { UpdateCategoryDTO } from './dto/updatecategory.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Creates a new category for the admin' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Category,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async create(
    @Body()
    completeBody: CreateCategoryDTO,
  ) {
    return this.categoryService.create(completeBody);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all available categories for the user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Category,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAll() {
    return this.categoryService.getAll();
  }

  @Get(':categoryId')
  @ApiOperation({ summary: 'Returns a category with specified id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Category,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('categoryId', new ParseIntPipe()) categoryId: number) {
    return this.categoryService.getById(categoryId);
  }

  @Patch(':categoryId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Updates a category with specified id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Category,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  update(
    @Param('categoryId', new ParseIntPipe()) categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDTO,
  ) {
    return this.categoryService.update(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Deletes a category with specified id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  delete(@Param('categoryId', new ParseIntPipe()) categoryId: number) {
    return this.categoryService.deleteById(categoryId);
  }
}
