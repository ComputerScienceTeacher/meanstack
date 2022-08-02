var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Site' });
});

/* GET addNew page. */
router.get('/addnew', function(req, res, next) {
  res.render('addnewdata', { title: 'Add New Record' });
});

/* GET viewRecord page. */
router.get('/viewrecords', function(req, res, next) {
  res.render('viewrecords', { title: 'View Records' });
});

/* GET deleteRecord page. */
router.get('/deleterecord', function(req, res, next) {
  res.render('deleterecord', { title: 'Delete Record' });
});

/* GET the list */
router.get('/thelist', function(req,res){
	
	var MongoClient = mongodb.MongoClient;
	
	var url = 'mongodb://localhost';
	
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
