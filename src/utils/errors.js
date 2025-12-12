export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const BadRequest = (msg) => new HttpError(400, msg);
export const Unauthorized = (msg) => new HttpError(401, msg);
export const NotFound = (msg) => new HttpError(404, msg);

