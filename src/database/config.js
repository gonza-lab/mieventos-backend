const mongoose = require('mongoose');
const clc = require('cli-color');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(clc.greenBright('DB Online'));
  } catch (error) {
    console.log(error);
    throw new Error('Error al inicializar la base de datos: ' + error);
  }
};

module.exports = { dbConnection };
