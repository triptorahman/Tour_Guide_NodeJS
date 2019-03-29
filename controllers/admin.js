var express = require('express');
var userModel = require.main.require('./model/admin-model');
var fs = require('fs');
  var path = require('path');
var router = express.Router();
//var session = require('express-session');

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

		//req.session.email
userModel.getAdmin(req.session.uid, function(result){

		if(result.length > 0){
			res.render('admin/adminProfile', result[0]);
		}
	});

		
});
		



router.get('/changePassword', (req, res)=>{
	
	res.render('admin/changePassword');
});
	


router.post('/changePassword', (req, res)=>{
		
		var user={

			password  : req.body.password,
			cpassword :req.body.cpassword,
			uid:req.session.uid
			




		};
		if(req.body.password==req.body.cpassword)
		{userModel.updateAdminPassword(user,function(success){


			if(success){
				res.redirect('/login');
			
		}else{
			res.redirect("/admin");
		}

			
		});

		}



	else{

			res.redirect('/admin');



		}
		

		




});



			
		
			

		
		

router.get('/userUpdateInfo', (req, res)=>{
		
		res.render('admin/userUpdateInfo');
});	
router.get('/adminUpdate', (req, res)=>{
		
		res.render('admin/adminUpdate');
});

router.post('/adminUpdate', (req, res)=>{
		
		var user={

			name  : req.body.adminName,
			email :req.body.adminEmail,
			phone :req.body.adminPhone,
			id:req.session.uid




		};
		userModel.updateAdmininfo(user,function(success){


			if(success){
			res.redirect('/admin');
		}else{
			res.render("/admin/adminUpdate/");
		}

			
		});




});



router.get('/userUpdateInfo', (req, res)=>{
		
		res.render('admin/userUpdateInfo');
});


router.get('/userlist', (req, res)=>{
	
	
	userModel.getAll(function(results){
		if(results.length > 0){
			
			var user = {
				email: req.session.email,
				uList: results
			};
			res.render('admin/userlist', user);
		}
	});	
});
router.get('/userUpdateInfo/:id', (req, res)=>{
			//console.log(req.params.id);
	userModel.get(req.params.id, function(result){
		//console.log(result[0].uid);
		if(result.length >0 ){
			
			res.render('admin/userUpdateInfo', result[0]);
		}else{
			res.redirect('/admin/userlist');
		}
	});
});	
router.post('/userUpdateInfo/:id', (req, res)=>{
	
	var user ={
		id: req.params.id,
		uname : req.body.username,
		email : req.body.email,
		phone : req.body.phone

	};

	//console.log(user.uname);
	
	userModel.update(user, function(success){
		
		if(success){
			res.redirect('/admin/userlist');
		}else{
			res.render("/admin/userUpdateInfo/"+req.params.id);
		}
	});
});



router.get('/delete/:id', (req, res)=>{

	userModel.get(req.params.id, function(result){
		if(result.length >0 ){
			res.render('admin/delete', result[0]);
		}else{
			res.redirect('/admin/userlist');
		}
	});
});	

router.post('/delete/:id', (req, res)=>{
	
	userModel.delete(req.params.id, function(success){
		if(success){
			res.redirect('/admin/userlist');
		}else{
			res.redirect("/admin/delete/"+req.params.id);
		}
	});
});
//confirm photo
router.get('/confirmPost', (req, res)=>{

	userModel.getallphoto(function(result){

		if(result.length > 0){
			var place = {
				//name: req.session.name,
				uList: result
			};
			res.render('admin/postInfo', place);
		}
	});	
});


router.get('/submitpost/:id', (req, res)=>{

	userModel.gettemppost(req.params.id, function(result){
		if(result.length >0 ){
			res.render('admin/submitpost', result[0]);
		}else{
			res.redirect('/admin/postInfo');
		}
	});
});



