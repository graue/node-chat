var _ = require('underscore'),
    server = require('./server'),
    router = require('./router'),
    requestHandlers = require('./requestHandlers');

var routes = {
    '/': 'index',
    '/js': 'clientJS',
    '/msg-wait': 'msgWait',
    '/say': 'say'
};

var handle = {};
_.each(routes, function(val, key) {
    handle[key] = requestHandlers[val];
});

server.start(router.route, handle);
