import request from "supertest";
import { app } from "../../app";
import "../../test/setup"; //this must to solved

it("test get current user", async () => {
  await request(app)
    .post("/api/users/register")
    .send({
      email: "khaled@test.com",
      password: "password",
    })
    .expect(201);

  const res = await request(app).get("/api/users/signout").send().expect(200);
  expect(res.get("Set-Cookie")).toEqual([
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly",
  ]);
});