//rest of submit photo
router.post('/submitpost/:id', (req, res)=>{

//move photo
	var moveFile = (file, dir2)=>{
  
  var f = path.basename(file);
  var dest = path.resolve(dir2, f);

  fs.rename(file, dest, (err)=>{
    if(err) throw err;
    else console.log('Successfully moved');
  });
};
	var tempcomment="No Comment";
	var place ={
		id: req.params.id,
		name : req.body.placeName,
		country : req.body.placeCountry,
		medium : req.body.placeMedium,
		cost:req.body.placeCost,
		image:req.body.imagename,
		comment:tempcomment,
		uid:req.body.userid
	};
	
	userModel.insertFinalPlace(place, function(success){
		if(success){

			var  Imgname = './assets/uploads/' + place.image;

			moveFile(Imgname, './assets/server/');

			

			userModel.deletePendingPost(req.params.id, function(success){
		if(success){
			

			res.redirect('/admin/confirmPost');
		}else{
			res.redirect("/admin/submitpost/"+req.params.id);
		}
	});

			
		}else{
			res.render("/admin/submitpost/"+req.params.id);
		}
	});

});
//adduser
router.get('/adduser', function(request, response){
	
	
			response.render('admin/adduser');
		});

router.post('/adduser', function(request, response){
	
	var user ={
		username : request.body.username,
		password : request.body.password,
		email : request.body.email,
		phonenumber : request.body.phonenumber,
		type: request.body.usertype

	};
	userModel.insert(user, function(success){
		if(success){
			
			response.redirect('/admin/userlist');
		}else{
			response.redirect("/admin/signup");
		}
	});
});

//delete and edit final post

router.get('/allPost', (req, res)=>{

	userModel.getallfinalpost(function(result){

		if(result.length > 0){
			var place = {
				//name: req.session.name,
				uList: result
			};
			res.render('admin/allPlace', place);
		}
	});	
});

router.get('/EditFinalpost/:id', (req, res)=>{

	userModel.getfinalpost(req.params.id, function(result){
		if(result.length >0 ){
			res.render('admin/editfinalpost', result[0]);
		}else{
			res.redirect('/admin/allPost');
		}
	});
});

router.post('/EditFinalpost/:id', (req, res)=>{
	
	var place ={
		id: req.params.id,
		name : req.body.placeName,
		country : req.body.placeCountry,
		medium : req.body.placeMedium,
		comment:req.body.placeComment,
		cost:req.body.placeCost
	};
	
	userModel.updatefinalpost(place, function(success){
		if(success){
			res.redirect('/admin/allPost');
		}else{
			res.render("/admin/EditFinalpost/"+req.params.id);
		}
	});
});


router.get('/DeleteFinalpost/:id', (req, res)=>{

	userModel.getfinalpost(req.params.id, function(result){
		if(result.length >0 ){
			res.render('admin/deletefinalpost', result[0]);
		}else{
			res.redirect('/admin/allPost');
		}
	});
});

router.post('/DeleteFinalpost/:id', (req, res)=>{

	var filename1=req.body.imagename;
	var filename='./assets/server/'+filename1;
	
	userModel.deletefinalpost(req.params.id, function(success){

		if(success){
			fs.unlink(filename, function (err) {
    if (err) throw err;
    
    console.log('File deleted!');
});
			res.redirect('/admin');
		}else{
			res.redirect("/admin/deletefinalpost/"+req.params.id);
		}
	});
});

//delete temp post
router.get('/deletefromtemp/:id', (req, res)=>{

	userModel.getpendingpost(req.params.id, function(result){
		if(result.length >0 ){
			res.render('admin/deleteTempPost', result[0]);
		}else{
			res.redirect('/admin/confirmPost');
		}
	});
});

router.post('/deletefromtemp/:id', (req, res)=>{

	var filename1=req.body.imagename;
	var filename='./assets/uploads/'+filename1;
	
	userModel.deletepost(req.params.id, function(success){

		if(success){
			fs.unlink(filename, function (err) {
    if (err) throw err;
    
    console.log('File deleted!');
});
			res.redirect('/admin');
		}else{
			res.redirect("/admin/deleteTempPost/"+req.params.id);
		}
	});
});


module.exports = router;