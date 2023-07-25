import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    car_id: number;

    @IsDateString()
    @IsNotEmpty()
    pick_up_date: Date;


    @IsNotEmpty()
    pick_up_location: string;

    // @IsEndDateAfterStartDate("pick_up_date", {
    //     message: "drop_off_date must be larger than pick_up_date"
    // })
    @IsDateString()
    @IsNotEmpty()
    drop_off_date: Date;


    @IsNotEmpty()
    drop_off_location: string;

    @IsString()
    @IsOptional()
    coupon_code?: string;
}
