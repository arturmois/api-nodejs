import { faker } from "@faker-js/faker";
import { db } from "../../database/client.ts";
import { users } from "../../database/schema.ts";
import { hash } from "argon2";
import { randomUUID } from "node:crypto";

export const makeUser = async () => {
  const passwordBeforeHash = randomUUID();
  const result = await db
    .insert(users)
    .values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await hash(passwordBeforeHash),
      role: faker.helpers.arrayElement(["STUDENT", "MANAGER"]),
    })
    .returning();
  return {
    user: result[0],
    passwordBeforeHash,
  };
};
