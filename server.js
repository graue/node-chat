var http = require('http');
var url = require('url');

function start(route, handle) {
    var serverState = {};

    function onRequest(req, res) {
        var pathname = url.parse(req.url).pathname;
        console.log('Request for ' + pathname + ' received.');
        route(handle, pathname, res, req, serverState);
    }

    http.createServer(onRequest).listen(9992);

    console.log('Server listening on port 9992');
}

exports.start = start;
