"use strict";

var request = require("superagent");
var Q = require("q");
var _ = require("underscore");

var commonCore = function () {

};

commonCore.prototype = {
	searchJsonObject: function (obj, attr) {
		var result = null;
	    if (obj instanceof Array) {
	        for(var i = 0; i < obj.length; i++) {
	            result = getObject(obj[i]);
	        }
	    }
	    else {
	        for (var prop in obj) {
	            if (prop == attr) {
	            	return obj[prop];
	            }
	            if (obj[prop] instanceof Object || obj[prop] instanceof Array) {
	            	 result = this.searchJsonObject(obj[prop], attr);
	            }
	        }
	    }
	    return result;
	},
	convertToGold: function (gold) {
		var li = gold.lastIndexOf("k");
		var m = gold.lastIndexOf("m");
		if (li !== -1) {
			gold = gold.substring(0, li);
			return gold.split(".").join("") + "00";
		} else if (m !== -1) {
			gold = gold.substring(0, m);
			return gold.split(".").join("") + "00000";
		} else {
			return gold.split(",").join("");
		}
	},
	optionsRouter: function (data, query) {
		var keys = Object.keys(query);
		var returnData = null;
		if (keys.length > 1) {
			if(query.sort) {
				returnData = this.sort(data, query.sort);
			}
			
		}
		return returnData;
	},
	sort: function (data, sort) {
		var sortBy = sort.split(".")[0];
		var sortDirection = sort.split(".")[1];
		//todo: find a better way to handle multiple sort options 

		var sort = _.sortBy(data, function (num) {
			if (sortDirection === "asc") {
				return num[sortBy];
			} else if (sortDirection === "desc") {
				return -num[sortBy];
			} else {
				return num.price; //if the user does not pass a valid sort option
			}
		});

		if (sortBy === "displayName" && sortDirection === "desc") {
			sort = sort.reverse();
		}
		return sort;
	}
};




module.exports = commonCore;