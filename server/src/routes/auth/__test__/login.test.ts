import request from "supertest";
import { app } from "../../app";
import "../../test/setup"; //this must to solved
it("returns a 200 on successful login", async () => {
  const email = "test@test.com";
  const password = "password";
  await request(app).post("/api/users/register").send({
    email,
    password,
  });

  const response = await request(app)
    .post("/api/users/login")
    .send({
      email,
      password,
    })
    .expect(200);

  expect(response.body.user.email).toStrictEqual(email);
});
