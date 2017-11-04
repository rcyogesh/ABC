const fs = require('fs');

let words = [];
function loadWords(data) {
    words = data.split("\n");
    for (var index = 0; index < words.length; index++) {
        words[index] = words[index].trim();
    }
}

if(process.env.production == 1) {
    fs.readFile("textDB.txt", 'utf8', (d,e)=>loadWords(e));
} else {
    loadWords(fs.readFileSync("textDB.txt", 'utf8'));
}

function getSubset(letter) {
    var subset = [];
    words.forEach(function(element) {
        if(element.startsWith(letter)) {
            subset.push(element);
        }
    }, this);
    return subset;
}

module.exports = {
    process: function(letter, mode, response) {
        
        var subset = getSubset(letter);
        
        if(mode) {
            var json = JSON.stringify(subset);
            console.log(json);
            response.write(json);
        }
        else {
            let index = Date.now() % subset.length;
            console.log(subset[index]);
            response.write(JSON.stringify(subset[index]));
        }
        response.end();
    }
}