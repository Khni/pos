import express from "express";
import { currentUser } from "../../middleware/getUser";
import { Category } from "../../models/Category";
import { body } from "express-validator";
import {
  ErrorMsg,
  InputValidateError,
  InputValidateErrorMiddleware,
} from "@softhyper/express-error-hanlder";
const router = express.Router();

router.post(
  "/api/categories",

  currentUser,
  body("name")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must be between 2 and 30 character"),
  InputValidateErrorMiddleware,
  async (req: express.Request, res: express.Response) => {
    const category = Category.build({
      name: req.body.name,
      userId: req.user?.id as string,
    });

    try {
      await category.save();

      res.status(201).send(category);
    } catch (err) {
      const result = (err as Error).message;
      throw new Error(result);
    }
  }
);

export { router as addCategory };
