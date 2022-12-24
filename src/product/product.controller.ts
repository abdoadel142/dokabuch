import { Controller, Post, Get, Put, Delete, Body, Param, Query, NotFoundException, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('store/products')
export class ProductController {
  constructor(private productService: ProductService) { }
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get('/')
  async getProducts(@Query() filterProductDTO: FilterProductDTO) {
    if (Object.keys(filterProductDTO).length) {
      const filteredProducts = await this.productService.getFilteredProducts(filterProductDTO);
      return filteredProducts;
    } else {
      const allProducts = await this.productService.getAllProducts();
      return allProducts;
    }
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User,Role.Admin)
  @Post('/')
  async addProduct(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.addProduct(createProductDTO);
    return product;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.updateProduct(id, createProductDTO);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User,Role.Admin)
  @Delete()
  async deleteProduct(@Query('id') id: string) {
    console.log(id,"sss");
    
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }
}
