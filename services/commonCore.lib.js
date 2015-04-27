"use strict";

var request = require("superagent");
var Q = require("q");
var _ = require("underscore");

var commonCore = function () {

};

commonCore.prototype = {
	searchJsonObject: function (theObject, attr) {
		var result = null;
	    if (theObject instanceof Array) {
	        for(var i = 0; i < theObject.length; i++) {
	            result = getObject(theObject[i]);
	        }
	    }
	    else {
	        for (var prop in theObject) {
	            if (prop == attr) {
	            	return theObject[prop];
	            }
	            if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
	            	 result = this.searchJsonObject(theObject[prop], attr);
	            }
	        }
	    }
	    return result;
	},
	convertToGold: function (gold) {
		if (gold.lastIndexOf("k") !== -1) {
			gold = gold.substring(0, gold.lastIndexOf("k"));
			return gold.split(".").join("") + "00";
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
			if (sortDirection == "asc") {
				return num[sortBy];
			} else if (sortDirection == "desc") {
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