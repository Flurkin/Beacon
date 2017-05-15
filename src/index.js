var Hapi = require('hapi');
var Routes = require('./routes');
var Config = require('./config');
// var User = require('./models/user').User;

// Loads environment variables
// Used only in development
require('dotenv').config({silent: true});

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({port: process.env.PORT || 3000 });

// Register the plugin
server.register([require('hapi-auth-cookie'), require('vision'), require('inert')], function (err) {

    if (err) {
        throw err;
    }

    // Set our strategy
    server.auth.strategy('session', 'cookie', {
        password: 'worldofwalmart', // cookie secret
        cookie: 'session', // Cookie name
        isSecure: false, // required for non-https applications
        ttl: 24* 60 * 60 * 1000 // Set session to 1 day
    });

    // Set our view engine, we'll use handlebars
    server.views({
        engines: {
            html: require('handlebars')
        },
        path: __dirname + '/views'
    });
});

// Print some information about the incoming request for debugging purposes
server.ext('onRequest', function (request, reply) {
    console.log(request.path, request.query);
    return reply.continue();
});

server.route(Routes.endpoints);

// Start the server
server.start(function() {
    console.log("The server has started on port: " + server.info.port);
});
