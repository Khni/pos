import express from "express";
import { currentUser } from "../../middleware/getUser";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: express.Request, res: express.Response) => {
    res.status(200).send(req.user);
  }
);

/**
 * testin
 */

router.get(
  "/api/setcookie",

  (req: express.Request, res: express.Response) => {
    res.cookie(`jwt`, 3232323, {
      // maxAge: 5000000,
      // // expires works the same as the maxAge
      // expires: new Date("01 12 2021"),
      // secure: process.env.NODE_ENV != "development",

      httpOnly: true,
      sameSite: "lax",
    });

    console.log("cookie set");

    res.status(200).send("cookie is setted");
  }
);

router.get(
  "/api/getcookie",

  (req: express.Request, res: express.Response) => {
    console.log(req.cookies.jwt);
    res.status(200).send("cookie is setted");
  }
);

router.get(
  "/api/cookie",

  (req: express.Request, res: express.Response) => {
    console.log(req.cookies);
    res.status(200).send("cookie ");
  }
);

router.get(
  "/api/clearcookie",

  (req: express.Request, res: express.Response) => {
    req.session = null;
    res.status(200).send("cookie has been cleared");
  }
);

export { router as getUser };
