import { Request, Response, NextFunction } from "express";
import { customError } from "@softhyper/express-error-hanlder";

export const errHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof customError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  //console.log("ERR", err);

  res.status(400).send({ errors: "something went wrong!" });
};
