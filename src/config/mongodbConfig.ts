export const mongodbConfig = Object.freeze({
  host: process.env.MONGODB_HOST,
  port: process.env.MONGODB_PORT,
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASS,
  dbname: process.env.MONGODB_NAME,
});
