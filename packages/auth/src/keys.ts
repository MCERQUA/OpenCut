import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    server: {
      BETTER_AUTH_SECRET: z.string().default("dummy-secret-for-build"),
      UPSTASH_REDIS_REST_URL: z.string().url().default("http://localhost:8079"),
      UPSTASH_REDIS_REST_TOKEN: z.string().default("dummy-token-for-build"),
    },
    client: {
      NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url().default("http://localhost:3000"),
    },
    runtimeEnv: {
      NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || "dummy-secret-for-build",
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || "http://localhost:8079",
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || "dummy-token-for-build",
    },
  });
