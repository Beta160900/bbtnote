// Load the nav.html content
fetch('model/nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading navigation:', error));

function add_block(containerId,fileurl){
    fetch(fileurl)
    .then(response => response.text())
    .then(data => {
        document.getElementById(containerId).innerHTML = data;
    })
    .catch(error => console.error('Error loading navigation:', error));
}

function uploadPDF(Inputid,folderName){
    event.preventDefault();

    const fileInput = document.getElementById(Inputid);

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    // Append the folderId to the URL query parameter
    fetch(`https://lucky-mermaid-12fefb.netlify.app/.netlify/functions/upload?Id=${folderName}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert('File upload successful!');  // Show success alert
        location.reload();  // Refresh the page after upload
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        document.getElementById('response').textContent = 'Error uploading file.';
    });
}

