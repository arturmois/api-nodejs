import { db } from "../database/client.ts";
import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courses } from "../database/schema.ts";
import { z } from "zod";

export const getCourses: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["courses"],
        summary: "Get all courses",
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string(),
              })
            ),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await db
        .select({
          id: courses.id,
          title: courses.title,
        })
        .from(courses);
      return reply.send({ courses: result });
    }
  );
};
