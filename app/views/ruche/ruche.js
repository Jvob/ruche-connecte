// get the data from the API 
// API api.js is connected to hardcoded files for the moment
// Connection need to be done 


fetchLogsData = function(id_ruche) {   
	//Kind of promise -> meaning it is asynchronus
	const dataTemperature = {
	labels:[],
	series:[]
	};
	let date_enre;
	const urlToFetch = '../api/dataLogs/'+id_ruche
	fetch(urlToFetch)     	
	
	.then(function(res){ 
		return res.json(); 
	})     
	.then(function(data){
		//console.log(data)
		const dataTemperature = {
			labels:[],
			series:[]
		};
		const dataHumidite = {
			labels:[],
			series:[]
		};
		var dataLen = data.length;
		var seriesTemperature1 = [];
		var seriesTemperature2 = [];
		var seriesHumidite1 = [];
		var seriesHumidite2 = [];

		for (var i=1; i< dataLen; i++){
			date_enre = data[i].date_enregistrement.split(" ")
			dataTemperature.labels.push(date_enre[0]+'/07 '+date_enre[3].split(":")[0]+"h");
			seriesTemperature1.push(data[i].temperature_ext)
			seriesTemperature2.push(data[i].temperature_int)

			dataHumidite.labels.push(date_enre[0]+'/07 '+date_enre[3].split(":")[0]+"h");
			seriesHumidite1.push(data[i].temperature_ext)
			seriesHumidite2.push(data[i].temperature_int)
		}

		dataTemperature.series.push(seriesTemperature1);
		dataTemperature.series.push(seriesTemperature2);

		dataHumidite.series.push(seriesHumidite1);
		dataHumidite.series.push(seriesHumidite2);

		return {dataTemperature, dataHumidite}
		//console.log(dataTemperature);
	})
	.then(function(data){
	var options = {
	  	showPoint: true,
	  	high: 40,
	  	low: 20,
	  	lineSmooth: true,
	  	axisX: {
	    	showGrid: true,
	    	showLabel: true
		},
		axisY: {
	    	offset: 80,
	    	labelInterpolationFnc: function(value) {
	      		return value + ' degrés';
	    	}	
	  	}
	};
	new Chartist.Line('#ruche-temperature', data.dataTemperature, options);
	new Chartist.Line('#ruche-humidite', data.dataTemperature, options);
	})
	

	.catch (function(error){
		throw error
	})
}

function initMap() {
  	// Set up the map
  	var mapCenter = {lat: 48.6860838, lng: 7.832821};
  	var map = new google.maps.Map(
      	document.getElementById('ruche-map'), {zoom: 14, center: mapCenter}
    );
    var select = document.getElementById('ruche-select');
  	
  	// fetch data from dataRuches
	fetch('../api/dataRuches')     	
	
	.then(function(res){ 
		return res.json(); 
	}) 
	.then(function(data){
		//console.log(data);
		data.forEach(function(item, index){
			//console.log((parseInt(item.position_gps_ruche_latitude)));
			var marker = new google.maps.Marker({
				position: {lat: parseFloat(item.position_gps_ruche_latitude), lng: parseFloat(item.position_gps_ruche_longitude)}, 
				map: map
			}); 
  			var infoWindow = new google.maps.InfoWindow({map: map});
            infoWindow.setContent('Ruche n°'+item.id_ruche);
            infoWindow.open(map, marker);  			
  			
            marker.addListener('click', function() {
                infoWindow.setContent('Ruche n°'+item.id_ruche);
                fetchLogsData(item.id_ruche);
                infoWindow.open(map, marker);
                select.value = item.id_ruche;
            });

            infoWindow.addListener('click', function() {
                fetchLogsData(item.id_ruche);
            });
		})
	}) 
  	//set up markers and info windows
  	var marker = new google.maps.Marker({position: mapCenter, map: map}); 
  	var infoWindow = new google.maps.InfoWindow({map: map});
  	infoWindow.setContent('Ruche n°1');
  	infoWindow.open(map, marker);
}



document.addEventListener("DOMContentLoaded", fetchLogsData(1));

var select = document.querySelector('#ruche-select');
select.addEventListener('change',function(e){
    fetchLogsData(e.target.value);
});



