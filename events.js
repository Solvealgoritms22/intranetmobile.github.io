document.addEventListener("DOMContentLoaded", fetchAndUpdateEvents);

function fetchAndUpdateEvents() {
  fetch('events.json')
    .then(response => response.json())
    .then(data => {
      const today = getTodaySantoDomingo();
      const events = data.events;
      const mainEvent = events.find(e => e.date === today) || events[0]; // Evento de hoy o el primero
      displayMainEvent(mainEvent);

      const otherEvents = events.filter(e => e !== mainEvent);
      setupOtherEventsRotation(otherEvents);
    })
    .catch(error => console.error('Error loading events:', error));
    
  // Verificar cada hora
  setTimeout(fetchAndUpdateEvents, 3600000);
}

function getTodaySantoDomingo() {
  // Asume que el cliente está en la zona horaria de Santo Domingo
  const offset = -4; // UTC offset for AST (Atlantic Standard Time)
  let clientDate = new Date();
  let utc = clientDate.getTime() + clientDate.getTimezoneOffset() * 60000;
  let serverDate = new Date(utc + 3600000 * offset);
  return serverDate.toISOString().split('T')[0];
}

function displayMainEvent(event) {
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

  // Función para mostrar otro evento
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
