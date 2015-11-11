var env = process.env.NODE_ENV;

// Default settings go here
var settings = {
  LOG_LEVEL: 'info',
  PORT: process.env.PORT || 3000,

  REDIS: {
    host: process.env.REDIS_HOST || 'localhost',
    max_attempts: process.env.REDIS_MAX_ATTEMPTS || 0,
    retry_max_delay: process.env.REDIS_RETRY_MAX_DELAY || 10000,
    port: process.env.ENV_REDIS_PORT || 6379
  },

  MONGO: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    db: process.env.MONGO_DATABASE || 'cite-that'
  },

  ENV: env || 'development'
}

if ( typeof env === 'undefined' ) {
  env = 'development';
}

if ( env == 'development' ) {
} else if ( env === 'test' ) {
  settings.LOG_LEVEL = 'text';
} else if ( env === 'production' ) {
  settings.PORT = process.env.PORT || 80;
}

// For docker settings
if (process.env.RUNNING_DOCKER === 'true') {
  settings.REDIS.host = process.env.REDIS_HOST || 'redis';
  settings.MONGO.host = process.env.MONGO_HOST || 'mongo';
}

module.exports = settings;
