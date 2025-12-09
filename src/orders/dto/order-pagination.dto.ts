import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { OrderStatus, OrderStatusList } from "../enums/order.enums";


export class OrderPaginationDto extends PaginationDto {

    @IsOptional()
    @IsEnum(OrderStatus,{
        message: `valid status are ${OrderStatusList}`
    } )
    status: OrderStatus;

}