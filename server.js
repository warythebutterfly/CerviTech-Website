var express = require('express');
var path = require('path');
var router = require('routes');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require('cookie-parser');
var home = require('./routes/index');
var contact = require('./routes/contact');
var elements = require('./routes/elements');
var include = require('include')(__dirname,'views');

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/contact', contact);
app.use('/elements', elements);
app.use('/', home);



const server = app.listen(process.env.PORT||7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});