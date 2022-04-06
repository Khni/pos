import express from "express";
//this for async function which include Error middleware
import "express-async-errors";
import { json } from "body-parser";
import { body, validationResult } from "express-validator";
const cookieParser = require("cookie-parser");

import { errHandler } from "@softhyper/express-error-hanlder";
import cookieSession from "cookie-session";
const path = require("path");
var cors = require("cors");
//auth routes//--------------------------
import { registerRouter } from "./routes/auth/register";
import { Users } from "./routes/auth/users";
import { Login } from "./routes/auth/login";
import { getUser } from "./routes/auth/getUser";
import { signOut } from "./routes/auth/signOut";
//---------------------------------------

//categories routes//--------------------------
import { addCategory } from "./routes/categories/addCategory";
import { getCategories } from "./routes/categories/getCategories";
//---------------------------------------

const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./locales/{{lng}}/translation.json",
    },
  });
const app = express();

app.use(cors({ origin: "http://localhost:8100", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(middleware.handle(i18next));
app.set("trust proxy", true);
app.use(json());
// app.get("/api/users/oo", (req, res) => {
//   res.send(req.t("invalid"));
// });
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "development", //https secure
  })
);

console.log(process.env.NODE_ENV);

app.use(getUser);
app.use(registerRouter);
app.use(Users);
app.use(Login);
app.use(signOut);
app.use(errHandler);

app.use(addCategory);
app.use(getCategories);

app.use(errHandler);
// app.all("*", (req: express.Request, res: express.Response) => {
//   res.status(404).send("not Found");
// });

export { app };
