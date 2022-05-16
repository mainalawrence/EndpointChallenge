import dotenv from 'dotenv';

dotenv.config();

const sqlConfig = {
  user:process.env.DB_USERNAME as string,
  password:process.env.PASSWORD as string,
  server:process.env.DB_server as string,
  database:process.env.DB_NAME as string,
  port:1433,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis:30000
  },
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  }
}

export default sqlConfig;