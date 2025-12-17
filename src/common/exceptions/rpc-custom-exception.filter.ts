
import { Catch, RpcExceptionFilter, ArgumentsHost, UnauthorizedException, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { stat } from 'fs';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost){
  
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();
//Expandir error para ver en consola cuando hay un servicio no disponible
    if(rpcError.toString().includes('Empty response')){
      return response.status(500).json({
        status:500,
        message: rpcError.toString().substring(0, rpcError.toString().indexOf('(')-1)
      })
    }

    

    if (
      typeof rpcError === 'object' &&
      rpcError !== null &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const { status, message } = rpcError as { status: number | string; message: string };
      const statusCode = isNaN(+status) ? 400 : +status;
      return response.status(statusCode).json({ status: statusCode, message });
    }

    response.status(400).json({
      status:400,
      message: rpcError
    })
  }
}

