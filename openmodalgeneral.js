// Función para abrir un modal basado en el ID
function openModalById(modalId) {
    let modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}