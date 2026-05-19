import { Response } from "express";
import { errorFormater } from "./error/error-formater.util";

export class HttpResponse {
  static ok<T>(res: Response, data: T) {
    return res.status(200).json({ success: true, data });
  }

  static created<T>(res: Response, data: T) {
    return res.status(201).json({ success: true, data });
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }

  static badRequest(res: Response, error: unknown = "Invalid request.") {
    const formatted = errorFormater(error, 400, "BAD_REQUEST");
    return res
      .status(formatted.status)
      .json({ success: false, error: formatted });
  }

  static unauthorized(res: Response, error: unknown = "Unauthorized action.") {
    const formatted = errorFormater(error, 401, "UNAUTHORIZED");
    return res
      .status(formatted.status)
      .json({ success: false, error: formatted });
  }

  static forbidden(res: Response, error: unknown = "Forbidden action.") {
    const formatted = errorFormater(error, 403, "FORBIDDEN");
    return res
      .status(formatted.status)
      .json({ success: false, error: formatted });
  }

  static notFound(res: Response, error: unknown = "Resource not found.") {
    const formatted = errorFormater(error, 404, "NOT_FOUND");
    return res
      .status(formatted.status)
      .json({ success: false, error: formatted });
  }

  static conflict(res: Response, error: unknown = "Conflict.") {
    const formatted = errorFormater(error, 409, "CONFLICT");
    return res
      .status(formatted.status)
      .json({ success: false, error: formatted });
  }

  static serverError(res: Response, error: unknown = "Internal server error.") {
    const formatted = errorFormater(error, 500, "SERVER_ERROR");
    return res
      .status(formatted.status)
      .json({ success: false, error: formatted });
  }
}
