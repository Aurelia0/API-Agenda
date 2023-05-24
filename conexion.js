const mysql = require('mysql2/promise');
require('dotenv').config();

// Conexión a la base de datos MySQL
async function connectToDatabase() {
  try {

    //pscale_pw_30lH5hOsAIRDQW0N6gkLqspUh82S3zKfzG4dcE0vOOX
    const connection = await mysql.createConnection('mysql://root:MAPBfr2iVTwRv0B61Flu@containers-us-west-129.railway.app:6953/railway');

    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
