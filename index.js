const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./src/database/config');

require('dotenv').config();

const server = express();
dbConnection();

server.use(
  cors({
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

server.use(express.json());

server.use('/api/auth', require('./src/routes/auth'));
server.use('/api/user', require('./src/routes/user'));

server.listen(process.env.PORT || '8080', () => {
  console.log(`Servidor en linea! Puerto ${process.env.PORT}`);
});
