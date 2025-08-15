import { db } from "../database/client.ts";
import { type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courses, enrollments } from "../database/schema.ts";
import { z } from "zod";
import { and, asc, count, eq, ilike, type SQL } from "drizzle-orm";

export const getCourses: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["courses"],
        summary: "Get all courses",
        querystring: z.object({
          search: z.string().optional(),
          orderBy: z.enum(["id", "title"]).optional().default("id"),
          page: z.coerce.number().optional().default(1),
        }),
        response: {
          200: z.object({
            courses: z.array(
              z.object({
                id: z.uuid(),
                title: z.string(),
                enrollments: z.number(),
              })
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { search, orderBy, page } = request.query;
      const conditions: SQL[] | undefined = [];
      if (search) {
        conditions.push(ilike(courses.title, `%${search}%`));
      }
      const [result, total] = await Promise.all([
        db
          .select({
            id: courses.id,
            title: courses.title,
            enrollments: count(enrollments.courseId),
          })
          .from(courses)
          .leftJoin(enrollments, eq(courses.id, enrollments.courseId))
          .where(and(...conditions))
          .orderBy(asc(courses[orderBy]))
          .limit(10)
          .offset((page - 1) * 10)
          .groupBy(courses.id),
        db.$count(courses, and(...conditions)),
      ]);
      return reply.send({ courses: result, total });
    }
  );
};
