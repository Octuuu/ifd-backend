import express from 'express';
import path from 'path';
import cors from 'cors';
import sequelize from './config/database.js';  
import commentRoutes from './routes/comments.js';
import proyectosRoutes from './routes/projectRoutes.js';
import { fileURLToPath } from 'url';  

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

// Define los orígenes permitidos
const allowedOrigins = ['https://formaciondocente.netlify.app/'];
//'https://ifd.vercel.app', 
app.use(cors({
  origin: (origin, callback) => {
    // Si el origen está en la lista de orígenes permitidos o no hay origen (para solicitudes desde el mismo servidor)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);  // Permite la solicitud
    } else {
      callback(new Error('No autorizado'), false);  // Bloquea la solicitud
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],  // Especificar cabeceras permitidas
  credentials: true,  // Permite el uso de credenciales (como cookies)
}));

app.use(express.json());  // Middleware para parsear los cuerpos de las solicitudes como JSON

// Habilitar CORS solo para la carpeta de archivos estáticos (imágenes)
app.use('/uploads', cors({
  origin: 'https://ifd.vercel.app', // Asegúrate de que el dominio de tu frontend esté permitido
  methods: ['GET']
}));

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
  // Si el error es de CORS, se podría devolver un mensaje más específico
  if (err.message === 'No autorizado') {
    return res.status(403).json({ message: 'Acceso no autorizado por CORS' });
  }
  res.status(500).json({ message: 'Ha ocurrido un error interno en el servidor' });
});