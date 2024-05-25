// Create Web Server
// Create Web Server
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    var query = parsedUrl.query;
    var queryString = JSON.stringify(query, null, 2);
    console.log('Path: ' + path);
    console.log('Query: ' + queryString);

    if (path === '/comments') {
        var comments = [];
        if (fs.existsSync('comments.json')) {
            var comments = JSON.parse(fs.readFileSync('comments.json'));
        }
        if (req.method === 'POST') {
            var body = '';
            req.on('data', function (chunk) {
                body += chunk;
            });
            req.on('end', function () {
                var newComment = JSON.parse(body);
                comments.push(newComment);
                fs.writeFileSync('comments.json', JSON.stringify(comments));
                res.end('Comment added');
            });
        } else if (req.method === 'GET') {
            res.end(JSON.stringify(comments));
        }
    }
    else {
        res.statusCode = 404;
        res.end('Not found');
    }
}
);
