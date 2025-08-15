import { test, expect, beforeAll } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { makeUser } from "../tests/factories/make-user.ts";

beforeAll(async () => {
  await server.ready();
});

test("login", async () => {
  const { user, passwordBeforeHash } = await makeUser();
  const response = await request(server.server)
    .post("/sessions")
    .set("Content-Type", "application/json")
    .send({
      email: user.email,
      password: passwordBeforeHash,
    });
  expect(response.statusCode).toBe(200);
  expect(response.body.token).toBeDefined();
});

test("login with invalid credentials", async () => {
  const { user, passwordBeforeHash } = await makeUser();
  const response = await request(server.server)
    .post("/sessions")
    .set("Content-Type", "application/json")
    .send({
      email: user.email,
      password: "invalid-password",
    });
  expect(response.statusCode).toBe(401);
  expect(response.body.error).toBe("Invalid credentials");
});

test("login with invalid user", async () => {
  const { passwordBeforeHash } = await makeUser();
  const response = await request(server.server)
    .post("/sessions")
    .set("Content-Type", "application/json")
    .send({
      email: "invalid-email@example.com",
      password: passwordBeforeHash,
    });
  expect(response.statusCode).toBe(401);
  expect(response.body.error).toBe("Invalid credentials");
});
