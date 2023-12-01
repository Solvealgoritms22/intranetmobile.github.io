let serviceIndex = 0;
let servicesData = [];

document.addEventListener("DOMContentLoaded", function() {
    fetch('services.json')
        .then(response => response.json())
        .then(jsonData => {
            servicesData = jsonData.services;
            updateServices();
            showService(serviceIndex); // Muestra el primer servicio
            document.querySelector('.left-arrow').addEventListener('click', () => navigateServices(-1));
            document.querySelector('.right-arrow').addEventListener('click', () => navigateServices(1));
        })
        .catch(error => console.error('Error loading services:', error));
});

function updateServices() {
    let container = document.querySelector('.service-container');
    container.innerHTML = ''; // Limpiar contenedor existente
    servicesData.forEach(service => {
        let serviceBox = document.createElement('div');
        serviceBox.className = 'service-box';
        serviceBox.innerHTML = `<div class="icon">${service.icon}</div><div>${service.name}</div>`;

        // Agregar evento de clic basado en la acción
        if (service.action === 'link') {
            serviceBox.addEventListener('click', () => window.open(service.url, '_blank'));
        } else if (service.action === 'modal') {
            serviceBox.addEventListener('click', () => openModal(service.modalId));
        }

        container.appendChild(serviceBox);
    });
}

// Función para abrir modales
function openModal(modalId) {
    let modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Función para cerrar modales
function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function navigateServices(direction) {
    let totalServices = servicesData.length;
    serviceIndex = (serviceIndex + direction + totalServices) % totalServices;
    showService(serviceIndex);
}

function showService(index) {
    let services = document.querySelectorAll('.service-box');
    services.forEach((service, i) => {
        service.classList.toggle('active', i === index);
    });
}
