var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


/* GET addNew page. */
router.get('/addnewrecord', function(req, res, next) {
  res.render('addnewrecord', { title: 'Add New Record' });
});


module.exports = router;
