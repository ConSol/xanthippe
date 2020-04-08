const fs = require('fs');
const { join } = require("path");

//function for listing directory recursively
function listDir(path, recurse = false) {
    if (!fs.statSync(path).isDirectory()) {
        return [path];
    }

    return fs.readdirSync(path).map(elem => {
        const pathAbsolute = join(path, elem);
        if (recurse) {
            return listDir(pathAbsolute, recurse);
        } else {
            return [pathAbsolute];
        }
    }).reduce((akk, elem) => akk.concat(elem), []);
}

exports.listDir = listDir;
