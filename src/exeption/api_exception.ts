import { HttpException, HttpStatus,BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException, } from '@nestjs/common';
import { Response } from 'express';

export class APIException extends HttpException {
  constructor(error: CustomExceptionResponse) {
    super(error.message, error.code);
  }

  static handle(exception: APIException, res: Response) {
    res.status(exception.getStatus()).json({ exception });
  }


  static error(
    options?: CustomExceptionResponse,
    errorCode?: number,
    title?: string,
  ): CustomExceptionResponse {
    return {
      code: options?.code ?? errorCode,
      title: options?.title ?? title ?? '',
      message: options?.message ?? '',
      errors: options?.errors ?? null,
    };
  }

  static detailError(options: CustomError): CustomError {
    return {
      code: options.code,
      field: options.field ?? '',
      message: options.message ?? '',
    };
  }

  static throwException(httpStatus: HttpStatus, options?: CustomExceptionResponse) {
    switch (httpStatus) {
      case HttpStatus.BAD_REQUEST: {
        const error = this.error(
          options,
          httpStatus,
          BadRequestException.name,
        );
        throw new BadRequestException(error);
      }
      case HttpStatus.UNAUTHORIZED: {
        const error = this.error(
          options,
          httpStatus,
          UnauthorizedException.name,
        );
        throw new UnauthorizedException(error);
      }
      case HttpStatus.FORBIDDEN: {
        const error = this.error(
          options,
          httpStatus,
          ForbiddenException.name,
        );
        throw new ForbiddenException(error);
      }
      case HttpStatus.NOT_FOUND: {
        const error = this.error(
          options,
          httpStatus,
          NotFoundException.name,
        );
        throw new NotFoundException(error);
      }
      case HttpStatus.METHOD_NOT_ALLOWED: {
        const error = this.error(
          options,
          httpStatus,
          MethodNotAllowedException.name,
        );
        throw new MethodNotAllowedException(error);
      }
      case HttpStatus.FORBIDDEN: {
        const error = this.error(
          options,
          httpStatus,
          ForbiddenException.name,
        );
        throw new ForbiddenException(error);
      }
      case HttpStatus.CONFLICT: {
        const error = this.error(
          options,
          httpStatus,
          ConflictException.name,
        );
        throw new ConflictException(error);
      }
      case HttpStatus.GATEWAY_TIMEOUT: {
        const error = this.error(
          options,
          httpStatus,
          RequestTimeoutException.name,
        );
        throw new RequestTimeoutException(error);
      }
      default: {
        const error = this.error(
          options,
          httpStatus,
          InternalServerErrorException.name,
        );
        throw new InternalServerErrorException(error);
      }
    }
  }
}
