import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlContextType } from '@nestjs/graphql';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Handle GraphQL errors separately
    if (host.getType<GqlContextType>() === 'graphql') {
      this.logger.error(`GraphQL Error: ${exception.message}`, exception.stack);
      return exception; // Apollo Server will format the error
    }

    let status = 500;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseMessage = exception.getResponse();
      message =
        typeof responseMessage === 'string'
          ? responseMessage
          : JSON.stringify(responseMessage);
    } else {
      this.logger.error(
        `Unhandled Exception: ${exception.message}`,
        exception.stack,
      );
      exception = new InternalServerErrorException();
    }

    if (typeof response.status === 'function') {
      response.status(status).json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      this.logger.error('Response object does not have a status function');
    }
  }
}
