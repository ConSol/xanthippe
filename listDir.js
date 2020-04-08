const fs = require('fs');
const { join } = require("path");

//function for listing directory recursively
function listDir(path, recurse = false) {
    if( fs.statSync(path).isDirectory() ){
        return fs.readdirSync(path).map(elem => {
            if (recurse){
                return listDir(join(path,elem),true);
            } else {
                if ( !fs.statSync(join(path,elem)).isDirectory() ){
                    return [join(path,elem)];
                }
            }
        }).reduce((akk, elem) => akk.concat(elem), [])
          .filter(elem => elem !== undefined);
    } else {
        return [path];
    }
}

exports.listDir = listDir;
