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
			var shards 		= data[0];
			var hilts 		= data[1];
			var builtBlade 	= data[2];
			var shardPrice 	= this.combine(shards);

			return {
				armadyl: this.buildReturnObj({
					shardPrice: shardPrice,
					hilt: hilts["Armadyl hilt"],
					buildPrice: this.buildGodsword(hilts["Armadyl hilt"], shardPrice),
					buildBlade: builtBlade["Armadyl godsword"]
				}),
				bandos: this.buildReturnObj({
					shardPrice: shardPrice,
					hilt: hilts["Bandos hilt"],
					buildPrice: this.buildGodsword(hilts["Bandos hilt"], shardPrice),
					buildBlade: builtBlade["Bandos godsword"]
				}),
				saradomin: this.buildReturnObj({
					shardPrice: shardPrice,
					hilt: hilts["Saradomin hilt"],
					buildPrice: this.buildGodsword(hilts["Saradomin hilt"], shardPrice),
					buildBlade: builtBlade["Saradomin godsword"]
				}), 
				zamorak: this.buildReturnObj({
					shardPrice: shardPrice,
					hilt: hilts["Zamorak hilt"],
					buildPrice: this.buildGodsword(hilts["Zamorak hilt"], shardPrice),
					buildBlade: builtBlade["Zamorak godsword"]
				})

			}
		}.bind(this));
		

	},
	buildGodsword: function (hilt, shardPrice) {
		return parseInt(shardPrice) + parseInt(hilt.price);
	},
	buildReturnObj: function (swordObj) {
		return {
			shardPrice: Number(swordObj.shardPrice).format(),
			hiltPrice: Number(swordObj.hilt.price).format(),
			bladePrice: Number(swordObj.buildPrice).format(),
			godSwordPrice: Number(swordObj.buildBlade.price).format(),
			diff: Number(swordObj.buildBlade.price - swordObj.buildPrice).format()
		}
	},

	shards: function (data) {
		var arr = [];
		var returnData = [];
		data.forEach(function (item) {
			arr.push(this.itemService.getPrice(item))
		}.bind(this));

		return Q.all(arr).then(function (data) {
			return data.reduce((sub, item) => {
				var json = JSON.parse(item);
				sub.push({
					name: json.item.name,
					price: this.commonCore.convertToGold(json.item.current.price)
				})
				return sub;
			}, []);
		}.bind(this))
	},
	hilts: function (data) {
		var arr = [];
		var returnData = [];
		data.forEach(function (item) {
			arr.push(this.itemService.getPrice(item))
		}.bind(this));

		return Q.all(arr).then(function (data) {
			return data.reduce((sub, item) => {
				var json = JSON.parse(item)
				
				sub[json.item.name] = {
					name: json.item.name,
					price: this.commonCore.convertToGold(json.item.current.price)
				};

				return sub;
			}, []);
		}.bind(this))
	},
	combine: function (arr) {
		return arr.reduce(function (sub, item) {
			return sub + parseInt(item.price);
		}, 0);
	}
};




module.exports = new Godsword();