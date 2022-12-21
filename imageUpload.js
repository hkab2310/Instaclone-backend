const cloudinary = require('cloudinary').v2;

require('dotenv').config()

cloudinary.config({ 
  cloud_name: 'dgufnpcmb', 
  api_key: '726931523269443', 
  api_secret: 'FKAlC5p9x_Tuv1LTNpo-CFPa49M' 
});



module.exports= cloudinary