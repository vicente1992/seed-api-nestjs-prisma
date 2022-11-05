import { HttpException } from '@nestjs/common';

export const handleHttpError = (message = 'Forbidden', code = 403) => {
  throw new HttpException(message, code);
};
