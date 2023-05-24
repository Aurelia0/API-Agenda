const express = require('express');
const mysql = require('mysql2/promise');
const usuariosRouter = require('./usuarios');
const clientesRouter = require('./clientes');
const eventosRouter = require('./eventos');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes HTTP
app.use(express.json());



// Rutas de usuarios
app.use('/usuarios', usuariosRouter);
app.use ('/clientes', clientesRouter);
app.use ('/eventos', eventosRouter);
app.use('/', (req, res) => {
  res.send('Bienvenido a la API de gestión de gastos');
});
  
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
