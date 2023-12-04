document.addEventListener("DOMContentLoaded", fetchAndUpdateEvents);

function fetchAndUpdateEvents() {
  fetch('events.json')
    .then(response => response.json())
    .then(data => {
      // Filtrar eventos futuros y ordenarlos por fecha
      const events = data.events
        .filter(e => new Date(e.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      
      if (events.length > 0) {
        displayMainEvent(events[0]); // Mostrar el evento más próximo como principal

        if (events.length > 1) {
          const otherEvents = events.slice(1); // Todos los eventos excepto el principal
          setupOtherEventsRotation(otherEvents);
        }
      }
    })
    .catch(error => console.error('Error loading events:', error));
    
  // Verificar cada hora
  setTimeout(fetchAndUpdateEvents, 3600000);
}

function displayMainEvent(event) {
  // Asume que ya existen estos elementos en tu HTML.
  document.getElementById('main-event-image').src = event.image;
  document.getElementById('main-event-heading').textContent = event.title;
  document.getElementById('main-event-description').textContent = event.description;
  document.getElementById('main-event-date').innerHTML = `<span style="font-weight: 500;"><i class="far fa-calendar"></i>FECHA: </span>${event.date}`;
  document.getElementById('main-event-location').innerHTML = `<span style="font-weight: 500;"><i class="far fa-map"></i>LUGAR: </span>${event.location}`;
  document.getElementById('main-event-time').innerHTML = `<span style="font-weight: 500;"><i class="far fa-clock"></i>HORA: </span>${event.time}`; 
}

function setupOtherEventsRotation(events) {
  const otherEventsContainer = document.getElementById('other-events-container');
  let eventIndex = 0;

  // Función para mostrar otro evento en la sección "OTROS"
  function showOtherEvent() {
    const event = events[eventIndex];
    otherEventsContainer.innerHTML = `
    <div class="event-card">
        <div class="event-content">
          <h3>${event.title}</h3>
          <div class="event-details2">
            <p><i class="far fa-calendar"></i> FECHA: ${event.date}</p>
            <p><i class="far fa-map"></i> LUGAR: ${event.location}</p>
            <p><i class="far fa-clock"></i> HORA: ${event.time}</p>
          </div>
        </div>
        <div class="event-image2">
          <img src="${event.image}" alt="Descripción de la imagen" />
        </div>
      </div>
    `;
    eventIndex = (eventIndex + 1) % events.length; // Incrementa el índice y vuelve a 0 si es necesario
  }

  // Inicialmente mostrar el primer evento secundario
  showOtherEvent();

  // Rotar otros eventos cada 5 segundos
  setInterval(showOtherEvent, 5000);
}
