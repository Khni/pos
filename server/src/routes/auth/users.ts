import express, { NextFunction } from "express";

import { User } from "../../models/User";
const router = express.Router();

router.get(
  "/api/users/all",
  async (req: express.Request, res: express.Response) => {
    const users = await User.find({});
    res.status(200).send(users);
  }
);

export { router as Users };
