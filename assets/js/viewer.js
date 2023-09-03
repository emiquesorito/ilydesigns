//// PDF Viewer ////
// viewer.js

const pdfUrl = 'https://ilydesigns.com/assets/pdf/Emily-Holcomb-Resume-2023.pdf';

const pdfContainer = document.getElementById('pdfContainer');
const prevButton = document.getElementById('prevPage');
const nextButton = document.getElementById('nextPage');

let pdfInstance = null;
let currentPage = 1;

pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
  pdfInstance = pdf;
  renderPage(currentPage);
});

function renderPage(pageNumber) {
  pdfInstance.getPage(pageNumber).then(page => {
    const scale = 1.5;
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    pdfContainer.innerHTML = '';
    pdfContainer.appendChild(canvas);

    page.render({
      canvasContext: context,
      viewport
    });
  });
}

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

nextButton.addEventListener('click', () => {
  if (currentPage < pdfInstance.numPages) {
    currentPage++;
    renderPage(currentPage);
  }
});
