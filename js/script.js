// get curent location
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position){
 loadWeather(position.coords.latitude + ',' + position.coords.longitude);
  });
} else {
  loadWeather("Buenos Aires, Argentina" , "");
}


$(document).ready(function(){
  setInterval(getWeather, 1000);
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    success: function(weather) {
    
    city = weather.city;
    $(".location").text("en " + city + ".");

    wcode = '<img class="weathericon" src="weathericons/' + weather.code + '.svg">';
    $(".weather-icon").html(wcode); 
      
  if(weather.code == 1 || weather.code == 3 || weather.code == 4 || weather.code == 5 || weather.code == 6 || weather.code == 9 || weather.code == 10 || weather.code == 11 || weather.code == 12 || weather.code == 14 || weather.code == 35 || weather.code == 37 || weather.code == 38 || weather.code == 39 || weather.code == 40 || weather.code == 45 || weather.code == 46 || weather.code == 47 ){
    $(".text").text("Llueve")
    $(".rain" ).addClass( "show" );
  } else {
    $(".text").text("No llueve")
    $(".no-rain" ).addClass( "show" );
  }
      
    },
    error: function(error) {  
        $("#weather").html('<p>'+error+'</p>');
    }
    
  });

}
