import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(

    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy

  ) {}


  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productClient.send({cmd: 'create_product'}, createProductDto);
  }

  @Get()
  getProducts(@Query() paginationDto:PaginationDto) {
    return this.productClient.send({cmd: 'get_products'}, paginationDto);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {

    return this.productClient.send({cmd: 'get_product'}, {id}) //mas corto en base a que ya es un observable
    .pipe(
      catchError(err => {throw new RpcException(err)})
    )

    // try {
    //   const product = await firstValueFrom(
    //     this.productClient.send({cmd: 'get_product'}, {id})
    //   );
    //   return product;
    // } catch (error) {
    //   throw new BadRequestException(error);
    // }
  }

  @Delete(':id')
  deleteProduct(
    @Param('id') id: string) {
    return this.productClient.send({cmd: 'delete_product'}, {id}).pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }

  @Patch(':id')
  updateProduct(
    @Param('id',ParseIntPipe) id: number,
  @Body() updateProductDto: UpdateProductDto
) {
    return this.productClient.send({cmd: 'update_product'},{
      id,
      ...updateProductDto
    }).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }
}
