import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  Res,
  HttpStatus,
  UseInterceptors,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { RolesGuard } from 'src/feature/auth/guard/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/role.enum';

@Controller('cars')
@UseInterceptors(new TransformInterceptor())
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createCarDto: CreateCarDto): Promise<any> {
    return this.carService.create(createCarDto);
  }

  @Public()
  @Get()
  async findAll(
    @Query('name') name: string,
    @Query('type_ids') typeIds: number[],
    @Query('capacity') capacity: number,
    @Query('gasoline') gasoline: number,
    @Query('steering_ids') steeringIds: number[],
    @Query('status_ids') statusIds: number[],
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    return this.carService.findAll(
      name,
      typeIds,
      capacity,
      gasoline,
      steeringIds,
      statusIds,
      limit,
      offset,
    );
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: number) {
    return this.carService.remove(+id);
  }
}
