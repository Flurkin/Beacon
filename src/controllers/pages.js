var Path = require('path');
var Hapi = require('hapi');
/**
 * Handles a call to / and shows some text with links to login and registration
 */
exports.index = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the hideout
			return reply.redirect('/ViewReports');
		}

		return reply.view('index');
	}
};

/**
 * Handles a call to / and shows some text with links to login and registration
 */
exports.report = {
	auth: 'session',
	handler: function (request, reply) {
		return reply.view('IndividualReport', {
			email: request.auth.credentials.email
		});
	}
};

/**
 * Handles a call to / and shows some text with links to login and registration
 */
exports.reportlist = {
	auth: 'session',
	handler: function (request, reply) {
		return reply.view('ViewReports', {
			email: request.auth.credentials.email
		});
	}
};

/**
 * Handles a call to css
 */
exports.public = {

    handler: function(request, reply) {
        reply.file(Path.join(__dirname, '../views/' + request.params.fileName))
    }
};

/**
 * Handles a call to /login and shows a login form
 */
exports.login = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the hideout
			return reply.redirect('/batmanshideout');
		}

   		return reply.view('login');
	}
};

/**
 * Handles a call to /register and shows a registration form
 */
exports.register = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the hideout
			return reply.redirect('/ViewReports');
		}

		return reply.view('register');
	}
};

/**
 * Handles a call to /batmanshideout and shows super secret stuff
 */
exports.secret = {
	auth: 'session',
	handler: function (request, reply) {
		return reply.view('secrethideout', {
			email: request.auth.credentials.email
		});
	}
};
