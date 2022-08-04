const express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Site' });
});

/* GET addNew page. */
router.get('/addnew', function(req, res)  {
  res.render('addnew', { title: 'Add New Record' });
});

/* GET deleteRecord page. */
router.get('/deleterecord', function(req, res, next) {
  res.render('deleterecord', { title: 'Delete Record' });
});

/* POST data to server. */
router.post('/addnewdata', function(req,res){
	console.log('Post a new record');
	console.log(req.body);
	var MongoClient = mongodb.MongoClient;
	
	var url = 'mongodb://localhost:27017/sampsite';
	
	MongoClient.connect(url, function(err, client){
		if(err) {
			console.log('Unable to connect to the Server', err);
		} else {
			console.log('Connection established to', url);
			var db = client.db('sampsite');
			let collection = db.collection('sermon');
			var sermon1 = {name: req.body.sermonname, date: req.body.sermondate, passage: req.body.scripture};
			console.log(sermon1);
			collection.insertOne([sermon1], function(err, result){
				if (err){
					console.log('Insertion failed:', err);
				}else{
					res.redirect("/thelist");
				}
			});
		}
		client.close();
	});
});

/* GET the list */
router.get('/thelist', function(req,res){
	
	var MongoClient = mongodb.MongoClient;
	
	var url = 'mongodb://localhost:27017/sampsite';
	
	MongoClient.connect(url, function(err, client){
		if(err) {
			console.log('Unable to connect to the Server', err);
		} else {
			console.log('Connection established to', url);
			var db = client.db('sampsite');
			
			var collection = db.collection('sermon');
			
			collection.find({}).toArray(function (err, result){
				if(err){
					res.send(err);
				} else if (result.length) {
					res.render('sermonList', {
						"sermonlist" : result
					});
				} else {
					res.send('No documents found');
				}
				client.close();
			});
			
		}
	
	});
	
});

module.exports = router;
