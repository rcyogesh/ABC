var http = require('http');
const url = require('url');
const util = require('util');
const letterFunction = require('./letter');
const bp = require('./bp');
const qs = require('querystring');
const fs = require('fs');

var server = http.createServer(function(request, response) {
    try{
        const parsedURL = url.parse(request.url, true);

    //console.log(parsedURL.href);
    if(parsedURL.href.toLowerCase().startsWith("/dist")) {
        response.write(fs.readFileSync('..'+request.url));
        response.end();
        return;
    }

    if(parsedURL.href.toLowerCase().indexOf("favicon.ico") != -1)
    {
        response.end();
        return;
    }

    if(request.method=="POST") {
        var wholeData = '';
        request.on('data', (data)=> {
            wholeData += data;
        });

        request.on('end', ()=>{
            let json = wholeData.toString();
            bp.process(JSON.parse(json));
        })
    }
    else {
        response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin":"http://localhost:4200"});

        var letter = parsedURL.query.letter;

        if(letter != "" && letter != undefined){
            letterFunction.process(letter, response);
        }
        else {
            response.end("Please specify a letter");
        }
    }
}
catch(err){
    response.write(err.toString());
    response.end();
}
});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);