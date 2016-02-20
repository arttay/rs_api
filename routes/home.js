module.exports = function (app) {
	app.route({
	    method: 'GET',
	    path: '/home',
	    handler: function (request, reply) {
	        reply('Hello, world!');
	    }
	});
}
