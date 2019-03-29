var express = require('express');
var bodyParser 		= require('body-parser');
var userModel = require.main.require('./model/admin-model');
var router = express.Router();
var session = require('express-session');


router.use('/assets',express.static('assets'));





router.get('/', function(request, response){
	
		response.render('home/home');
	});


router.get('/signup', function(request, response){
	
	
			response.render('home/signup');
		});

router.post('/signup', function(request, response){
	
	var user ={
		username : request.body.username,
		password : request.body.password,
		email : request.body.email,
		phonenumber : request.body.phonenumber,
		type: request.body.usertype

	};
	
	
	userModel.insert(user, function(success){
		if(success){
			//console.log(request.session.email);
			response.redirect('/login');
		}else{
			response.render("/login");
		}
	});
});

router.get('/forgot', function(request, response){
	
	
			response.render('home/forgot');
		});

router.get('/allPost', (req, res)=>{

	userModel.getallfinalpost(function(result){

		if(result.length > 0){
			var place = {
				//name: req.session.name,
				uList: result
			};
			res.render('home/allPlace', place);
		}
	});	
});






module.exports = router;

