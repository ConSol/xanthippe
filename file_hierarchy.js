const fs = require('fs');
const path = require('path');
const os = require('os');

const layout = {
    
    'directory1' : {
        'directory2' : {
            'file3' : 'content'
        },

        'file2' : 'content'
    },

    'file1' : 'content'
}


function filestructure(layout, workingDirectory){
    let dirdir;
    

    if(workingDirectory === undefined ){
        workingDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'xanthippe'));
    } 


    for(let [key,value] of Object.entries(layout)){
        console.log('key: ' + key);
        console.log('value: ' + value);
        if(typeof value === 'object'){
            dirdir = directory(key, (wd) => {
                console.log("created dir");
                console.log('currentDir: ' + wd);
                filestructure(value, wd);
        }, workingDirectory);
        } else if(typeof value === 'string') {
            console.log('key: ' + key);
            console.log('value: ' + value);
            dirdir = file(key,value,workingDirectory);
        }
   
    }

    return dirdir;
    
}


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

    if(workingDirectory === undefined ){
        workingDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'xanthippe'));
    }

    let filepath = path.join(workingDirectory, filename);
    try {
        let snc = fs.statSync(filepath);
        console.error(`cannot create file: object with name ${filename} already exists in ${workingDirectory}`);
    } catch (e) {
        fs.writeFileSync(filepath, text);
        console.log('create file: ' + path.join(workingDirectory, filename));
    }

    const ret = {
        dir: workingDirectory,
        deleteTree: () => {
            fs.rmdirSync(ret.getRoot(), { recursive: true });
        },
        getRoot: () => {
            return path.join(os.tmpdir(), workingDirectory.split(path.sep).find((elem) => {
                return elem.match(/^xanthippe\w{6}$/);
            }));
        }
    };
    return ret;

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
    cleanAll,
    filestructure
}


filestructure(layout)