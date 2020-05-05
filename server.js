var express = require('express');
var path = require('path');
var router = require('routes');
var bodyParser = require('body-parser');
//var argv = require('yargs').argv;

var app = express();
var home = require('./routes/index');

var include = require('include')(__dirname,'views');

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', home);
app.post(function(req, res, next){
    next();
});


const server = app.listen(process.env.PORT||7000, () => {
  console.log(`Express running on → PORT ${server.address().port}`);
});

