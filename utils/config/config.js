// конфиг окружения
const {
  URL_DB = 'mongodb://localhost:27017/bitfilmsdb',
  PORT = 3000,
  DEV_SECRET = 'dev-secret',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  URL_DB,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  DEV_SECRET,
};
