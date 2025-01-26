async function fetchPdfFiles(containerID,folderName) {
    try {
      console.log(`https://lucky-mermaid-12fefb.netlify.app/.netlify/functions/get-pdfs?Id=${folderName}`);
      const response = await fetch(`https://lucky-mermaid-12fefb.netlify.app/.netlify/functions/get-pdfs?Id=${folderName}`);
      const pdfFiles = await response.json();
  
      const pdfList = document.getElementById(containerID);
      pdfList.innerHTML = ''; // Clear the existing list
  
      if (pdfFiles.length === 0) {
        pdfList.innerHTML = '<li>No PDF files found.</li>';
      } else {
        pdfFiles.forEach((file) => {
          const card = document.createElement('div');
          card.classList.add('card', 'card-compact', 'bg-base-100', 'shadow-xl', 'mb-4');
  
          const cardContent = `
            <div class="relative inline-block mt-10">
              <iframe class="mx-auto mb-4 h-80 w-[80%]" src="https://drive.google.com/file/d/${file.id}/preview" style="border: none;"></iframe>
            </div>
            <div class="card-body">
              <h2 class="card-title">${file.name}</h2>
              <div class="card-actions">
                <a href="https://drive.google.com/file/d/${file.id}/view" class="btn2">
                  <h1 class="text-2xl font-semibold text-gray-700">Download</h1>
                </a>
              </div>
            </div>
          `;
  
          card.innerHTML = cardContent;
  
          // Append the card to the pdfList
          pdfList.appendChild(card);
        });
      }
    } catch (err) {
      console.error('Error fetching PDF files:', err);
    }
  }
  