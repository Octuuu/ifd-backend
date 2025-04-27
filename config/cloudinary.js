// config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'ifd',
  api_key: '375189919564382',
  api_secret: 's6i-tzfZn_yJV6dRuIqmunLPf6o',
  secure: true,
});

export default cloudinary;
