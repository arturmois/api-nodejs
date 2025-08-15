import { db } from "./client.ts";
import { courses, enrollments, users } from "./schema.ts";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { hash } from "argon2";

const seed = async () => {
  const password = await hash("123456");
  const usersData = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password,
    role: faker.helpers.arrayElement(["STUDENT", "MANAGER"]),
  }));
  const usersResult = await db.insert(users).values(usersData).returning();
  const coursesData = Array.from({ length: 10 }).map(() => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
  }));
  const coursesResult = await db
    .insert(courses)
    .values(coursesData)
    .returning();
  const enrollmentsData = usersResult.map((user) => ({
    userId: user.id,
    courseId:
      coursesResult[Math.floor(Math.random() * coursesResult.length)].id,
  }));
  await db.insert(enrollments).values(enrollmentsData);
};

seed();
