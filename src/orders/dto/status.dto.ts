import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enums/order.enums";


export class StatusDto {
    @IsOptional()
    @IsEnum(OrderStatusList,{
        message: `possible status values are ${OrderStatusList}`
    })
    status: OrderStatus;

}