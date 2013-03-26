var querystring = require('querystring'),
    fs = require('fs'),
    formidable = require('formidable');

exports.start = function(response) {
    console.log("Request handler 'start' was called");
    var body = '<html><head><meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" /></head><body>'+
        '<form action="/upload" method="post" enctype="multipart/form-data">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form></body></html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

exports.upload = function(response, request) {
    console.log("Request handler 'upload' was called");
    var form = new formidable.IncomingForm();
    console.log('about to parse');
    form.parse(request, function(error, fields, files) {
        console.log('parsing done');

        // Possible error on Windows, if renaming over an existing file
        fs.rename(files.upload.path, "/tmp/test.jpg", function(err) {
            if (err) {
                fs.unlink('/tmp/test.jpg');
                fs.rename(files.upload.path, '/tmp/test.jpg');
            }
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br><img src='/show'>");
        response.end();
    });
}

exports.show = function(response, request) {
    console.log("Request handler 'show' was called");
    fs.readFile("/tmp/test.jpg", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {"content-type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"content-type": "image/jpeg"});
            response.write(file, "binary");
            response.end();
        }
    });
}
