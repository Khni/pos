import express, { NextFunction, Router } from "express";
import { body, validationResult, param } from "express-validator";
import { InputValidateError } from "@softhyper/express-error-hanlder";
import { User } from "../../models/User";
import { List, MultiLang } from "./multi-lang-strings";

const router = express.Router();

router.post(
  "/api/users/login",
  body("email")
    .isEmail()
    .withMessage(new MultiLang("en").loadString()?.invalidEmail),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be at least 8 chars"),
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InputValidateError(errors.array());
    }

    const user = await User.findByCredentials({
      email: req.body.email,
      password: req.body.password,
    });
    const tokens = user.generateAuthToken();
    //const tokens = User.generateAuthToken();
    req.session = {
      jwt: tokens.token,
    };
    res.status(200).send({ user, tokens });
  }
);

export { router as Login };
