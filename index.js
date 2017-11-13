log = buildLog('starting up');
var http = require('http');
log += buildLog('loaded http');
require('dotenv').config();
log += buildLog('loaded env');

console.log(process.env.email);

log += buildLog('creating server');
var server = http.createServer(function(request, response) {
    try {
        const url = require('url');
        const parsedURL = url.parse(request.url, true);
        
    if(request.method=="POST") {
        var wholeData = '';
        request.on('data', (data)=> {
            wholeData += data;
        });

        request.on('end', ()=>{
            let json = wholeData.toString();
            const bp = require('./bp');
            bp.process(JSON.parse(json));
        })

        response.writeHead(200);
        response.end();
    }
    else {
        var letter = parsedURL.query.letter;
        var onlyOneWord = parsedURL.query.OnlyOneWord;
        var imgSearchTerm = parsedURL.query.GetImageFor;

        if(letter != "" && letter != undefined){
        response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin":"http://localhost:4200"});    
            const letterFunction = require('./letter');
            letterFunction.process(letter, onlyOneWord != 'true', response);
        }
        else if(imgSearchTerm != "" && imgSearchTerm != undefined){
        response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin":"http://localhost:4200"});    
            const imageFunction = require('./image');
            imageFunction.process(imgSearchTerm, response);
        }
        else {
            //Serve the app
            let path = process.env.relpath + request.url;
            const fs = require('fs');
            if(!fs.existsSync(path) || fs.lstatSync(path).isDirectory())
            {
                path = process.env.relpath + "/dist/index.html";
            }
            response.write(fs.readFileSync(path));
            response.end();
        }
    }
}
catch(err){
    response.write(err.toString());
    response.end();
}
});
log += buildLog('created server');

var port = process.env.PORT || 1337;
server.listen(port);
log += buildLog('listening');

console.log("Server running at http://localhost:%d", port);
console.log(log);
if(process.env.sendkey != undefined) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.sendkey);
    const msg = {
        to: process.env.email,
        from: process.env.email,
        subject: 'Server starting up',
        text: log,
    };
    sgMail.send(msg);
}

function buildLog(log) {
    return new Date().toJSON() + ' ' + log + '\n';
}