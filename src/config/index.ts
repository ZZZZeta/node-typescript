const { env } = process;
export const isDevelop = env.NODE_ENV === "development";

const config = {
  NODE: {
    port: env.NODE_PORT || 5000,
  },
  MONGO: {
    base: env.MONGO_BASE || "tutorial",
    host: env.MONGO_HOST || "localhost",
    user: env.MONGO_USER || undefined,
    password: env.MONGO_PASSWORD || undefined,
    port: env.MONGO_PORT || 27017,
  },
  SESSION_SECRET: env.SESSION_SECRET || "test",
  AUTH: {
    lifetime: {
      accessToken: '60m',
      refreshToken: 24 * 60,
    },
    algorithm: "HS256",
  },
};

export default config;
