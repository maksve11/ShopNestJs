import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post, UseGuards,
} from '@nestjs/common';
import {ProductService} from "./product.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Product} from "./product.model";
import {CreateProductDTO} from "./dto/createproduct.dto";
import {UpdateProductDTO} from "./dto/updateproduct.dto";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles.decorator";

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly ProductService: ProductService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: "Creates a new Product for the admin" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Product })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
    async create(
        @Body()
            completeBody: CreateProductDTO,
    ) {
        return this.ProductService.create(completeBody);
    }

    @Get()
    @ApiOperation({ summary: "Returns all available products for the user" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Product, isArray: true })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
    findAll() {
        return this.ProductService.getAll();
    }

    @Get()
    @ApiOperation({ summary: "Returns all available products in specified category the user" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Product, isArray: true })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
    findAllinCategory(@Param('categoryId', new ParseIntPipe()) categoryId: number) {
        return this.ProductService.getAllinCategory(categoryId);
    }

    @Get(':ProductId')
    @ApiOperation({ summary: "Returns a Product with specified id" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Product })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
    findOne(@Param('ProductId', new ParseIntPipe()) ProductId: number) {
        return this.ProductService.getById(ProductId);
    }

    @Patch(':ProductId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: "Updates a Product with specified id" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Product })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
    update(@Param('ProductId', new ParseIntPipe()) ProductId: number, @Body() updateProductDto: UpdateProductDTO) {
        return this.ProductService.update(ProductId, updateProductDto);
    }

    @Delete(':ProductId')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: "Deletes a Product with specified id" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
    delete(@Param('ProductId', new ParseIntPipe()) ProductId: number) {
        return this.ProductService.deleteById(ProductId);
    }
}
