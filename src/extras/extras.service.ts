import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateExtraDto } from './dto/create-extra.dto';
import { UpdateExtraDto } from './dto/update-extra.dto';
import { Extra, ExtraDocument } from './entities/extra.entity';

@Injectable()
export class ExtrasService {
  constructor(@InjectModel('Extra') private readonly extraModel: Model<ExtraDocument>) { }

  async create(createExtraDto: CreateExtraDto) : Promise<Extra> {
    const newExtra = await this.extraModel.create(createExtraDto);
    return newExtra.save();
  }

  async findAll() :Promise<Extra[]> {
    const extras = await this.extraModel.find().exec();
    return extras;  }

  async findOne(id: number): Promise<Extra> {
    var founded = new mongoose.Types.ObjectId(id);
    const extra = await this.extraModel.findById(founded).exec();
    return extra;
  }

  async update(id: number, updateExtraDto: UpdateExtraDto) : Promise<Extra> {
    var founded = new mongoose.Types.ObjectId(id);
    const updatedExtra = await this.extraModel
      .findByIdAndUpdate(founded, updateExtraDto, { new: true });
    return updatedExtra;
  }

  async remove(id: number): Promise<any> {
    var founded = new mongoose.Types.ObjectId(id);
    const deletedExtra = await this.extraModel.findByIdAndRemove(founded);
    return deletedExtra;
  }
}
