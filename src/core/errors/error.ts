import { ErrorName } from '../enum/error';
import { HttpStatusCodeEnum } from '../enum/httpsStatusCode';

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
