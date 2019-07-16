// get the data from the API 
// API dataRuche.js is connected yo the DB
// Connection need to be done 

// AJAX request using fetch

var dataTemperature = {
	labels:[],
	series:[]
};
document.addEventListener("DOMContentLoaded", function(e) {   
	//Kind of promise -> meaning it is asynchronus
	fetch('../api/dataRuche')     	
	
	.then(function(res){ 
		return res.json(); 
	})     
	.then(function(data){
		console.log(data)
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
		console.log(dataTemperature);
	})
	.then(function(){
		renderTemperature(dataTemperature);
	})

	.catch (function(error){
		throw error
	})
});



renderTemperature = function(dataTemperature){
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
}
