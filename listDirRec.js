const fs = require('fs');
const { join } = require("path");

//function for listing directory recursively
function listDirRec(path) {
    console.log(path)
    let paths = [];
    let directoryContent = fs.readdirSync(path);
    directoryContent.forEach((element) => {
        const stat = fs.statSync(join(path, element));
        if (!stat.isDirectory()) {
            paths.push(join(path, element));
        }
        else {
            paths = [...paths, ...listDirRec(join(path, element))];
        }
    });
    return paths;
}

exports.listDirRec = listDirRec;
