import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
@Catch()
export class TestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response:Response = host.switchToHttp().getResponse()
    response.status(400).json({
      status: 400,
      success:false,
      message: exception.message,
      data:{}
    })
  }
}
 