const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./src/database/config');
const clc = require('cli-color');

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

server.use('/api/screen', require('./src/routes/screen'));

server.listen(process.env.PORT || '8080', () => {
  process.stdout.write(clc.erase.screen);
  process.stdout.write(clc.move.top);
  console.log(clc.greenBright('Server Online'));
  console.log('Puerto ' + clc.yellow(process.env.PORT));
});
