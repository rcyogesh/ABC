var http = require('http');
const url = require('url');
const util = require('util');
const letterFunction = require('./letter');
const bp = require('./bp');
const qs = require('querystring');
const fs = require('fs');
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

console.log(process.env.email);

// sgMail.setApiKey(process.env.sendkey);
// const msg = {
//   to: process.env.email,
//   from: process.env.email,
//   subject: 'Server starting up',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

var server = http.createServer(function(request, response) {
    try {
        const parsedURL = url.parse(request.url, true);
        
    if(request.method=="POST") {
        var wholeData = '';
        request.on('data', (data)=> {
            wholeData += data;
        });

        request.on('end', ()=>{
            let json = wholeData.toString();
            bp.process(JSON.parse(json));
        })

        response.writeHead(200);
        response.end();
    }
    else {
        var letter = parsedURL.query.letter;

        if(letter != "" && letter != undefined){
        response.writeHead(200, {"Content-Type": "application/json", "Access-Control-Allow-Origin":"http://localhost:4200"});    
            letterFunction.process(letter, response);
        }
        else {
            //Serve the app
            let path = process.env.relpath + request.url;
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

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);