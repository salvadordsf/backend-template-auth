import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/http-response.util";

export const serverErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error("🔥 Server error:", error);
  HttpResponse.serverError(res, error);
};
