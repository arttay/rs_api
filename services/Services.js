"use strict";

var itemPrice = require("./itemPrice.service");
var commonCore = require("./commonCore.lib");



module.exports = {
	itemPrice: new itemPrice(),
	commonCore: new commonCore()
}