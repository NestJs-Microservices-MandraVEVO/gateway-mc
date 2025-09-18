import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
  getProducts() {
    return this.productClient.send({cmd: 'get_products'},{});
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return `Product details for ${id}`;
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
