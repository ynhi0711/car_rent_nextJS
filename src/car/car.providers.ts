import * as constant from '../common/constant';
import { Car } from "database/models/car";


export const carProviders = [
  {
    provide: constant.CARS_REPOSITORY,
    useValue: Car,
  },
];