import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Res, HttpStatus, UseInterceptors } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { Response } from 'express';


@Controller('cars')
@UseInterceptors(new TransformInterceptor())
export class CarController {
  constructor(private readonly carService: CarService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto)
  }

  @Get()
  async findAll(@Query('type_ids') typeIds: number[], @Query('capacity') capacity: number, @Query('gasoline') gasoline: number, @Query('steering_ids') steeringIds: number[], @Query('status_ids') statusIds: number[], @Query('offset') offset: number, @Query('limit') limit: number) {
    return this.carService.findAll(typeIds, capacity, gasoline, steeringIds, statusIds, limit, offset);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Res() response: Response) {
    return this.carService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.carService.remove(+id);
  }
}
