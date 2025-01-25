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
    fetch(`http://localhost:3000/upload?Id=${folderName}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        document.getElementById('response').textContent = 'File uploaded successfully!';
    })
    .catch(error => {
        console.error('Error uploading file:', error);
        document.getElementById('response').textContent = 'Error uploading file.';
    });
}

