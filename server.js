var express = require('express');
var app = express();
var request = require("superagent");

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));
app.use('/public',  express.static(__dirname + '/public'));
app.set('views', __dirname+'/views');

app.get('/', function(req, res){
    res.render("index");
});

app.get("/seeds", function (req, res) {
	var url = "http://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=" + req.query.itemId;

	request
	  .get(url)
	  .set('Accept', 'application/json')
	  .end(function(err, r){
	  	res.json(r.text);
	  });
});

app.listen(8080, function () {
	console.log("up and running");
});