const express = require('express');
const db = require('./db'); 

const app = express();

// Ruta para obtener todos los árboles
app.get('/arboles', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM roket.arboles');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener la ubicación de un árbol por su ID
app.get('/arboles/:arbol_id/ubicacion', async (req, res) => {
  const { arbol_id } = req.params;
  try {
    const result = await db.query('SELECT * FROM roket.ubicaciones WHERE ubicacion_id = (SELECT ubicacion_id FROM roket.arboles WHERE arbol_id = $1)', [arbol_id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener las fotos de un árbol por su ID
app.get('/arboles/:arbol_id/fotos', async (req, res) => {
  const { arbol_id } = req.params;
  try {
    const result = await db.query('SELECT * FROM roket.fotos WHERE arbol_id = $1', [arbol_id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para agregar un comentario a un árbol
app.post('/arboles/:arbol_id/comentarios', async (req, res) => {
  const { arbol_id } = req.params;
  const { comentario, postulante_id, linkedin, github_tarea, telefone, otras_referencias } = req.body;
  try {
    const result = await db.query('INSERT INTO roket.comentarios (arbol_id, comentario, postulante_id, linkedin, github_tarea, telefone, otras_referencias) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [arbol_id, comentario, postulante_id, linkedin, github_tarea, telefone, otras_referencias]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para la página principal
app.get('/', (req, res) => {
  res.send('¡Hola! Esta es la página principal.');
});

// Definición del puerto y escucha del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
