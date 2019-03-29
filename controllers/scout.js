var express = require('express');

var userModel = require.main.require('./model/scout-model');
//var upload = require('express-fileupload');

var fs = require('fs');
  var path = require('path');
  var router = express.Router();

  var newfile;

  
 







router.get('*', function(req, res, next){
		if(req.session.email != null){
			next();
		}else{
			res.redirect('/login');
		}
});










router.use('/assets',express.static('assets'));



router.get('/', (req, res)=>{
	
			
		userModel.getScout(req.session.uid, function(result){

		if(result.length > 0){
			res.render('scout/scoutProfile', result[0]);
		}
	});
		
});	

router.get('/seePendingPost', (req, res)=>{

	userModel.getscoutpost(req.session.uid, function(result){

		if(result.length > 0){
			var user = {
				email: req.session.email,
				uList: result
			};
			res.render('scout/updateTempPost', user);
		}
	});	
});



router.get('/edit/:id', (req, res)=>{

	userModel.getpendingpost(req.params.id, function(result){
		if(result.length >0 ){
			res.render('scout/edit', result[0]);
		}else{
			res.redirect('/scout/seePendingPost');
		}
	});
});

router.post('/edit/:id', (req, res)=>{
	
	var place ={
		id: req.params.id,
		name : req.body.placeName,
		country : req.body.placeCountry,
		medium : req.body.placeMedium,
		cost:req.body.placeCost
	};
	
	userModel.updatependingpost(place, function(success){
		if(success){
			res.redirect('/scout/seePendingPost');
		}else{
			res.render("/scout/edit/"+req.params.id);
		}
	});
});


router.get('/createPost', function(request, response){
	
	
			response.render('scout/createPost');
		});

router.get('/updateinformation', (req, res)=>{
		
		res.render('scout/scoutUpdateInfo');
});	






 

router.post('/updateinformation/', function(request, response){


	var scout ={
		username : request.body.username,
		email : request.body.email,
		phone : request.body.phone,
		id: request.session.uid
		

};

userModel.scoutUpdate(scout, function(success){
		if(success){
			
			response.redirect('/login');
			
		}else{
			response.render('scout/scoutUpdateInfo');
		}
	});



});

router.post('/createPost/', function(request, response){
/*var time = new Date().getTime(); 

	var Imgfile = request.files.image;
     var  Imgname = '/assets/uploads/' + time + Imgfile.name;*/
//moves the $file to $dir2
var moveFile = (file, dir2)=>{
  
  var f = path.basename(file);
  var f2=path.basename(newfile);
  var dest = path.resolve(dir2, f2);



  fs.rename(file, dest, (err)=>{
    if(err) throw err;
    else console.log('Successfully moved');

   
  });
};

//move file1.htm from 'test/' to 'test/dir_1/'

var d = new Date();
var e = d.getMilliseconds();

var f1=request.body.image;
var time=e+f1;
newfile=time;







	var place ={
		placeName : request.body.placeName,
		placeCountry : request.body.placeCountry,
		placeMedium : request.body.placeMedium,
		placeCost : request.body.placeCost,
		picture: time,
		id: request.session.uid
		

};



	userModel.tempUpload(place, function(success){
		if(success){

			
			var  Imgname = './assets/source/' + f1;

			moveFile(Imgname, './assets/uploads/');

			response.redirect('/scout');
		}else{
			response.render("/login");
		}
	});
});


router.get('/changePassword', (req, res)=>{
	
	res.render('scout/changePassword');
});
	


router.post('/changePassword', (req, res)=>{
		
		var user={

			password  : req.body.password,
			cpassword :req.body.cpassword,
			uid:req.session.uid
			




		};
		if(req.body.password==req.body.cpassword)
		{
			userModel.updateScoutPassword(user,function(success){


			if(success){
				res.redirect('/login');
			
		}else{
			res.redirect("/scout");
		}

			
		});

		}



	else{

			res.redirect('/scout');



		}
		

		




});

router.get('/delete/:id', (req, res)=>{

	userModel.getpendingpost(req.params.id, function(result){
		if(result.length >0 ){
			res.render('scout/delete', result[0]);
		}else{
			res.redirect('/scout/seePendingPost');
		}
	});
});

router.post('/delete/:id', (req, res)=>{

	var filename1=req.body.imagename;
	var filename='./assets/uploads/'+filename1;
	
	userModel.deletepost(req.params.id, function(success){

		if(success){
			fs.unlink(filename, function (err) {
    if (err) throw err;
    
    console.log('File deleted!');
});
			res.redirect('/scout');
		}else{
			res.redirect("/scout/delete/"+req.params.id);
		}
	});
});

//uploaded photo 
router.get('/uploadedPost', (req, res)=>{

	userModel.getfinalpost(req.session.uid, function(result){

		if(result.length > 0){
			var user = {
				email: req.session.email,
				uList: result
			};
			res.render('scout/uploadedPost', user);
		}
	});	
});

//delete final post

router.get('/deletefinalpost/:id', (req, res)=>{

	userModel.getoneFinalpost(req.params.id, function(result){
		if(result.length >0 ){
			res.render('scout/deletefinalpost', result[0]);
		}else{
			res.redirect('/scout/uploadedPost');
		}
	});
});

router.post('/deletefinalpost/:id', (req, res)=>{

	var filename1=req.body.imagename;
	var filename='./assets/server/'+filename1;
	
	userModel.deletefinalpost(req.params.id, function(success){

		if(success){
			fs.unlink(filename, function (err) {
    if (err) throw err;
    
    console.log('File deleted!');
});
			res.redirect('/scout');
		}else{
			res.redirect("/scout/deletefinalpost/"+req.params.id);
		}
	});
});









module.exports = router;


