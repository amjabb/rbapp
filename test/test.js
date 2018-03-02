var request = require('superagent');
var expect = require('expect.js');

var testGetRoutes = function(route){
	return new Promise(function(resolve, reject){
		request
			.get('http://localhost:3000' + route)
			.then(function(res){
				resolve(res);
			}, function(err){
				reject(err);
			})
	})
}

var testPostRoutes = function(route){
	return new Promise(function(resolve, reject){
		request
			.post('http://localhost:3000' + route)
			.then(function(res){
				resolve(res);
			}, function(err){
				reject(err);
			})
	})
}

var testPostRouteswQuery = function(route, query){
	return new Promise(function(resolve, reject){
		request
			.post('http://localhost:3000' + route)
			.send(query)
			.then(function(res){
				resolve(res);
			}, function(err){
				reject(err);
			})
	})
}


module.exports = {
	testGet : testGetRoutes,
	testPost : testPostRoutes,
	testPostQ : testPostRouteswQuery
}