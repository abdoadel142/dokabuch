import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { CategoryModule } from './category.module';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, categoryDocument } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<categoryDocument>) { }

  async create(createCategoryDto: CreateCategoryDto):Promise<Category> {
    const category = await this.categoryModel.findOne({name:createCategoryDto.name}).exec();  
    if(category)
    throw  new HttpException("category is already exist",HttpStatus.CONFLICT)  
    const newCategory = await this.categoryModel.create(createCategoryDto);
    return newCategory.save();
  }

  async findAll():Promise<Category[]>  {
    const categories = await this.categoryModel.find().exec();
    return categories;
  }

  async findOne(id: any) :Promise<Category>  {
    var founded = new mongoose.Types.ObjectId(id);
    const category = await this.categoryModel.findById(founded).exec();  
    if(!category)
    throw new NotFoundException()  
    return category;
  }

  async update(id: any, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    var foundedId = new mongoose.Types.ObjectId(id);

    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(foundedId, updateCategoryDto, { new: true });
    return updatedCategory;
  }

  async remove(id: any): Promise<any> {
    var foundedId = new mongoose.Types.ObjectId(id);

    const deletedCategory= await this.categoryModel.findByIdAndRemove(foundedId);
    return "category successfully deleted";
    }
}
