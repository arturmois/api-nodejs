import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

type JwtPayload = {
  sub: string;
  role: "STUDENT" | "MANAGER";
};

export const checkRequestJwt = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const token = request.headers.authorization;
  if (!token) {
    return reply.status(401).send({ error: "Unauthorized" });
  }
  const [, tokenWithoutBearer] = token.split(" ");
  if (!tokenWithoutBearer) {
    return reply.status(401).send({ error: "Unauthorized" });
  }
  if (!process.env.JWT_SECRET) {
    return reply.status(500).send({ error: "Internal server error" });
  }
  try {
    const payload = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET) as JwtPayload;
    request.user = payload;
  } catch (error) {
    return reply.status(401).send({ error: "Unauthorized" });
  }
  return true;
};
