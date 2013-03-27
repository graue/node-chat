var _ = require('underscore'),
    server = require('./server'),
    router = require('./router'),
    requestHandlers = require('./requestHandlers'),
    bgTasks = require('./bgTasks');

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

state = server.start(router.route, handle);
bgTasks.start(state);
