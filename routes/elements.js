var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
res.render('elements',{
	title: 'Elements'
});
});
module.exports = router;