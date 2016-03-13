var api = require("../services/Services");
var service = require("../services/seedsService.js")
var json = require("../public/data/seeds.json");
var Q = require("q");
var _ = require("underscore");

module.exports = function (app) {
	
		app.route({
		    method: 'GET',
		    path: '/seeds',
		    config: {
		    	jsonp: 'callback'
		    },
		    handler: function (request, reply) {
		    var query 		= request.query;
			var arr 		= [];
			var itemArr 	= [];

			    if(query.category) {
			 
			    	var category 	= query.category.split(".")[0];
			    	var subCategory = query.category.split(".")[1];

			   		service.init(category, subCategory).then((data) => {
						reply(data);
			   		});
			   		
			   	} else {
					reply(itemArr);   
			    }

			        
		    }
		});

}


