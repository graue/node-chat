var url = require('url'),
    fs = require('fs'),
    formidable = require('formidable');

function serveFile(filename, filetype, res) {
    fs.readFile(filename, function(error, file) {
        if (error) {
            res.writeHead(404, {"content-type": 'text/html'});
            res.write('<p>File not found</p>');
            res.end();
        } else {
            res.writeHead(200, {"content-type": filetype});
            res.write(file);
            res.end();
        }
    });
}

exports.index = function(res) {
    serveFile('index.html', 'text/html', res);
};

exports.clientJS = function(res) {
    serveFile('clientSide.js', 'text/javascript', res);
};

exports.msgWait = function(res, req, serverState) {
    if (!serverState.longPollReqs)
        serverState.longPollReqs = [];

    sinceTime = url.parse(req.url, true).query.since || 0;
    var newMsgs = (serverState.msgs || []).filter(
        function(msg) { return msg.time > sinceTime; });

    if (newMsgs.length > 0) {
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify({'messages': newMsgs}));
    } else {
        serverState.longPollReqs.push([res, req]);
    }
};

exports.say = function(res, req, serverState) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if (!serverState.msgs)
            serverState.msgs = [];

        serverState.msgs.push({
            text: fields.msg,
            color: fields.color,
            time: new Date().getTime()
        });

        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('cool post, bro');

        (serverState.longPollReqs || []).forEach(function(lp) {
            // The request object and its 'since' parameter are never
            // looked at, since, if the request was not fulfilled
            // immediately, there were no new messages at that time;
            // and since we've just added a message, there is at most
            // one new message now.
            var res = lp[0];
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify({'messages': serverState.msgs.slice(-1)}));
        });
    });
};
