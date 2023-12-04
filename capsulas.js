let capsulasData = [];
let currentCapsulaIndex = 0;

document.addEventListener("DOMContentLoaded", function() {
    fetch('capsulas.json')
        .then(response => response.json())
        .then(data => {
            capsulasData = data.capsulas;
            showCapsula(currentCapsulaIndex);
        })
        .catch(error => console.error('Error loading capsulas:', error));

    document.querySelector('.news-prev').addEventListener('click', () => navigateCapsulas(-1));
    document.querySelector('.news-next').addEventListener('click', () => navigateCapsulas(1));
});

function showCapsula(index) {
    const capsula = capsulasData[index];
    document.querySelector('.news-image').src = capsula.imagen;
    document.querySelector('.news-title').textContent = capsula.titulo;
}

function navigateCapsulas(direction) {
    currentCapsulaIndex = (currentCapsulaIndex + direction + capsulasData.length) % capsulasData.length;
    showCapsula(currentCapsulaIndex);
}

function openModalById(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    const modalImage = modal.querySelector('.modal-image') || document.createElement('img');

    modalImage.src = capsulasData[currentCapsulaIndex].imagen;
    modalImage.alt = "Descripción de la imagen";
    modalImage.className = "modal-image";

    if (!modalContent.contains(modalImage)) {
        modalContent.appendChild(modalImage); // Solo añade la imagen si aún no está presente.
    }
    
    modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}
