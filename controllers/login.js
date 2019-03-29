var express = require('express');
var userModel = require.main.require('./model/admin-model');
var router = express.Router();


router.use('/assets',express.static('assets'));

router.get('/', function(request, response){
	
		response.render('login/index');
	});

router.post('/', function(request, response){
	
	var user ={
		email : request.body.email,
		password : request.body.password
	};
	
	
	userModel.validate(user, function(result){
		if(result.length > 0){
			request.session.email = result[0].email;
			request.session.uid = result[0].uid;
			
			if(result[0].type=='3'){
			response.redirect('/admin');}
			else if(result[0].type=='2'){
				response.redirect('/scout');
			}
			else if(result[0].type=='1'){
				response.redirect('/user');
			}
		}else{
			response.render("login/index");
		}
	});
});

module.exports = router;