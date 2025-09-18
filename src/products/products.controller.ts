import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}


  @Post()
  createProduct() {
    return 'Product created';
  }

  @Get()
  getProducts() {
    return 'List of products';
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
