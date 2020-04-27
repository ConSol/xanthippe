const fs = require('fs');
const path = require('path');
const os = require('os');

function directory(dirname, callback, workingDirectory) {
    if (dirname === '') {
        throw "Name of directory must not be empty!";
    }

    if(workingDirectory === undefined ){
            workingDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'xanthippe'));
    } else {
        if (workingDirectory.split(path.sep).find((elem) => {
            return elem.match(/^xanthippe\w{6}$/);
        }) === undefined ) {
            throw "WorkingDirectory not in a xanthippe directory";
        }
    }

    let currentDir = path.join(workingDirectory, dirname);
    try {
        fs.statSync(currentDir);
    } catch (e) {
        fs.mkdirSync(currentDir);
    }

    callback(currentDir);
    
    const ret = {
        dir: currentDir,
        deleteTree: () => {
            fs.rmdirSync(ret.getRoot(), { recursive: true });
        },
        getRoot: () => {
            return path.join(os.tmpdir(), currentDir.split(path.sep).find((elem) => {
                return elem.match(/^xanthippe\w{6}$/);
            }));
        }
    };
    return ret;
}

function file(filename, text = 'hallo', workingDirectory) {
    let filepath = path.join(workingDirectory, filename);
    try {
        let snc = fs.statSync(filepath);
        console.error(`cannot create file: object with name ${filename} already exists in ${workingDirectory}`);
    } catch (e) {
        fs.writeFileSync(filepath, text);
        console.log('create file: ' + path.join(workingDirectory, filename));
    }

}

function cleanAll() {
    const tmpDirContents = fs.readdirSync(os.tmpdir());
    tmpDirContents.filter((cpath) => {
        if (fs.statSync(os.tmpdir(), cpath).isDirectory() && cpath.match(/^xanthippe\w{6}$/)) {
            return true;
        } else {
            return false;
        }
    }).forEach((elem) => {
        fs.rmdirSync(path.join(os.tmpdir(), elem), { recursive: true });
    });
}

module.exports = {
    directory,
    file,
    cleanAll
}
