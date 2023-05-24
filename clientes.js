const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./conexion');

router.get('/', async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT * FROM cliente');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT * FROM cliente WHERE idcliente = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
});

router.post('/', async (req, res) => {
  const { nombre, telefono, telefono2, correo, direccion, idusuario } = req.body;
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT MAX(idcliente) AS id FROM cliente');
    const newId = rows[0].id + 1;
    await connection.query('INSERT INTO cliente (idcliente, nombre, telefono, telefono2, correo, direccion, idusuario) VALUES (?, ?, ?, ?, ?, ?, ?)', [newId, nombre, telefono, telefono2, correo, direccion, idusuario]);
    res.sendStatus(201);
  } catch (error) {
    console.error('Error al insertar el cliente:', error);
    res.status(500).json({ error: 'Error al insertar el cliente' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, telefono2, correo, direccion, idusuario } = req.body;
  try {
    const connection = await connectToDatabase();
    await connection.query('UPDATE cliente SET nombre = ?, telefono = ?, telefono2 = ?, correo = ?, direccion = ?, idusuario = ? WHERE idcliente = ?', [nombre, telefono, telefono2, correo, direccion, idusuario, id]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await connectToDatabase();
    await connection.query('DELETE FROM cliente WHERE idcliente = ?', [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
});


// GET DE CLIENTES POR USUARIO
router.get('/usuario/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT * FROM cliente WHERE idusuario = ?', [id]);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});



module.exports = router;
