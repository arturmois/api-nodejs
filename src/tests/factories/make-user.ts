import { faker } from "@faker-js/faker";
import { db } from "../../database/client.ts";
import { users } from "../../database/schema.ts";
import { hash } from "argon2";
import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";

export const makeUser = async (role: "STUDENT" | "MANAGER" = "STUDENT") => {
  const passwordBeforeHash = randomUUID();
  const result = await db
    .insert(users)
    .values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await hash(passwordBeforeHash),
      role,
    })
    .returning();
  return {
    user: result[0],
    passwordBeforeHash,
  };
};

export const makeAuthenticatedUser = async (role: "STUDENT" | "MANAGER" = "STUDENT") => {
  const { user } = await makeUser(role);
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return {
    user,
    token,
  };
};