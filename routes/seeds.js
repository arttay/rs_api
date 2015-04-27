var api = require("../services/Services");
var json = require("../public/data/seeds.json");
var Q = require("q");
var _ = require("underscore");

module.exports = function (app) {
		app.route({
		    method: 'GET',
		    path: '/seeds',
		    handler: function (request, reply) {
		    var query 		= request.query;
			var arr 		= [];
			var itemArr 	= [];

			    if(query.category) {
			 
			    	var category 	= query.category.split(".")[0];
			    	var subCategory = query.category.split(".")[1];

			   		
			    	category = api.commonCore.searchJsonObject(json, category);
			    	

			    	if (subCategory === undefined) {
			    		//user passed a top level category(seeds, ammo, bolts ect)
			    		for (var key in category) {
			    			var item = category[key]
			    			if(!_.isEmpty(category[key])) {
			    				for (var ke in item) {
			    					//todo: make this loop more dynamic
			    					//todo: also, I really really hate this, make it better
			    					arr.push(api.itemPrice.getPrice(item[ke]));
				    			}
			    			}
			    		}
			    	} else {
			    		data = api.commonCore.searchJsonObject(category, subCategory);
			    		for (var key in data) {
			    			arr.push(api.itemPrice.getPrice(data[key]));
			    		}
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
			    				id: item.item.id,
			    				description: item.item.description,
			    				price: currentPrice
			    			};
			    			itemArr.push(obj);	
			    		}
			    		var returnData = api.commonCore.optionsRouter(itemArr, query);
			    		returnData === null ? reply(itemArr) : reply(returnData);
			    	});
			   	} else {
					reply(itemArr);   
			    }

			        
		    }
		});
}

