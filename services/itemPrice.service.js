"use strict";

var request = require("superagent");
var Q = require("q");

var itemPrice = function () {

};

itemPrice.prototype = {
	getPrice: function (itemId) {
		var url = "http://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=" + itemId;
		var defered = new Q.defer();

		request
		  .get(url)
		  .set('Accept', 'application/json')
		  .end(function(err, r) {
		  	defered.resolve(r.text);
		  });

		  return defered.promise.then(function (data) {
		  	return data;
		  });
	}
};




module.exports = itemPrice;