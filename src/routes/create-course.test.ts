import { test, expect, beforeAll } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeAuthenticatedUser } from "../tests/factories/make-user.ts";

beforeAll(async () => {
  await server.ready();
});

test("create course", async () => {
  const { token } = await makeAuthenticatedUser("MANAGER");
  const response = await request(server.server)
    .post("/courses")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: faker.lorem.sentence(),
    });
  expect(response.statusCode).toBe(201);
  expect(response.body.courseId).toBeDefined();
});
