function route(handle, pathname, response, request, serverState) {
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](response, request, serverState);
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
    }
}

exports.route = route;
