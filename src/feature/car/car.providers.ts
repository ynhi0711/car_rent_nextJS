import * as constant from '../../common/constant';
import { Car } from 'src/feature/car/entities/car.entity';

export const carProviders = [
  {
    provide: constant.CARS_REPOSITORY,
    useValue: Car,
  },
];
