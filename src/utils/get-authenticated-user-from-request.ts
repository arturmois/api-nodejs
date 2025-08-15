import type { FastifyRequest } from "fastify";

export const getAuthenticatedUserFromRequest = (request: FastifyRequest) => {
  const { user } = request;
  if (!user) {
    throw new Error("User not authenticated");
  }
  return user;
};