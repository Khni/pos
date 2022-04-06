import request from "supertest";
import { app } from "../../app";
import "../../test/setup"; //this must to solved
it("returns a 201 on successful register", async () => {
  return request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 because of providing invalid Email.", async () => {
  return await request(app)
    .post("/api/users/register")
    .send({
      email: "testtest.com",
      password: "password",
    })
    .expect(400);
});
it("Try to register with already in use Email.", async () => {
  const res = await request(app)
    .post("/api/users/register")
    .send({
      email: "test1@test.com",
      password: "password",
    })
    .expect(201);
  const res3 = await request(app)
    .post("/api/users/register")
    .send({
      email: "test2@test.com",
      password: "password",
    })
    .expect(201);
  const res2 = await request(app)
    .post("/api/users/register")
    .send({
      email: "test1@test.com",
      password: "password",
    })
    .expect(400);
});
