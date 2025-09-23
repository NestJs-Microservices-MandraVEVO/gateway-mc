import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { ORDER_SERVICE } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
          {
            name: ORDER_SERVICE,
            transport: Transport.TCP,
            options:{
              host: envs.ORDER_MICROSERVICES_HOST,
              port: +envs.ORDER_MICROSERVICES_PORT
            }
          },
        ]),
  ],
})
export class OrdersModule {}
