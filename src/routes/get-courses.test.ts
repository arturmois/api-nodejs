import { test, expect, beforeAll } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";
import crypto from "node:crypto";

beforeAll(async () => {
  await server.ready();
});

test("get courses", async () => {
  const title = crypto.randomUUID();
  const course = await makeCourse(title);
  const getResponse = await request(server.server)
    .get(`/courses?search=${title}`)
    .set("Content-Type", "application/json");
  expect(getResponse.statusCode).toBe(200);
  expect(getResponse.body.courses).toBeInstanceOf(Array);
  expect(getResponse.body.courses.length).toBe(1);
  expect(getResponse.body.courses[0].id).toBe(course.id);
  expect(getResponse.body.courses[0].title).toBe(course.title);
  expect(getResponse.body.total).toBe(1);
});
