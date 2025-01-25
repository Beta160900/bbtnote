// pdfFunctions.js
const { google } = require('googleapis');
process.env.NODE_OPTIONS = '--openssl-legacy-provider';

// Initialize Google Drive API client
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.JWT(
  process.env.SERVICE_ACCOUNT_client_email,
  null,
  process.env.SERVICE_ACCOUNT_private_key,
  SCOPES
);

const drive = google.drive({ version: 'v3', auth });

// Function to get PDFs from the folder
async function getPdfsFromFolder(id) {
    console.log(id);
    
    const folderId = process.env[`FOLDER_${id}`] || process.env.FOLDER_ID;
    console.log(folderId); 
  try {
    const query = `'${folderId}' in parents and mimeType='application/pdf'`;

    // Fetch PDF files from Google Drive
    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name, mimeType)',
    });

    if (response.data.files.length === 0) {
      console.log('No PDF files found in the folder.');
      return [];
    }

    return response.data.files;
  } catch (err) {
    console.error('Error fetching PDF files from Google Drive:', err);
    return [];
  }
}

module.exports = { getPdfsFromFolder };
