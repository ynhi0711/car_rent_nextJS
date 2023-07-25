import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Role } from 'src/common/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/guard/roles.guard';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post('calculate_price')
  calculatePrice(@Body() createPlaceOrderDto: CreateOrderDto): Promise<any> {
    return this.ordersService.calculatePrice(createPlaceOrderDto);
  }

  @Post('place_order')
  @UseGuards(RolesGuard)
  @Roles(Role.User)
  // @UsePipes(new CustomValidationPipe())
  create(
    @Req() req: Request,
    @Body() createPaymentDto: CreateOrderDto,
  ) {
    return this.ordersService.placeOrder(req.user['sub'], createPaymentDto);
  }

  @Get()
  findAll(@Query('limit') limit: number = 20, @Query('offset') offset: number = 0) {
    return this.ordersService.findAll(limit, offset);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.getOrderById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    // return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.ordersService.remove(+id);
  }
}
