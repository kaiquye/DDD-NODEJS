import { Request, Response } from "express";
import { CustomErrorBase } from "../../../../domain/exceptions/base/custom-error";
import { Result } from "../custom-error";

export async function GlobalFilterError(
  error,
  req: Request,
  res: Response,
  next
) {
  console.log(error);
  if (error instanceof Result) {
    return res.status(error.httpStatusCode).json({
      error: true,
      message: error.message,
      code: error.code,
    });
  }
  if (error instanceof CustomErrorBase) {
    return res.status(error.status).json({
      error: true,
      message: error.message,
      data: error.value ?? null,
    });
  } else {
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
}
