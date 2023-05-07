export interface IException {
  code: string;
  msg: string;
}
export class Result<T> extends Error {
  public httpStatusCode: 500;
  public code: string;
  public message: string;
  public data?: T;

  private constructor(httpStatusCode, message, code?, data?) {
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.data = data;
    this.code = code;

    Object.freeze(this);
  }

  static OK<T>(data: T) {
    throw new Result<T>(200, undefined, undefined, data);
  }

  static CREATED<T>(data: T) {
    throw new Result<T>(201, undefined, undefined, data);
  }

  static BAD_REQUEST_EXCEPTION(error: IException) {
    throw new Result(400, error.msg, error.code);
  }

  static NOT_FOUND_EXCEPTION(error: IException) {
    throw new Result(404, error.msg, error.code);
  }
  static CONFLICT_EXCEPTION(error: IException) {
    throw new Result(409, error.msg, error.code);
  }
  static UNAUTHORIZED(error: IException) {
    throw new Result(403, error.msg, error.code);
  }

  static INTERNAL_ERROR_EXCEPTION(error: IException) {
    throw new Result(500, error.msg, error.code);
  }
}
