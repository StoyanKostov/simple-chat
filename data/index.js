const mysql = require('mysql'),
	bcrypt = require('bcrypt'),
	pool = mysql.createPool({
		connectionLimit: 100,
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'chat'
	});

function registerUser(newUser){
	return new Promise(function(resolve, reject){
		pool.getConnection(function(err, connection){
			if(err) {
				connection.release();
				//res.json({"code" : 100, "status" : "Error in connection database"});
				reject(err);
			}
			
			console.log('connected as id ' + connection.threadId);

			connection.query("INSERT INTO users (username, password) VALUES ('"+ newUser.username + "','" + newUser.password + "')", function(err, result){
				connection.release();
				if(err) {
					reject(err);
				}

				resolve(result.insertId);
			});

			connection.on('error', function(err) {      
				//res.json({"code" : 100, "status" : "Error in connection database"});
				//console(err);
				reject(err);
			});
		});
	});
};

function getUserByName(username){
	return new Promise(function(resolve, reject){
		pool.getConnection(function(err, connection){
			if(err) {
				connection.release();
				//res.json({"code" : 100, "status" : "Error in connection database"});
				reject(err);
			}
			
			console.log('connected as id ' + connection.threadId);

			connection.query("SELECT * FROM users WHERE username LIKE '" + username + "' LIMIT 1", function(err, rows){
				connection.release();
				if(err) {
					//console(err);
					reject(err);
				}

				resolve(rows[0]);
			});

			connection.on('error', function(err) {      
				//res.json({"code" : 100, "status" : "Error in connection database"});
				//console(err);
				reject(err);
			});

		});
	});
};

module.exports = {
	registerUser: registerUser,
	getUserByName: getUserByName
};