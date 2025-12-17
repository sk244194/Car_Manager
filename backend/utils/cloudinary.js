const cloudinary = require('cloudinary');
const CloudinaryStorage = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'car_manager',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

module.exports = {
    cloudinary,
    storage
};
