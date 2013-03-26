var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(req, res) {
        var pathname = url.parse(req.url).pathname;
        console.log('Request for ' + pathname + ' received.');
        route(handle, pathname, res, req);
    }

    http.createServer(onRequest).listen(9992);

    console.log('server listening on port 9992');
}

exports.start = start;
