var db = require('./db');

module.exports={

	
	
	
	updateUserPassword: function(user, callback){//donotdelete
		var sql = "update usertable set password='"+user.password+"' where uid ='"+user.uid+"' ";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	
	getUser: function(user, callback){//donotdelete
		
		var sql = "select * from usertable where uid='"+user+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	
		
	insertcheklist: function(place, callback){ //donot
		var sql = "insert into checklist values ('"+place.uid+"','"+place.placename+"','"+place.cost+"','"+place.pid+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(user, callback){ //update user info by admin
		var sql = "update usertable set username='"+user.uname+"', email='"+user.email+"', phone='"+user.phone+"' where uid="+user.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	deletewishlist: function(userId, callback){//donot delete
		var sql = "delete from checklist where pid="+userId;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	
	
	userupdate: function(user, callback){//donotdelete
		var sql = "update usertable set username='"+user.username+"', email='"+user.email+"', phone='"+user.phone+"' where uid="+user.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	
	
	
	
	

//made by tripto for home controller credit req
	
	
	getallchecklist: function(userId, callback){//donot
		var sql = "select * from checklist where uid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	
	

	
	//buyer part
	getallfinalpost: function(callback){//donnot
		var sql = "select * from placetable";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	getonepost: function(placeId, callback){//donot
		var sql = "select * from placetable where pid='"+placeId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	getcommentpost: function(userId, callback){//donotdelete
		var sql = "select * from placetable where pid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},

	updateCommnet: function(user, callback){
		var sql = "update placetable set pcomment='"+user.comment+"' where pid="+user.id;
		db.execute(sql, function(status){
			callback(status);
		});
	}
	
}



