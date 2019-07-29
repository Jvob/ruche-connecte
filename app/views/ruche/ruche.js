// get the data from the API 
// API api.js is connected to hardcoded files for the moment
// Connection need to be done 


fetchLogsData = function(id_ruche) {   
	//Kind of promise -> meaning it is asynchronus
	const dataTemperature = {
	labels:[],
	series:[]
	};

	const urlToFetch = '../api/dataLogs/'+id_ruche
	fetch(urlToFetch)     	
	
	.then(function(res){ 
		return res.json(); 
	})     
	.then(function(data){
		//console.log(data)
		var dataLen = data.length;
		var series1 = [];
		var series2 = [];
		for (var i=1; i< dataLen; i++){
			dataTemperature.labels.push(data[i].date_enregistrement);
			series1.push(data[i].temperature_ext)
			series2.push(data[i].temperature_int)
		}
		dataTemperature.series.push(series1);
		dataTemperature.series.push(series2);
		return dataTemperature
		//console.log(dataTemperature);
	})
	.then(function(dataTemperature){
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
	new Chartist.Line('#ruche-temperature', dataTemperature, options);
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



