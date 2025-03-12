const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config(); // Load environment variables

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    // Remove the local file after successful upload
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // Remove the local file if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
};

module.exports = { uploadOnCloudinary };
