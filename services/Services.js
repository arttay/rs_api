"use strict";

var itemPrice = require("./itemPrice.service");
var godsword = require("./godswordService");
var commonCore = require("./commonCore.lib");



module.exports = {
	itemPrice: new itemPrice(),
	commonCore: new commonCore(),
	godswordService: godsword
}