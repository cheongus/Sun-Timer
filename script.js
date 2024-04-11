// Replace these with your actual latitude and longitude
//const lat = '22.3193';
//const lng = '114.1694';

document.getElementById('city').addEventListener('change', function() {
    const [lat, lng, tzid] = this.value.split(',');
  
    fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0&tzid=${tzid}`)
      .then(response => response.json())
      .then(data => {
        const options = { timeZone: tzid, hour: '2-digit', minute: '2-digit', second: '2-digit' };
  
        const currentTime = new Date();
        const sunriseTime = new Date(data.results.sunrise);
        const sunsetTime = new Date(data.results.sunset);
  
        const untilSunrise = new Date(sunriseTime - currentTime);
        const untilSunset = new Date(sunsetTime - currentTime);
  
        document.getElementById('current').textContent = `Current time: ${currentTime.toLocaleTimeString('en-US', options)}`;
        document.getElementById('sunrise').textContent = `Sunrise: ${sunriseTime.toLocaleTimeString('en-US', options)}`;
        document.getElementById('sunset').textContent = `Sunset: ${sunsetTime.toLocaleTimeString('en-US', options)}`;
        document.getElementById('untilSunrise').textContent = `Time until sunrise: ${untilSunrise.getUTCHours()} hours ${untilSunrise.getUTCMinutes()} minutes`;
        document.getElementById('untilSunset').textContent = `Time until sunset: ${untilSunset.getUTCHours()} hours ${untilSunset.getUTCMinutes()} minutes`;
      })
      .catch(error => console.error('Error:', error));
  });
  
  // Trigger the change event to fetch the times for the initial city
  document.getElementById('city').dispatchEvent(new Event('change'));
  
  // Update the current time every second
  setInterval(() => {
    document.getElementById('city').dispatchEvent(new Event('change'));
  }, 1000);



