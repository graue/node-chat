var _ = require('underscore'),
    server = require('./server'),
    router = require('./router'),
    requestHandlers = require('./requestHandlers');

var routes = {
    '/': 'start',
    '/start': 'start',
    '/upload': 'upload',
    '/show': 'show'
};

var handle = {};
_.each(routes, function(val, key) {
    handle[key] = requestHandlers[val];
});

server.start(router.route, handle);
