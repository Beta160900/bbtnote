// supabaseFunctions.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://gsuvxmlzlmgawuiyplaw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdXZ4bWx6bG1nYXd1aXlwbGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwOTU3MTYsImV4cCI6MjA0NjY3MTcxNn0.ho9Rfwk-WfjefrpB2RlLwKnP1DbrTYlup-B08IZ2fJ0';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadPDF(inputId, folder) {
  const fileInput = document.getElementById(inputId);
  const file = fileInput.files[0];

  if (!file) {
    alert('No file selected');
    return;
  }

  const filePath = `${folder}/${encodeURIComponent(file.name)}`;
  const { data, error } = await supabase.storage.from('pdfs').upload(filePath, file);

  if (error) {
    alert(error.message.includes("Invalid key")
      ? "Error: Please remove any special characters from the file name."
      : `Error uploading PDF: ${error.message}`);
  } else {
    alert('PDF uploaded successfully!');
    location.reload();
  }
}

export async function displayPDFs(folder, containerId) {
  const { data: files, error } = await supabase.storage.from('pdfs').list(folder);

  if (error) {
    alert('Error fetching PDFs');
    return;
  }

  const pdfContainer = document.getElementById(containerId);
  files.forEach((file) => {
    if (file.name === '.emptyFolderPlaceholder') {
      return;
    }

    let publicUrl = `https://gsuvxmlzlmgawuiyplaw.supabase.co/storage/v1/object/public/pdfs/${folder}/${file.name}`;

    const card = document.createElement('div');
    card.className = 'card card-compact bg-base-100 shadow-xl mb-4';

    const iframeContainer = document.createElement('div');
    iframeContainer.className = 'relative inline-block mt-10';

    const iframe = document.createElement('iframe');
    iframe.className = 'mx-auto mb-4 h-80 w-[80%]';
    iframe.src = publicUrl;
    iframe.title = file.name;
    iframeContainer.appendChild(iframe);

    card.appendChild(iframeContainer);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h2');
    cardTitle.className = 'card-title text-xl font-semibold text-gray-800';
    cardTitle.textContent = file.name;
    cardBody.appendChild(cardTitle);

    const description = document.createElement('p');
    description.className = 'text-gray-600 text-sm';
    description.textContent = 'This is the example file. Click the button here to Download';
    cardBody.appendChild(description);

    const cardActions = document.createElement('div');
    cardActions.className = 'card-actions mt-4';

    const downloadButton = document.createElement('div');
    downloadButton.className = 'btn2 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md cursor-pointer';

    const downloadText = document.createElement('h1');
    downloadText.className = 'text-2xl font-semibold text-gray-700';
    downloadText.textContent = 'Download';

    const downloadLink = document.createElement('a');
    downloadLink.href = publicUrl;
    downloadLink.download = file.name;

    downloadLink.addEventListener('click', function (e) {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = publicUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    downloadLink.appendChild(downloadText);

    downloadButton.appendChild(downloadLink);
    cardActions.appendChild(downloadButton);

    cardBody.appendChild(cardActions);

    card.appendChild(cardBody);

    pdfContainer.appendChild(card);
  });
}
