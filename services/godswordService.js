"use strict";

var request = require("superagent");
var itemService = require("./itemPrice.service");
var commonCore = require("./commonCore.lib");
var Q = require("q");

var Godsword = function () {

};

Godsword.prototype = {
	init: function (arr) {
		Number.prototype.format = function(){
		   return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
		};

		var foo = [];

		this.itemService = new itemService();
		this.commonCore = new commonCore();

		foo.push(this.shards(arr.shards));
		foo.push(this.hilts(arr.hilt));
		foo.push(this.hilts(arr.blades));

		return Q.all(foo).then(function (data) {
			var shards = data[0];
			var hilts = data[1];
			var builtBlade = data[2];
			var shardPrice = this.combine(shards);
			var buildPrice = {
				armadyl: parseInt(shardPrice) + parseInt(hilts["Armadyl hilt"].price),
				bandos: parseInt(shardPrice) + parseInt(hilts["Bandos hilt"].price),
				saradomin: parseInt(shardPrice) + parseInt(hilts["Saradomin hilt"].price),
				zamorak: parseInt(shardPrice) + parseInt(hilts["Zamorak hilt"].price)
			}
			return {
				armadyl: {
					
					shardPrice: Number(shardPrice).format(),
					hiltPrice: Number(hilts["Armadyl hilt"].price).format(),
					bladePrice: Number(buildPrice.armadyl).format(),
					godSwordPrice: Number(builtBlade["Armadyl godsword"].price).format(),
					diff: Number(builtBlade["Armadyl godsword"].price - buildPrice.armadyl).format()
				},
				bandos: {
					
					shardPrice: Number(shardPrice).format(),
					hiltPrice: Number(hilts["Bandos hilt"].price).format(),
					bladePrice: Number(buildPrice.bandos).format(),
					godSwordPrice: Number(builtBlade["Bandos godsword"].price).format(),
					diff: Number(builtBlade["Bandos godsword"].price - buildPrice.bandos).format()
				},
				saradomin: {
					
					shardPrice: Number(shardPrice).format(),
					hiltPrice: Number(hilts["Saradomin hilt"].price).format(),
					bladePrice: Number(buildPrice.saradomin).format(),
					godSwordPrice: Number(builtBlade["Saradomin godsword"].price).format(),
					diff: Number(builtBlade["Saradomin godsword"].price - buildPrice.saradomin).format()
				}, 
				zamorak: {
					
					shardPrice: Number(shardPrice).format(),
					hiltPrice: Number(hilts["Zamorak hilt"].price).format(),
					bladePrice: Number(buildPrice.zamorak).format(),
					godSwordPrice: Number(builtBlade["Zamorak godsword"].price).format(),
					diff: Number(builtBlade["Zamorak godsword"].price - buildPrice.zamorak).format()
				}

			}




		}.bind(this));
		

	},
	shards: function (data) {
		var arr = [];
		var returnData = [];
		data.forEach(function (item) {
			arr.push(this.itemService.getPrice(item))
		}.bind(this));

		return Q.all(arr).then(function (data) {
			data.forEach(function (data) {
				var json = JSON.parse(data);
				returnData.push({
					name: json.item.name,
					price: this.commonCore.convertToGold(json.item.current.price)
				});

			}.bind(this));
			return returnData;
		}.bind(this))
	},
	hilts: function (data) {
		var arr = [];
		var returnData = [];
		data.forEach(function (item) {
			arr.push(this.itemService.getPrice(item))
		}.bind(this));

		return Q.all(arr).then(function (data) {
			data.forEach(function (data) {
				var json = JSON.parse(data);
				returnData[json.item.name] = {
					name: json.item.name,
					price: this.commonCore.convertToGold(json.item.current.price)
				}

			}.bind(this));
			return returnData;
		}.bind(this))
	},
	combine: function (arr) {
		return arr.reduce(function (sub, item) {
			return sub + parseInt(item.price);
		}, 0);
	}
};




module.exports = new Godsword();