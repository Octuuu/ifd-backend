// config/multer.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'proyectos', 
    allowed_formats: ['jpg', 'png', 'pdf', 'doc', 'docx'],
    resource_type: 'auto', 
  },
});

const upload = multer({ storage });

export default upload;
