"use strict";

var request = require("superagent");
var Q = require("q");

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
	}
};




module.exports = commonCore;