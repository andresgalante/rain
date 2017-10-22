

jQuery(function($, undefined) {

	get curent location
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			loadWeather(position.coords.latitude + ',' + position.coords.longitude);
		});
	}else{
		loadWeather("Buenos Aires, Argentina");
	}

  // loadWeather("Buenos Aires, Argentina");

	function loadWeather(location, woeid) {
		$.simpleWeather({
			location: location,
			// location: 'Buenos Aires, Argentina',
			woeid: woeid,
			success: function(weather) {
				$(".location").text("en " + weather.city + ".");

				var wcode = '<img class="weathericon" src="weathericons/' + weather.code + '.svg">';
				$(".weather-icon").html(wcode);

				if (/^(1|3|4|5|6|9|10|11|12|14|35|37|38|39|40|45|46|47)$/.test(weather.code)) {
					$(".text").text("Llueve");
					$("body").addClass("show rain");
				} else {
					$(".text").text("No llueve");
					$("body").addClass("show no-rain");
				}

				setTimeout(function() {
					loadWeather(location);
				}, 60000);
			},
			error: function(error) {
				$("#weather").html('<p>' + error + '</p>');

				setTimeout(function() {
					loadWeather(location);
				}, 60000);
			}
		});

	}

});
