const fs = require('fs');

const order = ['/deps/matter.js','/deps/gpu.js','/index.js'];

const comments = [`/* This is the full build for anvil.js, including lighting and physics engines All liscened under MIT. */ \n// Path: matter.js`,'// Path: gpu.js','// Path: anvil.js'];


const requireExp = /require\(['"].+["']\)/g;
const build = order.map((path) => {
    // read path
    let data = fs.readFileSync(__dirname + path, 'utf8');
    if(path == '/index.js') {
        // strip require statements
        var lines = data.split('\n');

        lines = lines.filter((line) => {
            return (line.match(/require\(['"].+["']\)/g) == null) && (line.match(/module.exports/g) == null) && line.match(/export {[\t\n\r\w\d\s,]+}/g) == null && line.match(/export/g) == null;
        });
        // const ANVIL = (() => {
        lines.splice(0, 0, 'const ANVIL = (() => {');
        lines.push('return ANVIL;');
        lines.push('})();')
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