var api = require("../services/Services");
var json = require("../public/data/seeds.json");
var Q = require("q");

module.exports = function (app) {
		app.route({
		    method: 'GET',
		    path: '/seeds',
		    handler: function (request, reply) {
		    var query = request.query;
			    
			    if(query.category) {
			 
			    	var category 	= query.category.split(".")[0];
			    	var subCategory = query.category.split(".")[1];
			    	var arr = [];
			    	var itemArr = [];

			   
			    	category 		= api.commonCore.searchJsonObject(json, category);
			    	data 			= api.commonCore.searchJsonObject(category, subCategory);

			    	for (var key in data) {
			    		arr.push(api.itemPrice.getPrice(data[key]));
			    	}

			    	Q.all(arr).done(function (data) {
			    		for (var key in data) {
			    			var item = JSON.parse(data[key]);
			    			var name = item.item.name
			    			var currentPrice = item.item.current.price;
			    			if(typeof currentPrice === "string") {
			    				currentPrice = parseInt(api.commonCore.convertToGold(currentPrice));
			    			}

			    			var obj = {
			    				displayName: name,
			    				price: currentPrice
			    			};
			    			itemArr.push(obj);	
			    		}
			    		reply(itemArr);
			    	});
			    }		        
		    }
		});
}

