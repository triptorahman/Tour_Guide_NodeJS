var db = require('./db');

module.exports={

	
	getAll: function(callback){//donotdelete
		var sql = "select * from usertable where type != 3";
		db.getResult(sql, function(results){
			callback(results);
		});
	},
	get: function(userId, callback){//donotdelete
		var sql = "select * from usertable where uid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	updateAdminPassword: function(user, callback){//donotdelete
		var sql = "update usertable set password='"+user.password+"' where uid ='"+user.uid+"' ";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	
	getAdmin: function(user, callback){//donotdelete
		
		var sql = "select * from usertable where uid='"+user+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	
	updateAdmininfo: function(user, callback){//donotdelete
		var sql = "update usertable set username='"+user.name+"', email='"+user.email+"', phone='"+user.phone+"' where uid ='"+user.id+"'";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	validate: function(user, callback){//donotdelete
		var sql = "select * from usertable where email='"+user.email+"' and password='"+user.password+"'";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	insert: function(user, callback){ //to store signup data//donotdelete
		var sql = "insert into usertable values (null, '"+user.username+"','"+user.password+"','"+user.email+"','"+user.phonenumber+"','"+user.type+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(user, callback){ //update user info by admin//donotdelete
		var sql = "update usertable set username='"+user.uname+"', email='"+user.email+"', phone='"+user.phone+"' where uid="+user.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	delete: function(userId, callback){//donotdelete
		var sql = "delete from usertable where uid="+userId;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	deletePendingPost: function(postId, callback){//donnotdelete
		var sql = "delete from tempupload where pid="+postId;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	getallphoto: function(callback){//donotdelete
		var sql = "select * from tempupload";

		db.getResult(sql, function(result){
			callback(result);
		});
	},

//made by tripto for home controller credit req
	
	
	
	
	
	
	//final photo
	insertFinalPlace: function(place, callback){//donnotdelete
		var sql = "insert into placetable values ('"+place.id+"', '"+place.name+"','"+place.country+"','"+place.cost+"','"+place.medium+"','"+place.comment+"','"+place.image+"','"+place.uid+"')";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	//buyer part
	getallfinalpost: function(callback){//donotdelete
		var sql = "select * from placetable";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	gettemppost: function(userId, callback){//donotdelete
		var sql = "select * from tempupload where pid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	getfinalpost: function(userId, callback){//donotdelete
		var sql = "select * from placetable where pid='"+userId+"' ";

		db.getResult(sql, function(result){
			callback(result);
		});
	},
	updatefinalpost: function(place, callback){
		var sql = "update placetable set pname='"+place.name+"', pcountry='"+place.country+"', pcost='"+place.cost+"', pmedium='"+place.medium+"', pcomment='"+place.comment+"' where pid="+place.id;
		db.execute(sql, function(status){
			callback(status);
		});
	},
	deletefinalpost: function(postId, callback){
		var sql = "delete from placetable where pid="+postId;
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
	deletepost: function(postId, callback){//donotdelete
		var sql = "delete from tempupload where pid="+postId;
		db.execute(sql, function(status){
			callback(status);
		});
	}
}



