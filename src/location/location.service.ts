import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location, LocationDocument } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel('Location')
    private readonly locationModel: Model<LocationDocument>,
  ) {}

  async create(
    createLocationDto: CreateLocationDto,
    user: User,
  ): Promise<Location> {
    createLocationDto.userId = user.userId;
    const newLocation = await this.locationModel.create(createLocationDto);
    return newLocation.save();
  }

  async findAll(): Promise<Location[]> {
    const locations = await this.locationModel.find().exec();
    return locations;
  }

  async findOne(id: number): Promise<Location> {
    var foundedId = new mongoose.Types.ObjectId(id);

    const location = await this.locationModel.findById(foundedId).exec();
    return location;
  }

  async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    var foundedId = new mongoose.Types.ObjectId(id);

    const updatedLocation = await this.locationModel.findByIdAndUpdate(
      foundedId,
      updateLocationDto,
      { new: true },
    );
    return updatedLocation;
  }

  async remove(id: number): Promise<Location> {
    var foundedId = new mongoose.Types.ObjectId(id);
    const deletedLocation = await this.locationModel.findByIdAndRemove(foundedId);
    return deletedLocation;  }
}
