const fs = require('fs');
const { join } = require("path");

//function for listing directory recursively
function listDir(path, recurse = false) {
    console.log(path)
    let paths = [];
    let directoryContent = fs.readdirSync(path);
    directoryContent.forEach((element) => {
        const stat = fs.statSync(join(path, element));
        if (!stat.isDirectory()) {
            paths.push(join(path, element));
        }
        else {
            if(recurse){
                paths = [...paths, ...listDir(join(path, element))];
            }
        }
    });
    return paths;
}

exports.listDir = listDir;
