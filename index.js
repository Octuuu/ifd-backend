import express from 'express';
import path from 'path';
import cors from 'cors';
import sequelize from './config/database.js';  
import commentRoutes from './routes/comments.js';
import proyectosRoutes from './routes/projectRoutes.js';
import { fileURLToPath } from 'url';  // Importa fileURLToPath

// Obtén el directorio actual usando fileURLToPath
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'https://ifd.vercel.app/', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

app.use(express.json());  // Middleware para parsear los cuerpos de las solicitudes como JSON

// Sirve los archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas para manejar las solicitudes relacionadas con comentarios y proyectos
app.use('/api/comments', commentRoutes);
app.use('/api', proyectosRoutes);

// Sincronización de la base de datos y arranque del servidor
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Ha ocurrido un error interno en el servidor' });
});
