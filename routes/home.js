module.exports = function (app) {
	app.route({
	    method: 'GET',
	    path: '/',
	    handler: function (request, reply) {
	        reply('Hello, world!');
	    }
	});
}
