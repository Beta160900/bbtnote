// uploadFunctions.js
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');

// Initialize multer for file upload
const upload = multer({ dest: 'uploads/' });

// Initialize Google Drive API client
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const auth = new google.auth.JWT(
  process.env.SERVICE_ACCOUNT_client_email,
  null,
  process.env.SERVICE_ACCOUNT_private_key,
  SCOPES
);

const drive = google.drive({ version: 'v3', auth });

// Function to handle file upload to Google Drive
async function uploadFileToDrive(file,id) {
    const folderId = process.env[`FOLDER_${id}`] || process.env.FOLDER_ID;
    console.log(folderId);
  try {
    const fileMetadata = {
      name: file.originalname,
      parents: [folderId], // Specify the folder ID here
    };

    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    };

    const uploadedFile = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    // Delete the local file after upload
    fs.unlinkSync(file.path);

    return `File uploaded successfully to folder with ID: ${folderId}. File ID: ${uploadedFile.data.id}`;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
}

module.exports = { upload, uploadFileToDrive };
