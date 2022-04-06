import "./db/mongoose";
import { app } from "./app";
app.listen(3000, () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must  be defined");
  }
  console.log("Listening on port 4000! ");
});
