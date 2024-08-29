const weatherform=document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey="API Key";
weatherform.addEventListener("submit",async event=>{
    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getweather(city);
            display(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("please enter a city");
    }
});
async function getweather(city) {
    const apiurl=`-----${city}----${apikey}`;
    const response = await fetch(apiurl);
    if(!response.ok){
        throw new Error("coul'd not fetch the weather data");
    }
    console.log(response);

    return await response.json();
    
}
function display(data){
const {name:city,
       main:{temp,humidity},
       weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";
    const cityDisp =document.createElement("h1");
    const tempDisp =document.createElement("p");
    const humidityDisp =document.createElement("p");
    const descDisp =document.createElement("p");
    const weatherEmoji = document.createElement("p");
    cityDisp.textContent=city;
    tempDisp.textContent=`${(temp-273.15).toFixed(1) }C`;
    humidityDisp.textContent=`humdity:${humidity}`;
    descDisp.textContent=description;
    weatherEmoji.textContent=getweatherEmoji(id);

    
    cityDisp.classList.add("cityDisplay")
    tempDisp.classList.add("tempDisplay");
    humidityDisp.classList.add("humidityDisplay");
    descDisp.classList.add("descDisplay");
    weatherEmoji.classList.add("WeatherEmoji");

    card.appendChild(cityDisp);
    card.appendChild(tempDisp);
    card.appendChild(humidityDisp)
    card.appendChild(descDisp);
    card.appendChild(weatherEmoji);
       }


function getweatherEmoji(WeatherId){
switch(true){
    case(WeatherId>=200 && WeatherId<300):
    return "⛈";
    
    case(WeatherId>=300 && WeatherId<400):
    return "⛈";
    
    case(WeatherId>=500 && WeatherId<600):
    return "⛈";
    
    case(WeatherId>=600 && WeatherId<700):
    return "❄";

    case(WeatherId>=700 && WeatherId<800):
    return "🌫";

    
    case(WeatherId==800):
    return "☀";
    
    case(WeatherId>=801 && WeatherId<810):
    return "☁";
    default :
      return "❓";
}
}
function displayError(message){
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent=message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent="";
  card.style.display="flex";
  card.appendChild(errorDisplay);
}