document.getElementById('city').addEventListener('change', function() {
    updateTimes();
});

document.getElementById('timeType').addEventListener('change', function() {
    updateBackground();
    updateTimes();
});

function updateBackground() {
    const timeType = document.getElementById('timeType').value;
    const widgetContainer = document.querySelector('.widget-container');
    widgetContainer.className = 'widget-container ' + (timeType === 'sunrise' ? 'sunrise-selected' : 'sunset-selected');
}

function updateTimes() {
    const [lat, lng, tzid] = document.getElementById('city').value.split(',');
  
    fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0&tzid=${tzid}`)
      .then(response => response.json())
      .then(data => {
        const timeType = document.getElementById('timeType').value;
        const options = { timeZone: tzid, hour: '2-digit', minute: '2-digit', second: '2-digit' };
  
        const currentTime = new Date();
        const eventTime = new Date(timeType === 'sunrise' ? data.results.sunrise : data.results.sunset);
  
        const untilEvent = new Date(eventTime - currentTime);
  
        document.querySelector('.current-time').textContent = `Current time: ${currentTime.toLocaleTimeString('en-US', options)}`;
        document.querySelector('.event-time').textContent = `${timeType.charAt(0).toUpperCase() + timeType.slice(1)}: ${eventTime.toLocaleTimeString('en-US', options)}`;
        document.querySelector('.time-until').textContent = `${untilEvent.getUTCHours()} hours ${untilEvent.getUTCMinutes()} minutes`;
      })
      .catch(error => console.error('Error:', error));
}

updateBackground(); // Initial background setup

// Trigger the change event to fetch the times for the initial city
document.getElementById('city').dispatchEvent(new Event('change'));

// Update the current time every second
setInterval(() => {
    updateTimes();
}, 1000);
