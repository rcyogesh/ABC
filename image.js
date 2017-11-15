const fs = require('fs');
var https = require('https');
const util = require('util');

function handleGoogleResponse(gres, response) {
    //console.log(gres);
        var wholeData = '';
        gres.on('data', (data)=> {
            console.log(data);
            wholeData += data;
        });


        gres.on('end', ()=>{
            //console.log(wholeData.toString());
            let json = wholeData.toString();
            let obj = JSON.parse(json);
           // response.write(json);
           let imgUrl = obj.items[0].pagemap.cse_thumbnail[0].src;
            response.write(JSON.stringify(imgUrl));
    response.end();
        })
}

module.exports = {
    process: function(term, response) {
        let url = util.format("https://www.googleapis.com/customsearch/v1?key=%s&cx=%s&q=%s&imgSize=medium",
            process.env.googlekey, process.env.googlecx, term);
        https.get(url, gres => handleGoogleResponse(gres, response));
    }
}