const fs = require('fs');
const { join } = require("path");

//function for listing directory recursively
function listDir(path, recurse = false) {
    if (!fs.statSync(path).isDirectory()) {
        return [path];
    }

    // if (recurse){
    //     return fs.readdirSync(path).map(elem => listDir(join(path,elem), recurse));
    // } else {
    //     return fs.readdirSync(path).map(elem => {
    //         if (!fs.statSync(join(path, elem)).isDirectory()) {
    //                         return [join(path, elem)];
    //                     } else {
    //                         return [];
    //                     }
    //     });
    // }

    return fs.readdirSync(path).map(elem => {
        const pathAbsolute = join(path,elem);
        if (recurse) {
            return listDir(pathAbsolute, recurse);
        } else {
            return [pathAbsolute];
            // if (!fs.statSync(pathAbsolute).isDirectory()) {
            //     return listDir(pathAbsolute, recurse);
            //     // return [pathAbsolute];
            // } else {
            //     return [];
            // }
        }
    }).reduce((akk, elem) => akk.concat(elem), []);
}

exports.listDir = listDir;
