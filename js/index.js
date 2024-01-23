// const apikey="ecf7fa91ce0b40158c5180324240701";

// async function search(weather){
//     const apiulr=`http://api.weatherapi.com/v1/search.json?units=metric&q=${weather}`;
//     const response= await fetch(apiulr + `&key=${apikey}`);
 
// //   if(response.ok&&400!=response.status)
// //   {
// //     let data=await response.json();
// //     displayCurrent(data.location,data.current),displayAnother(data.forecast.forecastday);
// //    }
// }


let todayday= document.getElementById("currentday");
let todaydate=document.querySelector(".datenum");
let todaymonth =document.getElementById("datemonth");
let todaycity = document.querySelector(".cityName");
let currentdegree = document.querySelector(".currDegree");
let conditionday = document.querySelector(".todayCondition-text");
let windday =document.querySelector(".windday");
let precip = document.querySelector(".precip_in");
let wind_kph= document.querySelector(".wind_kph");
let wind_dir = document.querySelector(".wind_dir");

let tommorowday =document.getElementsByClassName("tommorowday");
let Degreetomm = document.getElementsByClassName("Degreetomm");
let Degreetommmin = document.getElementsByClassName("Degreetommmin");
let tommoConditiontext= document.getElementsByClassName("degreeDes");


let searchbox= document.getElementById("search");
let searchBtn= document.querySelector(".search button");

let weathericon= document.querySelector(".todayCondition-icon");
let tommConditionicon =document.getElementsByClassName("tommCondition-icon");




  
async function search(cityname){
    let weatherapp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ecf7fa91ce0b40158c5180324240701&q=${cityname}&days=3`);
    let data=await weatherapp.json();
  return data;
}

 function todaydisplay(data){
    let todayDate= new Date()
   todayday.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"})
   todaydate.innerHTML=todayDate.getDate()
   todaymonth.innerHTML=todayDate.toLocaleDateString("en-US",{month:"long"})
    todaycity.innerHTML= data.location.name;
    currentdegree.innerHTML= data.current.temp_c + " &deg"+ " C";
    
    weathericon.setAttribute("src", data.current.condition.icon.replace("file://", "https://"));
    console.log(weathericon);
    conditionday.innerHTML= data.current.condition.text;
    precip.innerHTML= data.current.humidity + "%";
    wind_kph.innerHTML= data.current.wind_kph +"Km/h";
    wind_dir.innerHTML= data.current.wind_dir;
 }
 

function displaynextdata(data){
      let forecastdata= data.forecast.forecastday;
       
      for(let i=0; i< 2;i++){
         let nextdate=new Date(forecastdata[i+1].date)
         tommorowday[i].innerHTML=nextdate.toLocaleDateString("en-US",{weekday:"long"});
        Degreetomm[i].innerHTML =forecastdata[i+1].day.maxtemp_c+ " &deg"+ " C";
        Degreetommmin[i].innerHTML=forecastdata[i+1].day.mintemp_c+ " &deg"+ " C";
        tommConditionicon[i].setAttribute("src",forecastdata[i+1].day.condition.icon);
        tommoConditiontext[i].innerHTML=forecastdata[i+1].day.condition.text;
      }
}
  
 
 async function APPstart(city="Cairo"){
    let weatherdd= await search(city);
    if(!weatherdd.error){
      todaydisplay(weatherdd);
    displaynextdata(weatherdd);
    }
 }

 APPstart();


 searchbox.addEventListener("input",function(){
   APPstart(searchbox.value);
 })