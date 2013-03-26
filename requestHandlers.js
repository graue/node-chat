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
}

exports.clientJS = function(res) {
    serveFile('clientSide.js', 'text/javascript', res);
}

exports.msgWait = function(res, req) {
    // todo
}

exports.say = function(res, req) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        console.log('Message "' + fields.msg +
            '" in color "' + fields.color + '"');
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('cool post, bro');
    });
}
