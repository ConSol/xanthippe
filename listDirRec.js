const fs = require('fs');
const { join } = require("path");

//function for listing directory recursively
function listDirRec(path) {
    let paths = [];
    let directoryContent = fs.readdirSync(path);
    directoryContent.forEach((element) => {
        const stat = fs.statSync(path + "/" + element);
        if (!stat.isDirectory()) {
            paths.push(join(path, element));
        }
        else {
            paths = [...paths, ...listDirRec(join(path, element))];
        }
    });
    console.log(paths)
    return paths;
}

exports.listDirRec = listDirRec;
