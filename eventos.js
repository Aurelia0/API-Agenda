const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./conexion');

// Obtener todos los eventos
router.get('/', async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT * FROM evento');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
});

// Obtener todos los eventos de clientes de un usuario específico por ID de usuario
router.get('/usuario/:idusuario', async (req, res) => {
  const { idusuario } = req.params;
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT * FROM evento WHERE idcliente IN (SELECT idcliente FROM evento WHERE idusuario = ?)', [idusuario]);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los eventos de clientes del usuario:', error);
    res.status(500).json({ error: 'Error al obtener los eventos de clientes del usuario' });
  }
});

router.get('/:idevento', async (req, res) => {
  const { idevento } = req.params;
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT * FROM evento WHERE idevento = ?', [idevento]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener el evento:', error);
    res.status(500).json({ error: 'Error al obtener el evento' });
  }
});

router.post('/', async (req, res) => {
  const { tipo, fecha, lugar, hora, cantidadpersonas, paqueteevento, adelanto, idcliente } = req.body;
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT MAX(idevento) AS id FROM evento');
    const newId = rows[0].id + 1;
    await connection.query('INSERT INTO evento (idevento, tipo, fecha, lugar, hora, cantidadpersonas, paqueteevento, adelanto, idcliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [newId, tipo, fecha, lugar, hora, cantidadpersonas, paqueteevento, adelanto, idcliente]);
    res.sendStatus(201);
  } catch (error) {
    console.error('Error al insertar el evento:', error);
    res.status(500).json({ error: 'Error al insertar el evento' });
  }
});

router.put('/:idevento', async (req, res) => {
  const { idevento } = req.params;
  const { tipo, fecha, lugar, hora, cantidadpersonas, paqueteevento, adelanto, idcliente } = req.body;
  try {
    const connection = await connectToDatabase();
    await connection.query('UPDATE evento SET tipo = ?, fecha = ?, lugar = ?, hora = ?, cantidadpersonas = ?, paqueteevento = ?, adelanto = ?, idcliente = ? WHERE idevento = ?', [tipo, fecha, lugar, hora, cantidadpersonas, paqueteevento, adelanto, idcliente, idevento]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al actualizar el evento:', error);
    res.status(500).json({ error: 'Error al actualizar el evento' });
  }
});

router.delete('/:idevento', async (req, res) => {
  const { idevento } = req.params;
  try {
    const connection = await connectToDatabase();
    await connection.query('DELETE FROM evento WHERE idevento = ?', [idevento]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
});

module.exports = router;
