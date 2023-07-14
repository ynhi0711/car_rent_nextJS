import { Expose } from "class-transformer";
export class CreateCarDto {
    name: string;
    description: string;
    capacity: number;
    gasoline: number;
    type_id: number;
    images: string[];
    @Expose({ name: 'status_id' })
    status_id: number;
    @Expose({ name: 'steering_id' })
    steering_id: number;
    price: PriceDto;
}

class PriceDto {
    original_price: number;
    discount: number;
    final_price: number;
}
