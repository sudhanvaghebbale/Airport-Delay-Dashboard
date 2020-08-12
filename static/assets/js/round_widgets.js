$('#city_text').keyup(function(event){
    if (event.keyCode === 13) {
		
		var city = document.getElementById('city_text').value;

		$.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a8c68e25b41670c9b07fe00a609dac02&units=metric", function(data){
			
			var cities = document.getElementById('city_weather');
			cities.innerHTML = data.name;

			var max = document.getElementById('max_temp');
			max.innerHTML = data.main.temp_max + ' °C';

			var wind = document.getElementById('wind_speed');
			wind.innerHTML = data.wind.speed + " km/hr";

			var wind_dir = document.getElementById('wind_direction');
			wind_dir.innerHTML = data.wind.deg + ' °';

			var min = document.getElementById('min_temp');
			min.innerHTML = data.main.temp_min + ' °C';

			var feels = document.getElementById('feels_temp');
			feels.innerHTML = data.main.feels_like + ' °C';
		});
	};
});