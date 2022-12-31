import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { Version, VersionDocument } from './entities/version.entity';

@Injectable()
export class VersionService {
  constructor(@InjectModel('Version') private readonly versionModel: Model<VersionDocument>) { }

  async create(createVersionDto: CreateVersionDto) : Promise<Version> {
    const newVersion = await this.versionModel.create(createVersionDto);
    return newVersion.save();
  }

  async findAll() :Promise<Version[]> {
    const versions = await this.versionModel.find().exec();
    return versions;  }

   async findOne(type: string): Promise<Version | undefined> {
    const version = await this.versionModel.findOne({type: type});
    return version;
   }
   async update(id: number, updateVersionDto: UpdateVersionDto) : Promise<Version> {
    var founded = new mongoose.Types.ObjectId(id);
    const updatedVersion = await this.versionModel
      .findByIdAndUpdate(founded, updateVersionDto, { new: true });
    return updatedVersion;
  }

  async remove(id: number): Promise<any> {
    var founded = new mongoose.Types.ObjectId(id);
    const deletedVersion = await this.versionModel.findByIdAndRemove(founded);
    return deletedVersion;
  }
}
