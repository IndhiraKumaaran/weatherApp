const weatherform=document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey="";
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
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiurl);
    if(!response.ok){
        throw new Error("could not fetch the weather data");
    }
    return await response.json();
    //console.log(response);
    
}
function display(data){
const {name:city,
       main:{temp,humidity,
       weather:[{description,id}]}}=data;
card.textContent="";
card.style.display="flex";
const cityDisp =document.createElement("h1");
const tempDisp =document.createElement("p");
const humidityDisp =document.createElement("p");
const descDisp =document.createElement("p");
const weatherDisp =document.createElement("p");
cityDisp.textContent=city;
tempDisp.textContent=`${(temp-273.15).toFixed(1) }C`;
humidityDisp.textContent=`humdity:${humidity}`;
descDisp.textContent=description;
cityDisp.classList.add("cityDisplay")
card.appendChildchild(cityDisp);
card.appendChild(tempDisp);
card.appendChild(humidityDisp)
card.appendChild(descDisp);

}

function getEmo(WeatherId){

}
function displayError(message){
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent=message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent="";
  card.style.display="flex";
  card.appendChild(errorDisplay);
}