import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod/v3";
import { isZodSchema } from "../utils/is-zod-schema.util";
import { HttpResponse } from "../utils/http-response.util";

export interface IEndpointsSchemas {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export const validateSchema =
  (schema: IEndpointsSchemas) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      //DEPURATION
      console.log("QUERY ANTES DE ZOD VALIDATOR", {
        body: req.body,
        params: req.params,
        query: req.query,
      });

      //Mapping schema + Detect if some schema is not a zod schema
      //schema.body
      if (schema.body) {
        if (isZodSchema(schema.body)) {
          req.body = schema.body.parse(req.body);
        } else {
          throw new Error("Invalid schema: schema.body is not a ZodSchema.");
        }
      } else if (
        schema.body === undefined &&
        req.body &&
        Object.keys(req.body).length > 0
      ) {
        console.log("aSDJASDJASJDAJSDJASDJA");
        throw new ValidationError(
          "Request body is not allowed for this endpoint.",
        );
      }

      //schema.params
      if (schema.params) {
        if (isZodSchema(schema.params)) {
          req.params = schema.params.parse(req.params);
        } else {
          throw new Error("Invalid schema: schema.params is not a ZodSchema.");
        }
      } else if (Object.keys(req.params).length > 0) {
        throw new ValidationError(
          "Request param is not allowed for this endpoint.",
        );
      }

      //schema.query
      if (schema.query) {
        if (isZodSchema(schema.query)) {
          const parsedQuery = schema.query.parse(req.query);
          Object.assign(req.query, parsedQuery);
        } else {
          throw new Error("Invalid schema: schema.query is not a ZodSchema.");
        }
      } else if (Object.keys(req.query).length > 0) {
        throw new ValidationError(
          "Request query is not allowed for this endpoint.",
        );
      }

      //DEPURATION
      console.log("QUERY DESPUES DE ZOD VALIDATOR", {
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        HttpResponse.badRequest(res, error);
        return;
      } else if (error instanceof ValidationError) {
        HttpResponse.badRequest(res, error.message);
        return;
      }
      throw error;
    }
  };
