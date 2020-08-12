$('#get_weather_data').click(function(){
	var dataset_max = [];
	var dataset_min = [];
	var dataset_feels = [];
	
	var city = document.getElementById('city_text').value;
	console.log(city);

	$.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a8c68e25b41670c9b07fe00a609dac02&units=metric", function(data) {
		var time = Date.now();
		console.log(time, data.main.temp_max, data.main.temp_min, data.main.feels_like)
		console.log(data);	
		dataset_max.push({x: time, y: data.main.temp_max});
		dataset_min.push({x: time, y: data.main.temp_min});
		dataset_feels.push({x: time, y: data.main.feels_like});
	
		var chart = new CanvasJS.Chart("chartContainer",{
				axisX: {								
					title: "Time (Updates every 2 seconds)"
				},
				axisY: {						
					title: "Temperature"
				},
				toolTip: {
					shared: true
				},
				legend: {
					cursor:"pointer",
					verticalAlign: "top",
					fontSize: 22,
					fontColor: "dimGrey",
					itemclick : toggleDataSeries
				},
				data: [{
					type: "line",
					markerType: "triangle",
					xValueType: "dateTime",
					xValueFormatString: "hh:mm:ss TT",
					yValueFormatString: "##°C",
					name: "Maximum Temp.",
					showInLegend: true,
					dataPoints: dataset_max
				}, 
				{
					type: "line",
					markerType: "square",
					xValueType: "dateTime",
					xValueFormatString: "hh:mm:ss TT",
					yValueFormatString: "##°C",
					name: "Minimum Temp.",
					showInLegend: true,
					dataPoints: dataset_min
				},
				{
					type: "line",
					xValueType: "dateTime",
					xValueFormatString: "hh:mm:ss TT",
					yValueFormatString: "##°C",
					name: "Feels Like",
					showInLegend: true,
					dataPoints: dataset_feels
				}]
			});

		function toggleDataSeries(e) {
			if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
				e.dataSeries.visible = false;
			}
			else {
				e.dataSeries.visible = true;
			}
		}
			
		chart.render();

		var updateInterval = 2000;

		var updateChart = function () {
			$.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a8c68e25b41670c9b07fe00a609dac02&units=metric", function(data) {
				var time = Date.now();
				dataset_max.push({x: time, y: data.main.temp_max});
				dataset_min.push({x: time, y: data.main.temp_min});
				dataset_feels.push({x: time, y: data.main.feels_like});
		
				chart.render();
			});
		};

		setInterval(function(){updateChart()}, updateInterval); 
	});
});