import { Request, Response, NextFunction } from 'express';
import { ThrowError } from '../core/errors/error';
import { ErrorName } from '../core/enum/error';
import { HttpStatusCodeEnum } from '../core/enum/https-status-code';
import { verifyCpfCnpj } from '../utils/verifyCpfAndCnpj';

export const verifyDocumentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const document =
      req.body?.identity_document || req.params?.identity_document;

    if (document) {
      const documentIsValidated = verifyCpfCnpj(document);

      if (!documentIsValidated) {
        throw new ThrowError(
          ErrorName.unprocessableEntity,
          'Invalid Document, please, verify.',
          HttpStatusCodeEnum.unprocessableEntity,
        );
      }
    }

    next();
  } catch (err) {
    res.status(err.status).json(err);
  }
};
