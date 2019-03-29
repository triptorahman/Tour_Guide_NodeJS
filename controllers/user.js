var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();


router.use('/assets',express.static('assets'));


router.get('*', function(req, res, next){
		if(req.session.email != null){
			next();
		}else{
			res.redirect('/login');
		}

		//console.log(req.session.email);
});



router.get('/', (req, res)=>{
	userModel.getUser(req.session.uid, function(result){

		if(result.length > 0){
			res.render('user/userProfile', result[0]);
		}
	});

		
		
});	
router.get('/userupdateinfo', (req, res)=>{
		
		res.render('user/userupdateinfo');
});

router.post('/userupdateinfo/', function(request, response){


	var user ={
		username : request.body.username,
		email : request.body.email,
		phone : request.body.phone,
		id: request.session.uid
		

};

userModel.userupdate(user, function(success){
		if(success){
			
			response.redirect('/login');
			
		}else{
			response.render('user/userupdateinfo');
		}
	});



});

router.get('/changepassword', (req, res)=>{
	
	res.render('user/changePassword');
});



router.post('/changepassword', (req, res)=>{
		
		var user={

			password  : req.body.password,
			cpassword :req.body.cpassword,
			uid:req.session.uid
			




		};
		if(req.body.password==req.body.cpassword)
		{userModel.updateUserPassword(user,function(success){


			if(success){
				res.redirect('/login');
			
		}else{
			res.redirect("/user/changepassword");
		}

			
		});

		}



	else{

			res.redirect('/user/changepassword');



		}
		

		




});



router.get('/seepost', (req, res)=>{

	userModel.getallfinalpost(function(result){

		if(result.length > 0){
			var place = {
				//name: req.session.name,
				uList: result
			};
			res.render('user/PostInfo', place);
		}
	});	
});

router.get('/addinchecklist/:id', (req, res)=>{

	userModel.getonepost(req.params.id, function(result){
		if(result.length >0 ){
			res.render('user/addinchecklist', result[0]);
		}else{
			res.redirect('/user/PostInfo');
		}
	});
});

router.post('/addinchecklist/:id', (req, res)=>{
	
	var place = {
				placename:req.body.placename,
				cost: req.body.cost,
				pid:req.body.placeid,
				uid: req.session.uid
			};

	userModel.insertcheklist(place, function(success){
		if(success){
			//console.log(request.session.email);
			res.redirect('/user/checklist');
		}else{
			res.render("/user/seepost");
		}
	});

	
});

router.get('/checklist', (req, res)=>{

	userModel.getallchecklist(req.session.uid, function(result){
		if(result.length >0 ){
			var checklist = {
				//name: req.session.name,
				uList: result
			};
			res.render('user/checklist', checklist);
		}else{
			res.redirect('/user/seepost');
		}
	});	
});


router.get('/detailspost/:id', (req, res)=>{

	userModel.getonepost(req.params.id, function(result){
		if(result.length >0 ){
			res.render('user/detailspost', result[0]);
		}else{
			res.redirect('/user/checklist');
		}
	});
});

//delete checklist
router.get('/deletedetailspost/:id', (req, res)=>{

	userModel.getonepost(req.params.id, function(result){
		if(result.length >0 ){
			res.render('user/deletedetailspost', result[0]);
		}else{
			res.redirect('/user/checklist');
		}
	});
});	

router.post('/deletedetailspost/:id', (req, res)=>{
	
	userModel.deletewishlist(req.params.id, function(success){
		if(success){
			res.redirect('/user/checklist');
		}else{
			res.redirect("/user/deletedetailspost/"+req.params.id);
		}
	});
});

router.get('/deletedetailspost/:id', (req, res)=>{

	userModel.getonepost(req.params.id, function(result){
		if(result.length >0 ){
			res.render('user/deletedetailspost', result[0]);
		}else{
			res.redirect('/user/checklist');
		}
	});
});

//comment
router.get('/comment/:id', (req, res)=>{

	userModel.getcommentpost(req.params.id, function(result){
		if(result.length >0 ){
			res.render('user/comment', result[0]);
		}else{
			res.redirect('/user/seepost');
		}
	});
});

router.post('/comment/:id', (req, res)=>{
	
	var comment1 ={
		id: req.params.id,
		comment : req.body.comment
		
		
		
	};
	
	userModel.updateCommnet(comment1, function(success){
		if(success){
			res.redirect('/user/seepost');
		}else{
			res.render("/user/comment/"+req.params.id);
		}
	});
});



module.exports = router;