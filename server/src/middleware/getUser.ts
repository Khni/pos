import express from "express";
import jwt from "jsonwebtoken";
import { ErrorMsg } from "@softhyper/express-error-hanlder";

interface userPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: userPayload;
    }
  }
}
const currentUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.cookies.jwt) {
    //return next();
    throw new ErrorMsg("You are not Authenticated, please Login.", 401);
  }

  try {
    const JWT_KEY = process.env.JWT_KEY!;
    const user = jwt.verify(req.cookies.jwt, JWT_KEY) as userPayload;

    req.user = {
      email: user.email,
      id: user.id,
    };
  } catch (error) {
    throw new ErrorMsg("Login session is expired. Please login again", 401);
  }
  next();
};

export { currentUser };
