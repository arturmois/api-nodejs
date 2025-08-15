import fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";
import { createCourse } from "./routes/create-course.ts";
import { getCourseById } from "./routes/get-course-by-id.ts";
import { getCourses } from "./routes/get-courses.ts";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Fastify API",
        version: "1.0.0",
      },
    },
  });
} else {
  server.register(scalarAPIReference, {
    routePrefix: "/docs",
  });
}

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(createCourse);
server.register(getCourseById);
server.register(getCourses);

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
