const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express(); 
const mysql = require('mysql');


const dataRuches = require('./api/dataRuches.js').dataRuches
const dataLogs = require('./api/dataLogs.js').dataLogs

// api
const api = require('./api/api.js').api



/* Express server init */
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
	layoutsDir: path.join(__dirname, 'views/layouts'),
	partialsDir : path.join(__dirname, 'views/partials'),
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static(__dirname + '/views'));


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  	next();
});


/* ----> DB connection <------ */
/*
const db = mysql.createConnection({
  host : '130.79.156.67',
  user : 'root',
  password : 'rasp2017',
  base : 'ruche'
});

db.connect(function(err){
  if (err){
    throw err;
  } else {
    console.log("Sucessfully connected");
  }

})
*/

/* ----> ROUTER <---- */

app.get('/',function (req, res){
  res.render('home/home', {})
}); 

app.get('/ruche',function (req, res){
  res.render('ruche/ruche', {dataRuches, dataLogs})
});  
  

app.get('/api/:dataType/:id_ruche?', api); 






module.exports = app
