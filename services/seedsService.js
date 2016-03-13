"use strict";
var json = require("../public/data/seed.json");
var api = require("./Services");


var seedService = function () {

};

seedService.prototype = {
	init: function (category, subCategory) {
		var list = json["category"][category][subCategory];
		
		var arr = list.reduce((per, item) => {
			per.push(api.itemPrice.getPrice(item.id));
			return per;
		}, []);

		return Promise.all(arr).then((data) => {
			return this.buildReturnObj(data);
		}).catch((err) => {
			console.log(err);
		});
	},

	buildReturnObj: function (data) {
		return data.reduce((pre, item) => {
			var t =  JSON.parse(item);
			var price = t.item.current.price;

			if (price === "string") price = parseInt(api.commonCore.convertToGold(price));

			pre.push({
			    displayName: t.item.name,
			    id: t.item.id,
			    description: t.item.description,
			    price: price,
			    graph: "http://services.runescape.com/m=itemdb_rs/api/graph/" + t.item.id + ".json"	
			})

			return pre;
		}, []);
	}
};




module.exports =  new seedService();