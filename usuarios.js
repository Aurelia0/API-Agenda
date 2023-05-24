const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('./conexion');

// Obtener todos los usuario
router.get('/', async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT * FROM usuario');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los usuario:', error);
    res.status(500).json({ error: 'Error al obtener los usuario' });
  }
});

// Obtener un usuario
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT * FROM usuario WHERE idusuario = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// Agregar un nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, correo, urlfoto, password } = req.body;
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT MAX(idusuario) AS id FROM usuario');
    const newId = rows[0].id + 1;
    await connection.query('INSERT INTO usuario (idusuario,nombre, correo, password, foto) VALUES (?,?, ?, ?, ?)', [newId,nombre, correo, password,urlfoto]);
    res.sendStatus(201);
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
    res.status(500).json({ error: 'Error al insertar el usuario' });
  }
});

// Actualizar un usuario existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, urlfoto, password } = req.body;
  try {
    const connection = await connectToDatabase();
    await connection.query('UPDATE usuario SET nombre = ?, correo = ?, foto = ?, password = ? WHERE idusuario = ?', [nombre, correo, urlfoto, password, id]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Eliminar un usuario existente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await connectToDatabase();
    await connection.query('DELETE FROM usuario WHERE idusuario = ?', [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

//obtener id de usuario por correo
router.get('/correo/:correo', async (req, res) => { 
  const { correo } = req.params;
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query('SELECT idusuario FROM usuario WHERE correo = ?', [correo]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

module.exports = router;
