const express = require('express');
const db = require('./config/db.js'); 
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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
  const { postulante_id, comentario } = req.body; 

  try {
    // Insertar el nuevo comentario en la base de datos
    const insertQuery = `
      INSERT INTO roket.comentarios (arbol_id, postulante_id, comentario)
      VALUES ($1, $2, $3)
    `;
    await db.query(insertQuery, [arbol_id, postulante_id, comentario]);

    res.status(201).json({ message: 'Comentario agregado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener los comentarios de un árbol por su ID
app.get('/arboles/:arbol_id/comentarios', async (req, res) => {
  const { arbol_id } = req.params;
  try {
    const comentarios = await db.query('SELECT * FROM roket.comentarios WHERE arbol_id = $1', [arbol_id]);
    res.json(comentarios.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para la página principal
app.get('/', (req, res) => {
  res.send('¡Hola! Esta es la página principal.');
});

// Escucha del servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
