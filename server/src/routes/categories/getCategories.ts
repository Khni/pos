import express from "express";
import { currentUser } from "../../middleware/getUser";
import { Category } from "../../models/Category";

const router = express.Router();

router.get(
  "/api/categories",

  currentUser,
  async (req: express.Request, res: express.Response) => {
    const categories = await Category.find({ userId: req.user?.id });
    try {
      res.status(201).send(categories);
    } catch (err) {
      const result = (err as Error).message;
      throw new Error(result);
    }
  }
);

export { router as getCategories };
