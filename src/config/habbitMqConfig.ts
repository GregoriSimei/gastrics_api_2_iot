export const habbitMqConfig = Object.freeze({
  host: process.env.RABBITMQ_HOST,
  port: process.env.RABBITMQ_PORT,
  user: process.env.RABBITMQ_USER,
  pass: process.env.RABBITMQ_PASS,
});
