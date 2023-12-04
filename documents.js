// Función para cerrar el modal
function closeModal2() {
    document.getElementById('qrCodeModal').style.display = 'none';
}

// Cerrar el modal al hacer clic fuera de él
window.onclick = function(event) {
    let qrModal = document.getElementById('qrCodeModal');
    if (event.target === qrModal) {
        closeModal2();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('documents.json')
        .then(response => response.json())
        .then(documents => {
            const section = document.querySelector('.documents-section');
            documents.forEach(doc => {
                const container = document.createElement('div');
                container.className = 'document-card-container';
                container.innerHTML = `
                    <div class="document-card">
                        <div class="document-text">
                            <h2>${doc.title}</h2>
                        </div>
                        <div class="document-image">
                            <img src="${doc.image}" alt="${doc.alt}" class="document-thumbnail">
                        </div>
                    </div>
                `;
                // Agregar el evento de clic para abrir el modal
                container.addEventListener('click', () => {
                    document.getElementById('modalTitle').textContent = doc.title;
                    document.getElementById('qrCodeImage').src = doc.qrCode; // Añade la ruta al código QR en tu JSON
                    document.getElementById('qrCodeModal').style.display = 'block';
                });
                section.appendChild(container);
            });
        })
        .catch(error => console.error('Error loading documents:', error));
});
