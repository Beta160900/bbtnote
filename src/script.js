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
