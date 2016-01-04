jQuery(function($, undefined) {
	// get curent location
	var location = "Buenos Aires, Argentina";
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			location = position.coords.latitude + ',' + position.coords.longitude;
		});
	} 
	
	function loadWeather(location, woeid) {
		$.simpleWeather({
			location: location,
			woeid: woeid,
			success: function(weather) {
				var city = weather.city;
				$(".location").text("en " + city + ".");

				var wcode = '<img class="weathericon" src="weathericons/' + weather.code + '.svg">';
				$(".weather-icon").html(wcode);

				if (/^(1|3|4|5|6|9|10|11|12|14|35|37|38|39|40|45|46|47)$/.test(weather.code)) {
					$(".text").text("Llueve")
					$("body").addClass("show");
				} else {
					$(".text").text("No llueve")
					$("body").addClass("show");
				}
			},
			error: function(error) {
				$("#weather").html('<p>' + error + '</p>');
			}
		});
	}
	
	loadWeather(location);
	setInterval(function() {
		loadWeather(location);
	}, 60000);

});
