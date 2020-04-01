const fs = require('fs');

//function for listing directory recursively
function listDirRec(path) {
    let paths = [];
    let directoryContent = fs.readdirSync(path);
    directoryContent.forEach((element) => {
        const stat = fs.statSync(path + "/" + element);
        if (!stat.isDirectory()) {
            paths.push(path + "/" + element);
        }
        else {
            paths = [...paths, ...listDirRec(path + "/" + element)];
        }
    });
    return paths;
}

exports.listDirRec = listDirRec;
