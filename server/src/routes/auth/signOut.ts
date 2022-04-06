import express from "express";
const router = express.Router();

router.get(
  "/api/users/signout",
  (req: express.Request, res: express.Response) => {
    req.session = null;

    res.send({});
  }
);

export { router as signOut };
