const form = document.querySelector('#weatherForm');
const apiKey = 'Yr9kYs0tSOgjV850ZD5mkY3EzxVDN6Nn';
const weatherContainer = document.querySelector('.weather-container');
let weatherDataDiv;

form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const location = form.elements.location.value;
    if(location!==''){ const config = {params:{location:location,units:'metric',apikey:apiKey}};
    try{
    const res = await axios.get("https://api.tomorrow.io/v4/weather/realtime",config);
       add(res.data);
    }
    catch(e){
        handelError(e);
    }}
    else{
        alert('enter valid location please')
    }
   
    
    
})

const add = function(data){
     if (weatherDataDiv) {
        weatherContainer.removeChild(weatherDataDiv);
    }

    weatherDataDiv = document.createElement('div');
   const values = data.data.values;
   const location = data.location;
    const h1 = document.createElement("h1")
    h1.innerText=`${values.temperature}°C`;
    const p1 = document.createElement("p");
    p1.innerHTML = location.name;
    weatherDataDiv.appendChild(h1);
    weatherDataDiv.appendChild(p1);

    weatherContainer.appendChild(weatherDataDiv);
    
}

const handleError = function (error) {
    console.error('Error fetching weather data:', error);
    // Clear previous weather data
    if (weatherDataDiv) {
        weatherContainer.removeChild(weatherDataDiv);
    }
    // Display error message
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Error fetching weather data. Please try again later.';
    weatherContainer.appendChild(errorMessage);
}