import { Expose } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsNumberString,
  IsObject,
  IsString,
  isString,
} from 'class-validator';
export class CreateCarDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  capacity: number;
  @IsNumber()
  gasoline: number;
  @IsNumber()
  type_id: number;
  @IsArray()
  images: string[];
  @IsNumber()
  @Expose({ name: 'status_id' })
  status_id: number;
  @IsNumber()
  @Expose({ name: 'steering_id' })
  steering_id: number;
  price: number;
}