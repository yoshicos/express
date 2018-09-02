var express = require('express');
var router = express.Router();
var db = require('../pgdb');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.any("SELECT id,name,age,mail FROM loginuser")
    .then(function (data) {
        res.render('index', { title: 'Express', logindata: data });
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });

});

module.exports = router;
