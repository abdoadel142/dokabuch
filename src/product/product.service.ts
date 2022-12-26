import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Model, SchemaTypes } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDTO } from './dtos/create-product.dto';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>) { }

  async getFilteredProducts(filterProductDTO: FilterProductDTO): Promise<Product[]> {
    const { category, search } = filterProductDTO;
    let products = await this.getAllProducts();

    if (search) {
      products = products.filter(product => 
        product.name.includes(search) ||
        product.description.includes(search)
      );
    }

    if (category) {
      products = products.filter(product => product.category.toString() === category )
    }

    return products;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().populate('category').populate('extra').exec();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate('category').populate('extra').exec();
    return product;
  }

  async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const foundProduct = await this.productModel.findOne({name:createProductDTO.name})
    if(foundProduct)
    throw new HttpException('product already exist',HttpStatus.CONFLICT)
    const newProduct = await this.productModel.create(createProductDTO);
    return newProduct.save();
  }

  async updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, createProductDTO, { new: true });
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<any> {
    var foundedId = new mongoose.Types.ObjectId(id);
    const deletedProduct = await this.productModel.findByIdAndRemove(foundedId);
    return deletedProduct;
  }
}