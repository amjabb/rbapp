var expect = require('expect.js');
var test = require('./test.js');

describe('Add and Remove From Player Database', function(){
	var testId = '';
	it('should add a new player /addPlayer', function(){
		var query = {
						"firstName":"Test",
						"lastName" : "Foo",
						"phoneNumber": "N/A",
						"email": "N/A"
					}
		return test.testPostQ('/players/addPlayer', query)
			.then(function(res){
				testId = res.text;
				expect(res.status).to.equal(200)
			})
			.catch(function(err){
				expect(err).to.eql(null)
			})
	})
	it('should remove the added player /removePlayer', function(){
		var query = {"id":testId}
		return test.testPostQ('/players/removePlayer', query)
			.then(function(res){
				expect(res.status).to.equal(200)
			})
			.catch(function(err){
				expect(err).to.eql(null)
			})
	})
})

describe('Add and Remove to Different Leauges', function(){
	var testId = '';
	it('should add a new player /addPlayer', function(){
		var query = [{
						"firstName":"Test",
						"lastName" : "Foo",
						"phoneNumber": "N/A",
						"email": "N/A"
					}]
		return test.testPostQ('/players/addPlayer', query)
			.then(function(res){
				testId = res.text;
				expect(res.status).to.equal(200)
			})
			.catch(function(err){
				expect(err).to.eql(null)
			})
	})
	it('should add player to corresponding league /movePlayerToLeague', function(){
		// {leagueName: id}
		var query = {"levelOne":testId}
		return test.testPostQ('/players/movePlayerToLeague', query)
			.then(function(res){
				testId = res.text;
				expect(res.status).to.equal(200)
			})
			.catch(function(err){
				expect(err).to.eql(null)
			})
	})
	it('should remove player from corresponding league /removePlayerFromLeague', function(){
		// {leagueName: id}
		var query = {"levelOne":testId}
		return test.testPostQ('/players/removePlayerFromLeague', query)
			.then(function(res){
				expect(res.status).to.equal(200)
			})
			.catch(function(err){
				expect(err).to.eql(null)
			})
	})
	it('should remove the added player /removePlayer', function(){
		var query = {"id":testId}
		return test.testPostQ('/players/removePlayer', query)
			.then(function(res){
				expect(res.status).to.equal(200)
			})
			.catch(function(err){
				expect(err).to.eql(null)
			})
	})
})

describe('Edit player phone numbers and email addresses', function(){
	var testId = '';
	it('should add a new player /addPlayer', function(){
		var query = [{
						"firstName":"Test",
						"lastName" : "Foo",
						"phoneNumber": "N/A",
						"email": "N/A"
					}]
		return test.testPostQ('/players/addPlayer', query)
			.then(function(res){
				testId = res.text;
				expect(res.status).to.equal(200)
			})
			.catch(function(err){
				expect(err).to.eql(null)
			})
	})
	it('should update a players email address /updateEmail', function(){
		//{id: email}
		var query = {}
		query[testId] = "test@gmail.com";
		return test.testPostQ('/players/updateEmail', query)
			.then(function(res){
				expect(res.status).to.equal(200)
				expect(res.text).to.equal("test@gmail.com");
			})
			.catch(function(err){
				expect(err).to.eql(null)
			})
	})
	it('should update a players phone number /updatePhone', function(){
		//{id: phone}
		var query = {}
		query[testId] = "9255517892";
		return test.testPostQ('/players/updatePhone', query)
			.then(function(res){
				expect(res.status).to.equal(200)
				expect(res.text).to.equal("9255517892");
			})
			.catch(function(err){
				expect(err).to.eql(null)
			})
	})
	it('should remove the added player /removePlayer', function(){
		var query = {"id":testId}
		return test.testPostQ('/players/removePlayer', query)
			.then(function(res){
				expect(res.status).to.equal(200)
			})
			.catch(function(err){
				expect(err).to.eql(null)
			})
	})
})