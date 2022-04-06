import express, { NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../../models/User";
import {
  ErrorMsg,
  InputValidateError,
  InputValidateErrorMiddleware,
} from "@softhyper/express-error-hanlder";
const router = express.Router();
declare global {
  namespace Express {
    interface Request {
      t?: any;
    }
  }
}
router.post(
  "/api/users/register",

  body("email").isEmail().withMessage("requierd valid email!"),
  body("password")
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 6 and 20 character"),
  InputValidateErrorMiddleware,
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    console.log("register");

    const exitingUser = await User.findOne({ email: req.body.email });
    if (exitingUser) {
      throw new ErrorMsg("Email is already in use.", 400);
    }
    const user = User.build({
      email: req.body.email,
      password: req.body.password,
    });

    const tokens = user.generateAuthToken();

    // req.session = {
    //   jwt: tokens.token,
    // };

    res.cookie(`jwt`, tokens.token, {
      maxAge: 5000000,
      // expires works the same as the maxAge
      // expires: new Date("01 12 2021"),
      secure: process.env.NODE_ENV != "development",

      httpOnly: true,
      sameSite: "lax",
    });

    try {
      await user.save();

      //name , express:sess
      // res
      //   .status(202)
      //   .cookie("Name", "Khaled", {
      //     sameSite: "strict",
      //     path: "/",
      //     expires: new Date(new Date().getTime() + 100 * 1000),
      //     httpOnly: true,
      //   })
      //   .send(user);
      res.status(201).send(user);
    } catch (err) {
      const result = (err as Error).message;
      throw new Error(result);
    }

    //  next(new databaseError());
  }
);

export { router as registerRouter };
