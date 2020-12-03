const { env } = process;
export const isDevelop = env.NODE_ENV === 'development';

const config = {
  NODE: {
    port: env.NODE_PORT || 5000,
  },
  MONGO: {
    base: env.MONGO_BASE || 'tutorial',
    host: env.MONGO_HOST || 'mongo',
    user: env.MONGO_USER || undefined,
    password: env.MONGO_PASSWORD || undefined,
    port: env.MONGO_PORT || 27017,
  },
}

export default config;