import type { FastifyRequest, FastifyReply } from "fastify";
import { getAuthenticatedUserFromRequest } from "../../utils/get-authenticated-user-from-request.ts";

export const checkUserRole = (role: "MANAGER" | "STUDENT") => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = getAuthenticatedUserFromRequest(request);
    if (user.role !== role) {
      return reply.status(403).send({ error: "Forbidden" });
    }
  };
}
