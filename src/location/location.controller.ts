import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, UseInterceptors } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { TransformInterceptor } from 'src/interceptors/interceptor';
@UseInterceptors(TransformInterceptor) 
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post()
  create(@Body() createLocationDto: CreateLocationDto,@Request() req) {
    return this.locationService.create(createLocationDto,req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User,Role.Admin)
  @Get()
  findAll(@Request() req) {
    return this.locationService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User,Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User,Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(id, updateLocationDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User,Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    
    return this.locationService.remove(id);
  }
}
