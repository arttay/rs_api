var fs = require('fs');
var path = require('path');


function routeLoader (app, routes) {
    fs.readdirSync(routes).forEach(function (route) {
        var fileName = route.substring(0, route.lastIndexOf(".js"));
        var moduleName = path.join(routes, fileName);

        try {
            require(moduleName)(app);
        } catch (e) {
            console.log(e);
        }
    });
}

module.exports = routeLoader;