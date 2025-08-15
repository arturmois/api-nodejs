import { test, expect, beforeAll } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
  await server.ready();
});

test("create course", async () => {
  const response = await request(server.server)
    .post("/courses")
    .set("Content-Type", "application/json")
    .send({
      title: faker.lorem.sentence(),
    });
  expect(response.statusCode).toBe(201);
  expect(response.body.courseId).toBeDefined();
});
