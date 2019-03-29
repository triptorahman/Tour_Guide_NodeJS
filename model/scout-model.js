var db = require('./db');

module.exports={

	
	
	
	updateScoutPassword: function(user, callback){ //donotdelete
		var sql = "update usertable set password='"+user.password+"' where uid ='"+user.uid+"' ";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	
	getScout: function(user, callback){
		
		var sql = "select * from usertable where uid='"+user+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	
	tempUpload: function(place, callback){//donotdelete
		var sql = "insert into tempupload values (null, '"+place.placeName+"','"+place.placeCountry+"','"+place.placeCost+"','"+place.placeMedium+"','"+place.picture+"','"+place.id+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	scoutUpdate: function(scout, callback){//donotdelete
		var sql = "update usertable set username='"+scout.username+"', email='"+scout.email+"', phone='"+scout.phone+"' where uid="+scout.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getscoutpost: function(userId, callback){
		var sql = "select * from tempupload where uid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	getfinalpost: function(userId, callback){
		var sql = "select * from placetable where uid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	updatependingpost: function(place, callback){
		var sql = "update tempupload set pname='"+place.name+"', pcountry='"+place.country+"', pcost='"+place.cost+"', pmedium='"+place.medium+"' where pid="+place.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	
	deletepost: function(postId, callback){//donotdelete
		var sql = "delete from tempupload where pid="+postId;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getpendingpost: function(userId, callback){//donotdelete
		var sql = "select * from tempupload where pid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	deletefinalpost: function(postId, callback){//donotdelete
		var sql = "delete from placetable where pid="+postId;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getoneFinalpost: function(userId, callback){//donotdelete
		var sql = "select * from placetable where pid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	}
}



