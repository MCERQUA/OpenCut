import { vercel } from "@t3-oss/env-core/presets-zod";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { keys as auth } from "@opencut/auth/keys";
import { keys as db } from "@opencut/db/keys";

export const env = createEnv({
  extends: [vercel(), auth(), db()],
  server: {
    ANALYZE: z.string().optional(),
    // Added by Vercel
    NEXT_RUNTIME: z.enum(["nodejs", "edge"]).optional(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    UPSTASH_REDIS_REST_URL: z.string().url().default("http://localhost:8079"),
    UPSTASH_REDIS_REST_TOKEN: z.string().default("dummy-token-for-build"),
    FREESOUND_CLIENT_ID: z.string().default("dummy-client-id"),
    FREESOUND_API_KEY: z.string().default("dummy-api-key"),
    // R2 / Cloudflare
    CLOUDFLARE_ACCOUNT_ID: z.string().default("dummy-account-id"),
    R2_ACCESS_KEY_ID: z.string().default("dummy-access-key"),
    R2_SECRET_ACCESS_KEY: z.string().default("dummy-secret-key"),
    R2_BUCKET_NAME: z.string().default("dummy-bucket"),
    // Modal transcription
    MODAL_TRANSCRIPTION_URL: z.string().default("http://localhost:8080"),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    NODE_ENV: process.env.NODE_ENV,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || "http://localhost:8079",
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || "dummy-token-for-build",
    FREESOUND_CLIENT_ID: process.env.FREESOUND_CLIENT_ID || "dummy-client-id",
    FREESOUND_API_KEY: process.env.FREESOUND_API_KEY || "dummy-api-key",
    // R2 / Cloudflare
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID || "dummy-account-id",
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID || "dummy-access-key",
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY || "dummy-secret-key",
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME || "dummy-bucket",
    // Modal transcription
    MODAL_TRANSCRIPTION_URL: process.env.MODAL_TRANSCRIPTION_URL || "http://localhost:8080",
  },
});
