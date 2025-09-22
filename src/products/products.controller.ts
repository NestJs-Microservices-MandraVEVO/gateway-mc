import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(

    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy

  ) {}


  @Post()
  createProduct() {
    return 'Product created';
  }

  @Get()
  getProducts(@Query() paginationDto:PaginationDto) {
    return this.productClient.send({cmd: 'get_products'}, paginationDto);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {

    try {
      const product = await firstValueFrom(
        this.productClient.send({cmd: 'get_product'}, {id})
      );
      return product;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `Product with ID ${id} deleted`;
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string,
  @Body() body: any
) {
    return `Product with ID ${id} updated`;
  }
}
