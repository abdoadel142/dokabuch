import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const extra = await this.extraModel.findById(id).exec();
    return extra;
  }

  async update(id: number, updateExtraDto: UpdateExtraDto) : Promise<Extra> {
    const updatedExtra = await this.extraModel
      .findByIdAndUpdate(id, updateExtraDto, { new: true });
    return updatedExtra;
  }

  async remove(id: number): Promise<any> {
    const deletedExtra = await this.extraModel.findByIdAndRemove(id);
    return deletedExtra;
  }
}
