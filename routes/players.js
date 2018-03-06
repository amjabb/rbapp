var express = require('express');
var router = express.Router();
var firebase = require("firebase");
const uuid = require('uuid/v1');

var season = 'spring18'

var config = {
  apiKey: "AIzaSyDEm3VJK1c4Rmbw9Dohfk0aNahcpHg4Ci8",
  authDomain: "rbapp-cbd32.firebaseapp.com",
  databaseURL: "https://rbapp-cbd32.firebaseio.com",
  storageBucket: "rbapp-cbd32.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();

/* GET users listing. */
router.get('/', function(req, res, next) {
  database.ref('/players').once('value').then(function(snapshot) {
	  res.send(snapshot.val());
	});
});

router.post('/addPlayer', function(req, res, next) {
	var playerId = uuid();
	var playerInfo = req.body;
	playerInfo["id"] = playerId;
	database.ref('players/' + playerId).set(playerInfo).then(() => res.send(playerId));
})

router.post('/removePlayer', function(req, res, next){
	var playerId = req.body.id;
	database.ref('players/' + playerId).remove().then(() => res.send(playerId));
})

router.post('/movePlayerToLeague', function(req, res, next){
	var level = Object.keys(req.body)[0];
	var playerId = Object.values(req.body)[0];
	database.ref('players/' + playerId).once('value').then(function(snapshot) {
		var playerInfo = snapshot.val();
		database.ref('leagues/' + season + '/' + level + '/' + playerId).set(playerInfo).then(() => res.send(playerId));
	});
})

router.post('/updatePhone', function(req, res, next){
	var playerId = Object.keys(req.body)[0];
	var phoneNumber = Object.values(req.body)[0];
	var updates = {}
	updates['players/' + playerId + '/phoneNumber'] = phoneNumber;
	database.ref().update(updates).then(() => res.send(phoneNumber));
})

router.post('/updateEmail', function(req, res, next){
	var playerId = Object.keys(req.body)[0];
	var email = Object.values(req.body)[0];
	var updates = {}
	updates['players/' + playerId + '/email'] = email;
	database.ref().update(updates).then(() => res.send(email));
})


router.post('/removePlayerFromLeague', function(req, res, next){
	var league = Object.keys(req.body)[0];
	var playerId = Object.values(req.body)[0];
	database.ref('leagues/' + season + '/' + league + '/' + playerId).remove().then(() => res.send(playerId));
})

router.get('/levelOne', function(req, res, next) {
  database.ref('/leagues/' + season + '/' + 'levelOne').once('value').then(function(snapshot) {
	  res.send(snapshot.val());
	});
});

router.get('/levelTwoA', function(req, res, next) {
  database.ref('/leagues/' + season + '/' + 'levelTwoA').once('value').then(function(snapshot) {
	  res.send(snapshot.val());
	});
});

router.get('/levelTwoB', function(req, res, next) {
  database.ref('/leagues/' + season + '/' + 'levelTwoB').once('value').then(function(snapshot) {
	  res.send(snapshot.val());
	});
});

router.get('/levelThree', function(req, res, next) {
  database.ref('/leagues/' + season + '/' + 'levelThree').once('value').then(function(snapshot) {
	  res.send(snapshot.val());
	});
});

router.get('/levelFour', function(req, res, next) {
  database.ref('/leagues/' + season + '/' + 'levelFour').once('value').then(function(snapshot) {
	  res.send(snapshot.val());
	});
});

router.get('/levelFive', function(req, res, next) {
  database.ref('/leagues/' + season + '/' + 'levelFive').once('value').then(function(snapshot) {
	  res.send(snapshot.val());
	});
});
router.get('/levelSix', function(req, res, next) {
  database.ref('/leagues/' + season + '/' + 'levelSix').once('value').then(function(snapshot) {
	  res.send(snapshot.val());
	});
});

router.get('/levelOneD', function(req, res, next) {
  database.ref('/leagues/' + season + '/' + 'levelOneD').once('value').then(function(snapshot) {
	  res.send(snapshot.val());
	});
});

router.get('/levelTwoD', function(req, res, next) {
  database.ref('/leagues/' + season + '/' + 'levelTwoD').once('value').then(function(snapshot) {
	  res.send(snapshot.val());
	});
});

router.get('/morning', function(req, res, next) {
  database.ref('/leagues/' + season + '/' + 'morning').once('value').then(function(snapshot) {
	  res.send(snapshot.val());
	});
});




module.exports = router;
