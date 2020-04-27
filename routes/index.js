'use strict';
var express = require('express');
var router = express.Router();

router.get('/elements', function(req, res){
    res.render('ajax', {title: 'An Ajax Example', quote: "AJAX is great!"});
});
router.post('/ajax', function(req, res){
    res.render('ajax', {title: 'An Ajax Example', quote: req.body.quote});
});


router.get('/', function(req,res){
res.render('index',{
	title: 'Home'
});
});
router.post('/', function(req,res){
res.render('index',{
	title: 'Home'
});
});
module.exports = router;

let argv = require('yargs').argv;

// console.log(argv);
// console.log(argv._[0]);
// console.log(argv.name);

let name = argv.name,
command = argv._[0];

// name = 'Steven';

//  var fullname = "";
//         var email = "";
//         var subject = "";
//         var message = "";

//          $("#contactForm").submit(function (e) {
//             e.preventDefault();
        
//             fullname = $("#name").val();
//             email = $("#email").val();
//             message = $("#message").val();
//             submit = $("#subject").val();
//         });
// console.log(fullname);


const simple = function(){
	if(name){
		console.log(`Hi ${name}`);
	}else{
		console.log('hi!');
	}
};

const formal = function(){
	if(name){
		console.log(`Hello ${name} and welcome`);
	}
	else{
		console.log('hello and welcome');
	}
};



simple();