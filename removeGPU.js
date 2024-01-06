const fs = require('fs');

// open up index.js
fs.readFile('./index.js', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        // split data into lines
        var lines = data.split('\n');
        // remove line 38
        lines = lines.filter((line) => {
            return line.match(/require\("gpu.js"\)/g) == null;
        });
        // join lines back together
        const updatedData = lines.join('\n');
        // write updated data to index.js
        fs.writeFile('./index.js', updatedData, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Successfully removed GPU!');
            }
        });
    }
});