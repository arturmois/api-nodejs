import { db } from "../database/client.ts";
import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { users } from "../database/schema.ts";
import { z } from "zod";
import { verify } from "argon2";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/sessions",
    {
      schema: {
        tags: ["auth"],
        summary: "Login",
        body: z.object({
          email: z.email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          400: z.object({
            error: z.string(),
          }),
        },
        security: [
          {
            apiKey: [],
          },
        ],
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (!user) {
        return reply.status(400).send({ error: "Invalid credentials" });
      }
      const isPasswordValid = await verify(user.password, password);
      if (!isPasswordValid) {
        return reply.status(400).send({ error: "Invalid credentials" });
      }
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not set");
      }
      const token = jwt.sign(
        {
          sub: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return reply.status(200).send({ token });
    }
  );
};
