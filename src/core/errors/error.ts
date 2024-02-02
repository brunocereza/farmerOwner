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

export class ErrorExtends extends ThrowError {
  constructor(message, code) {
    super(ErrorName.ValidationError, message, HttpStatusCodeEnum.notFound);

    //Verificado o Código de erro do TYPEORM
    if (code === '23503') {
      this.message = 'Not found, please, verify the ID(s)informed!';
    }
  }
}
