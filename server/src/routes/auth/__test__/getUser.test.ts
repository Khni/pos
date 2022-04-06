import request from "supertest";
import { app } from "../../app";
import "../../test/setup"; //this must to solved

it("test get current user", async () => {
  const cookie = await global.getCookie();
  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(res.body.email).toBe("email@test.com");
});

it("test get current user than does not has a cookie", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(401);

  expect(res.body.email).toBe(undefined);
});
