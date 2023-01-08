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

  async updatePrimaryLocations(user:User){
    var locations = await this.findAll(user);
    locations.forEach(async location=>{
      location.location.isPrimary=false;
      await this.locationModel.updateMany({userId:user.userId},location)
    })
    
  }
  async create(
    createLocationDto: CreateLocationDto,
    user: User,
  ): Promise<Location> {
    createLocationDto.userId = user.userId;
    const newLocation = await this.locationModel.create(createLocationDto);
    if(newLocation.location.isPrimary==true){
      await this.updatePrimaryLocations(user)
    }
    return newLocation.save();
  }

  async findAll(user:User): Promise<Location[]> {
    var foundedId = new mongoose.Types.ObjectId(user.userId);

    const locations = await this.locationModel.find({userId:foundedId}).exec();
    return locations;
  }

  async findOne(id: string): Promise<Location> {
    var foundedId = new mongoose.Types.ObjectId(id);

    const location = await this.locationModel.findById(foundedId).exec();
    return location;
  }

  async update(
    id: string,
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

  async remove(id: string): Promise<Location> {    
    var foundedId = new mongoose.Types.ObjectId(id);
    const deletedLocation = await this.locationModel.findByIdAndRemove(foundedId);
    return deletedLocation;  }
}
