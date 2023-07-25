import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import * as constant from '../common/constant';

import { QueryTypes, Sequelize, where } from 'sequelize';
import { Car } from 'database/models/car';
import { Image } from 'database/models/images';
import { Type } from 'database/models/types';
import { Price } from 'database/models/prices';
import { Steering } from 'database/models/steerings';
import { Status } from 'database/models/status';
import { APIException } from 'src/exeption/api_exception';
import { CarResponseDto } from './dto/car-response.dto';
import { PagingDto } from 'src/common/paging.dto';

@Injectable()
export class CarService {

  constructor(
    @Inject(constant.CARS_REPOSITORY)
    private carsRepository: typeof Car,

    @Inject(constant.SEQUELIZE)
    private sequelize: Sequelize,
  ) { }


  async findAll(type_ids: number[], capacity: number, gasoline: number, steeringIds: number[], statusIds: number[], limit = 20, offset = 0): Promise<PagingDto<CarResponseDto>> {
    try {
      const filter: any = {}
      if (type_ids) {
        filter.type_id = type_ids
      }
      if (capacity) {
        filter.capacity = capacity
      }
      if (gasoline) {
        filter.gasoline = gasoline
      }
      if (steeringIds) {
        filter.steeringIds = steeringIds
      }
      if (statusIds) {
        filter.statusIds = statusIds
      }
      const result = await this.carsRepository.findAndCountAll({ where: filter, include: [Type, Image, Price, Status, Steering], limit: Number(limit), offset: Number(offset) })
      return new PagingDto(result.rows.map(car => new CarResponseDto(car)), result.count, Number(limit), Number(offset))
    } catch (error) {
      throw APIException.throwException(HttpStatus.BAD_REQUEST, { message: error, });
    }
  }

  async create(createCarDto: CreateCarDto) {
    const t = await this.sequelize.transaction();
    try {
      let model = {
        name: createCarDto.name,
        description: createCarDto.description,
        capacity: createCarDto.capacity,
        gasoline: createCarDto.gasoline,
        type_id: createCarDto.type_id,
        status_id: createCarDto.status_id,
        steering_id: createCarDto.steering_id
      };
      const car = await Car.create(model, { transaction: t });
      for (const imageData of createCarDto.images) {
        const image = await Image.create({ url: imageData, car_id: car.id }, { transaction: t });
      }
      await Price.create({ original_price: createCarDto.price.original_price, discount: createCarDto.price.discount, final_price: createCarDto.price.final_price, car_id: car.id }, { transaction: t });
      await t.commit();
      return { car_id: car.id }
    } catch (error) {
      await t.rollback();
      throw APIException.throwException(HttpStatus.BAD_REQUEST, { message: 'Can not create new car', });
    }
  }

  async remove(id: number) {
    const validateID = (await this.carsRepository.count({ where: { id: id } })) > 0
    if (validateID) {
      const t = await this.sequelize.transaction();
      try {
        await this.sequelize.query(`DELETE FROM cars WHERE id = :id;`, { replacements: { id: id }, transaction: t })
        await this.sequelize.query(`DELETE FROM prices WHERE car_id = :id;`, { replacements: { id: id }, transaction: t })
        await this.sequelize.query(`DELETE FROM images WHERE car_id = :id;`, { replacements: { id: id }, transaction: t })
        await t.commit();
      } catch (error) {
        await t.rollback();
        throw APIException.throwException(HttpStatus.BAD_REQUEST, { message: 'Can not delete this car', });

      }
    } else {
      throw APIException.throwException(HttpStatus.NOT_FOUND, { message: 'This id does not exist' });
    }

  }

  async findOne(id: number): Promise<CarResponseDto> {
    const validateID = (await this.carsRepository.count({ where: { id: id } })) > 0
    if (validateID) {
      const car = await this.carsRepository.findOne({ where: { id: id }, include: [Type, Image, Price, Status, Steering] });
      return new CarResponseDto(car)
    } else {
      throw APIException.throwException(HttpStatus.NOT_FOUND, { message: 'This id does not exist' });
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    let currentCar = await this.carsRepository.findOne({ where: { id: id }, include: [Type, Image, Price, Status, Steering] });
    if (!currentCar) {
      throw APIException.throwException(HttpStatus.NOT_FOUND, { message: 'This id does not exist' });
    }
    const t = await this.sequelize.transaction();

    try {
      let model = {
        name: updateCarDto.name,
        description: updateCarDto.description,
        capacity: updateCarDto.capacity,
        gasoline: updateCarDto.gasoline,
        type_id: updateCarDto.type_id,
        status_id: updateCarDto.status_id,
        steering_id: updateCarDto.steering_id
      };
      if ((currentCar.price[0].final_price != updateCarDto.price.final_price || currentCar.price[0].original_price != updateCarDto.price.original_price) && updateCarDto.price != null) {
        const price = await Price.create({ original_price: updateCarDto.price.original_price, discount: updateCarDto.price.discount, final_price: updateCarDto.price.final_price, car_id: id }, { transaction: t });
      }

      const [affectedRowsCount, updatedCars] = await this.carsRepository.update(model, {
        where: { id },
        returning: true,
        transaction: t
      });
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw APIException.throwException(HttpStatus.BAD_REQUEST, { message: 'Can not update this car', });
    }
  }
}
