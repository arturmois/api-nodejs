CREATE TYPE "public"."user_roles" AS ENUM('STUDENT', 'MANAGER');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_roles" DEFAULT 'STUDENT' NOT NULL;