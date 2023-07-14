import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import * as constant from '../constant';

import { QueryTypes, Sequelize } from 'sequelize';
import { Car } from 'database/models/car';
import { Image } from 'database/models/images';
import { Type } from 'database/models/types';
import { Price } from 'database/models/prices';
import { Steering } from 'database/models/steerings';
import { Status } from 'database/models/status';

@Injectable()
export class CarService {

  constructor(
    @Inject(constant.CARS_REPOSITORY)
    private carsRepository: typeof Car,

    @Inject(constant.SEQUELIZE)
    private sequelize: Sequelize,
  ) { }


  async findAll(): Promise<Object[]> {
    return this.carsRepository.findAll({ include: [Type, Image, Price, Status, Steering] })
    /*const carWithImages = await this.sequelize.query(
      `SELECT c.*, GROUP_CONCAT(i.id SEPARATOR '|') as imageIds, GROUP_CONCAT(i.url SEPARATOR '|') as imageUrls,
      type.id  AS  'type.id', type.name  AS  'type.name' , type.description  AS  'type.description',  type.createdAt AS 'type.createdAt' , type.updatedAt AS  'type.updatedAt'
      FROM Cars c
      LEFT JOIN Images i ON c.id = i.carId
      LEFT JOIN Types type ON c.typeId = type.id
      GROUP BY c.id, c.name`,
      {
        type: QueryTypes.SELECT,
        nest: true
      }
    );

    // Handle the result and convert it into the desired format
    let a = carWithImages.map((car: CarResult) => ({
      id: car.id,
      name: car.name,
      description: car.description,
      price: car.price,
      capavity: car.capacity,
      steering: car.steering,
      gasoline: car.gasoline,
      images: car.imageIds.split("|").map((imageId, index) => ({
        id: imageId,
        carId: car.id,
        url: car.imageUrls.split("|")[index],
      })),
      type: car.type
    }));
    return a; */
  }

  async create(createCarDto: CreateCarDto) {
    const t = await this.sequelize.transaction(); // Start the transaction

    try {
      let model = {
        name: createCarDto.name,
        description: createCarDto.description,
        capacity: createCarDto.capacity,
        gasoline: createCarDto.gasoline,
        typeId: createCarDto.type_id,
        statusId: createCarDto.status_id,
        steeringId: createCarDto.steering_id
      };
      const car = await Car.create(model, { transaction: t }); // Create the car

      for (const imageData of createCarDto.images) {
        const image = await Image.create({ url: imageData, car_id: car.id }, { transaction: t });
        // Associate the image with the car by setting its `carId`
      }
      const price = await Price.create({ original_price: createCarDto.price.original_price, discount: createCarDto.price.discount, final_price: createCarDto.price.final_price, car_id: car.id }, { transaction: t });
      car.price = price;
      await t.commit(); // All operations are successful, commit the transaction
      return car;
    } catch (error) {
      await t.rollback(); // Something went wrong, roll back the transaction
      throw error;
    }

    /* return await this.sequelize.query('BEGIN;' +
      'INSERT INTO Cars (name,price,description,steering,capacity,gasoline,typeId,creationDate,updatedOn) VALUES (' + createCarDto.name + ',' + createCarDto.price + ',' + createCarDto.description + ',' + createCarDto.steering + ',' + createCarDto.capacity + ',' + createCarDto.gasoline + ',' + createCarDto.typeId + ',' + Date.now + ',' + Date.now + ');' +
      'INSERT INTO  Images  ( id , carId , url , description , createdAt , updatedAt ) VALUES (DEFAULT,LAST_INSERT_ID(),' + createCarDto.images[0].url + ',' + createCarDto.images[0].description + + Date.now + ',' + Date.now + ');' +
      'COMMIT;', {
      nest: true,
      type: QueryTypes.SELECT,
      mapToModel: true
    }) */


    // return this.carsRepository.create({
    //   name: createCarDto.name,
    //   description: createCarDto.description,
    //   steeringId: createCarDto.steering_id,
    //   capacity: createCarDto.capacity,
    //   gasoline: createCarDto.gasoline,
    //   typeId: createCarDto.type_id,
    //   images: createCarDto.images.map(a => new Image({ url: a })),
    //   price: new Price({ original_price: createCarDto.price.originalPrice, discount: createCarDto.price.discount, final_price: createCarDto.price.originalPrice }),
    //   statusId: createCarDto.status_id,
    // }, { include: [Type, Image, Price, Status, Steering] })

   
  }

  async findOne(id: number): Promise<Car | null> {
    return this.carsRepository.findOne({ where: { id: id }, include: [Type, Image, Price, Status, Steering] });

    // return this.sequelize.query(
    //   `SELECT DISTINCT Car.id, Car.name, Car.price, Car.description,  Car.steering ,  Car.capacity ,  Car.gasoline ,  Car.isActive ,  Car.creationDate ,  Car.updatedOn ,
    //  type.id  AS  'type.id', type.name  AS  'type.name' , type.description  AS  'type.description',  type.createdAt AS 'type.createdAt' , type.updatedAt AS  'type.updatedAt' , 
    //  images.id  AS  'images.id' ,  images.carId  AS  'images.carId' ,  images.url  AS  'images.url' ,  images.description AS 'images.description' ,  images.createdAt  AS  'images.createdAt' ,  images.updatedAt  AS  'images.updatedAt'
    //  FROM  Cars  AS  Car 
    //  LEFT  JOIN  Types  AS  type  ON  Car.typeId  =  type.id 
    //  LEFT  JOIN  Images  AS  images  ON  Car.id  =  images.carId
    //   WHERE Car.id = :carId`,
    //   {
    //     nest: true,
    //     replacements: { carId: id },
    //     type: QueryTypes.SELECT,
    //     mapToModel: true,
    //     raw: true
    //   }
    // );
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    //   let car = await this.carsRepository.findOne({ include: ['type', 'images'], where: { id: id } });
    //   car.name = updateCarDto.name
    //   car.description = updateCarDto.description
    //   car.price = updateCarDto.price
    //   car.steering = updateCarDto.steering
    //   car.capacity = updateCarDto.capacity
    //   car.gasoline = updateCarDto.gasoline
    //   car.typeId = updateCarDto.typeId

    //   // return this.carsRepository.upsert(car, { include: [Type, Image] })
    // }

    // async remove(id: number) {
    //   return await this.sequelize.query('DELETE FROM cars where cars.id = ' + id)
    // }
  }

  // class CarResult {
  //   id: number;
  //   name: string;
  //   price: number;
  //   capacity: string;
  //   description: string;
  //   typeId: number;
  //   isActive: boolean;
  //   imageIds: string;
  //   imageUrls: string;
  //   steering: string;
  //   gasoline: string;
  //   type: Type

}
