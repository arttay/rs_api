var Q = require("q");
var _ = require("underscore");
var json = require("../public/data/profit.json");
var api = require("../services/Services");

module.exports = function (app) {
		app.route({
		    method: 'GET',
		    path: '/godsword',
		    config: {
		    	jsonp: 'callback'
		    },
		    handler: function (request, reply) {
		    	//api.godswordService.init(json["godsword"])

		    	reply(api.godswordService.init(json["godsword"]));

			        
		    }
		});


		app.route({
		    method: 'GET',
		    path: '/repair',
		    config: {
		    	jsonp: 'callback'
		    },
		    handler: function (request, reply) {

		    	var eq = (1 - (60/200));
		    	console.log(eq);
			     reply("ok");  
		    }
		});
}

