const dataRuches = require('./dataRuches.js').dataRuches
const dataLogs = require('./dataLogs.js').dataLogs

module.exports.api = function(req, res) {
	
	const paramsDataType = req.params.dataType;
	const paramsRucheId = req.params.id_ruche;
	

	switch (paramsDataType){
		case 'dataRuches':
			res.json(dataRuches);
			break;

		case 'dataLogs':
			var dataLogsLen = dataLogs.length;
			var data = []
			for (i = 0; i<dataLogsLen; i++ ){
				//console.log(dataLogs[i]);
				if (dataLogs[i].id_ruche == paramsRucheId){
					data.push(dataLogs[i]);
				}
			}
			data.sort(function(a,b){
				return (Date.parse(a.date_enregistrement) - Date.parse(b.date_enregistrement))
			});
			//console.log(data);
			res.json(data);
			break;

		default:
			console.log('Unknown request ->' + paramsDataType);
			res.render('404/404', {});
			break;
	}	

}