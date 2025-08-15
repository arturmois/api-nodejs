import { test, expect, beforeAll } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";

beforeAll(async () => {
  await server.ready();
});

test("get course by id", async () => {
  const course = await makeCourse();
  const getResponse = await request(server.server)
    .get(`/courses/${course.id}`)
    .set("Content-Type", "application/json");
  expect(getResponse.statusCode).toBe(200);
  expect(getResponse.body.course.id).toBe(course.id);
  expect(getResponse.body.course.title).toBe(course.title);
});

test("get course by id not found", async () => {
  const getResponse = await request(server.server)
    .get(`/courses/550e8400-e29b-41d4-a716-446655440000`)
    .set("Content-Type", "application/json");
  expect(getResponse.statusCode).toBe(404);
});
