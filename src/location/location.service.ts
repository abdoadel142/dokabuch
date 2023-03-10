import { Injectable } from '@nestjs/common';
import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from '@nestjs/common/module-utils/constants';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateLocationDto, locationDto } from './dto/create-location.dto';
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
    if(locations.length>0){
      locations.forEach(async location=>{
        location.location.isPrimary=false
        await this.updateLoc(location._id,location ,user)
      })
      
    }
    
  }
  async create(
    createLocationDto: CreateLocationDto,
    user: User,
  ): Promise<Location> {
    createLocationDto.userId = user.userId;
    if(createLocationDto.location.isPrimary==true){
      await this.updatePrimaryLocations(user)
    }
    const newLocation = await this.locationModel.create(createLocationDto);
   
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

  async updateLoc(
    id: string,
    updateLocationDto: UpdateLocationDto,
    user:User
  ): Promise<Location> {
    var foundedId = new mongoose.Types.ObjectId(id);

    const updatedLocation = await this.locationModel.findByIdAndUpdate(
      foundedId,
      updateLocationDto,
      { new: true },
    );
    return updatedLocation.save();
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
    user:User
  ): Promise<Location> {
    var foundedId = new mongoose.Types.ObjectId(id);
    if(updateLocationDto.location.isPrimary==true){
      await this.updatePrimaryLocations(user)
    }
    const updatedLocation = await this.locationModel.findByIdAndUpdate(
      foundedId,
      updateLocationDto,
      { new: true },
    );

    return updatedLocation.save();
  }

  async remove(id: string): Promise<Location> {    
    var foundedId = new mongoose.Types.ObjectId(id);
    const deletedLocation = await this.locationModel.findByIdAndRemove(foundedId);
    return deletedLocation;  }
}

