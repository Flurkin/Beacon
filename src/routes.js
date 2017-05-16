var Pages = require('./controllers/pages');
var Authentication = require('./controllers/authentication');

/**
 * Contains the list of all routes, i.e. methods, paths and the config functions
 * that take care of the actions
 */
exports.endpoints = [
	{ method: 'GET',    path: '/{fileName}',                   config: Pages.public    },
	{ method: 'GET',    path: '/',                             config: Pages.index    },
	{ method: 'GET',    path: '/login',                        config: Pages.login    },
	{ method: 'GET',    path: '/register',                     config: Pages.register },
	{ method: 'GET',    path: '/batmanshideout',               config: Pages.secret   },
	{ method: 'GET',    path: '/IndividualReport',             config: Pages.report },
	{ method: 'GET',    path: '/ViewReports',                  config: Pages.reportlist   },

	{ method: 'POST',   path: '/login',                        config: Authentication.login },
	{ method: 'GET',    path: '/logout',                       config: Authentication.logout },
	{ method: 'POST',   path: '/register',                     config: Authentication.register },
	{ method: 'POST',   path: '/mobilelogin',                  config: Authentication.mobilelogin },
];
