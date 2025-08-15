import { z } from "zod";
import { db } from "../database/client.ts";
import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courses } from "../database/schema.ts";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      schema: {
        tags: ["courses"],
        summary: "Create a new course",
        body: z.object({
          title: z.string().min(1, "Title is required"),
        }),
        response: {
          201: z
            .object({
              courseId: z.uuid(),
            })
            .describe("Course created successfully"),
        },
      },
    },
    async (request, reply) => {
      const title = request.body.title;
      const courseId = crypto.randomUUID();
      await db.insert(courses).values({ id: courseId, title });
      return reply.status(201).send({ courseId });
    }
  );
};
