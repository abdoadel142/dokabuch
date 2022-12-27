import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/interceptor';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
@UseInterceptors(TransformInterceptor) 
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
   
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get()
  findOne(@Query('id') id: string) {
    
    return this.categoryService.findOne(id);
  }

  @Patch()
  update(@Query('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.categoryService.remove(id);
  }
}
