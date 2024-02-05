import { ErrorName } from '../enum/error';
import { HttpStatusCodeEnum } from '../enum/https-status-code';

export class ThrowError extends Error {
  name: ErrorName;
  message: string;
  status: number;
  constructor(name: ErrorName, message: string, status: number) {
    super();
    this.name = name;
    this.message = message;
    this.status = status;
  }
}

export class NotFoundError extends ThrowError {
  constructor(message) {
    super(ErrorName.NotFoundError, message, HttpStatusCodeEnum.notFound);
  }
}

export class ErrorTreatment extends ThrowError {
  constructor(error) {
    super(
      ErrorName.ValidationError,
      error.message,
      HttpStatusCodeEnum.notFound,
    );

    //Verificado o Código de erro do TYPEORM
    switch (error.code) {
      case '23503':
        this.message = 'Not found, please, verify the ID(s)informed!';
        break;
      case '23505':
        this.message = 'information already registered!';
        break;
      default:
        this.message = error.message;
        break;
    }
  }
}
