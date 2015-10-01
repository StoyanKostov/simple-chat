const mysql = require('mysql'),
	validation = require.main.require('./validation'),
	poolSettings = require.main.require('./config/settings').pool,
	pool = mysql.createPool(poolSettings);

function clientMySql(pool){
	this.pool = pool;
}

clientMySql.prototype = {
	getConnection: function(queryStr, callback){
		
		this.pool.getConnection(function(err, connection){
			if(err) {
				connection.release();
				throw err;
			}

			console.log('connected as id ' + connection.threadId);

			connection.query(queryStr, function(err, result){
				connection.release();
				if(err) {
					throw err;
				}

				if (typeof callback === 'function') {
					callback(result);
				}
			});

			connection.on('error', function(err) {      
				throw err;
			});
		});
	}
}

module.exports = new clientMySql(pool);