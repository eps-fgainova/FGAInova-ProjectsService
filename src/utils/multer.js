const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dzsy3q6bi',
  api_key: '545492636717934',
  api_secret: 'fS4XzJEpPMqoBlH6Q-fvNbKXzuI',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = 'projetos';
    if (file.fieldname === 'banner') {
      folder += '/banners';
    } else if (file.fieldname === 'logo') {
      folder += '/logos';
    } else if (file.fieldname === 'imagens') {
      folder += '/imagens';
    }
    return {
      folder,
      format: 'png',
      public_id: file.originalname,
    };
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };
