var app = require('hapi');
var routeLoader = require("./routeLoader");
var path = require("path");


var server = new app.Server();
server.connection({
	port: process.env.PORT || 8080,
	routes: { 
			cors: true
		} 
	});
routeLoader(server, path.join(__dirname, "routes"));


server.start(function () {
    console.log('Server running at:', server.info.uri);
});

