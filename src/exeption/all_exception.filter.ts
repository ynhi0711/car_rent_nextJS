import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { APIException } from './api_exception';
import { MESSAGES } from '@nestjs/core/constants';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof APIException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
            error: exception instanceof APIException ? exception : {
                code: httpStatus,
                title: 'Server Error',
                message: MESSAGES.UNKNOWN_EXCEPTION_MESSAGE
            }
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}