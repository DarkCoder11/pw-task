const env = process.env.NODE_ENV || 'development';

const configs = {
  development: {
    API_URL: 'http://localhost:3000/api',
    DATABASE_LOCAL:
      process.env.MONGODB_URI ||
      'mongodb+srv://admin:admin@cluster0-qugmo.mongodb.net/test?retryWrites=true&w=majority',
    JWT_SECRET: 'secretkeykeysecret',
    JWT_EXPIRES_IN: '90d',
    JWT_COOKIE_EXPIRES: '90',
  },
  production: {
    API_URL: '/api',
    DATABASE_LOCAL:
      process.env.MONGODB_URI ||
      'mongodb+srv://admin:admin@cluster0-qugmo.mongodb.net/test?retryWrites=true&w=majority',
    JWT_SECRET: 'secretkeykeysecret',
    JWT_EXPIRES_IN: '90d',
    JWT_COOKIE_EXPIRES: '90',
  },
}[env];

module.exports = configs;
