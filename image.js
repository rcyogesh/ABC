const fs = require('fs');
var https = require('https');
const util = require('util');

function handleGoogleResponse(searchTerm, gres, response) {
        var wholeData = '';
        gres.on('data', (data)=> {
            wholeData += data;
        });


        gres.on('end', ()=>{
            let json = wholeData.toString();
            let obj = JSON.parse(json);
            let arr = [];
            try {
                obj.items.forEach(i=>i.pagemap.cse_thumbnail.forEach(t=>arr.push(t.src)));
                cache[searchTerm] = arr;
            } catch (err){
                console.log(err.toString());
            }
            returnResponse(arr, response);
        })
}

let cache = {};

function returnResponse(arr, response) {
    try {
        let index = Date.now() % arr.length;
        response.write(JSON.stringify(arr[index]));
    }
    catch(err) {
        console.log(err);
    }
    response.end();
}

module.exports = {
    process: function(term, response) {
        let arr = cache[term];
        if(arr == undefined) {
            console.log("Will query");
            let url = util.format("https://www.googleapis.com/customsearch/v1?key=%s&cx=%s&q=%s",
                 process.env.googlekey, process.env.googlecx, term);
            https.get(url, gres => handleGoogleResponse(term, gres, response));
        }
        else {
            returnResponse(arr, response);
        }
    }
}