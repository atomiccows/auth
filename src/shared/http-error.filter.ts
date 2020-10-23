import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class HttpErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = (status !== HttpStatus.INTERNAL_SERVER_ERROR) ? (exception.message.error ||
      exception.message || null) : 'Internal Server Error';

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(exception),
        `ExceptionFilter`,
      );
    }

    const errorResponse = {
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    };

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      `ExceptionFilter`,
    );

    response.status(status).json(errorResponse);
  }
}
