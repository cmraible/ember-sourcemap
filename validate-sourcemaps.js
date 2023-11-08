const validate = require('sourcemap-validator');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const assets = fs.readdirSync('./dist/assets/');

const jsFiles = assets.filter((file) => {
    return file.match(/\.js$/);
});

jsFiles.forEach((file) => {
    // get the base filename without the distinction and locate the associated sourcemap
    const baseName = file.replace(/\.js$/, '');
    const mapFile = `${baseName}.map`;
    const mapPath = path.join('./dist/assets/', mapFile);
    const codePath = path.join('./dist/assets/', file);
    console.log(`Reading code from ${codePath}`);
    const code = fs.readFileSync(codePath, 'utf8');
    console.log(`Reading sourcemap from ${mapPath}`);
    const map = fs.readFileSync(mapPath, 'utf8');
    console.log(`Validating sourcemap for ${file}`);
    try {
        validate(code, map);
    } catch (error) {
        console.log(error.message);
    }
});

// const mapPath = '/Users/chris/Developer/Ghost/ghost/admin/dist/assets/chunk.143.87ad9dcdfd1094b88180.js-a382d7e32d1ece658c900e9cf4069f87.map';
// const codePath = '/Users/chris/Developer/Ghost/ghost/admin/dist/assets/chunk.143.87ad9dcdfd1094b88180.js-a382d7e32d1ece658c900e9cf4069f87.map';
// console.log(`Reading code from ${codePath}`);
// const code = fs.readFileSync(codePath, 'utf8');
// console.log(`Reading sourcemap from ${mapPath}`);
// const map = fs.readFileSync(mapPath, 'utf8');
// // console.log(`Validating sourcemap for ${file}`);
// assert.doesNotThrow(() => {
//     validate(code, map);
// }, `Sourcemap validation failed.`);

// const main = async () => {
//     const fs = require('fs');
//     const path = require('path');
//     const sourceMap = require('source-map');
    
//     // Path to file that is generated by your build tool (webpack, tsc, ...)
//     var GENERATED_FILE = '/Users/chris/Developer/Ghost/ghost/admin/dist/assets/chunk.143.e892c1206ceadeb641d9.map';
    
//     // Line and column located in your generated file (for example, the source
//     // of the error from your minified file)
//     var GENERATED_LINE_AND_COLUMN = { line: 1, column: 1000 };
    
//     var rawSourceMap = fs.readFileSync(GENERATED_FILE).toString();
//     const consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);
// }

// main();

