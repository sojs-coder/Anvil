const fs = require('fs');

const order = ['/deps/matter.js','/deps/gpu.js','/index.js'];

const comments = ['// Path: matter.js','// Path: gpu.js','// Path: anvil.js'];


const requireExp = /require\(['"].+["']\)/g;
const build = order.map((path) => {
    // read path
    let data = fs.readFileSync(__dirname + path, 'utf8');
    if(path == '/index.js') {
        // strip require statements
        var lines = data.split('\n');

        lines = lines.filter((line) => {
            return line.match(/require\(['"].+["']\)/g) == null;
        });
        data = lines.join('\n')
    }
    // add comment
    return comments[order.indexOf(path)] + '\n' + data;

});

const minified = require('uglify-js').minify(build.join('\n\n'), { annotations : true });

// create folder if not exists "build"
if (!fs.existsSync(__dirname + '/build')) {
    fs.mkdirSync(__dirname + '/build');
}

// write build to /build/anvil.js

fs.writeFileSync(__dirname + '/build/anvil.js', build.join('\n\n'), 'utf8');

// write minified to /build/anvil.min.js

// fs.writeFileSync(__dirname + '/build/anvil.min.js', minified.code, 'utf8');