const fs = require('fs');
const path = require('path');
const os = require('os');

function directory(dirname, callback) {
    let oldWorkingDirectory = this.workingDirectory;
    console.log(oldWorkingDirectory);
    let ret = "";
    if (this.workingDirectory === undefined) {
        let tempdir = fs.mkdtempSync(path.join(os.tmpdir(), 'xanthippe'));
        fs.mkdirSync(path.join(tempdir, dirname));
        this.workingDirectory = path.join(tempdir, dirname);
        ret = tempdir;
    } else {
        this.workingDirectory = path.join(this.workingDirectory, dirname);
        ret = this.workingDirectory;
    }
    console.log(this.workingDirectory);
    try {
        let snc = fs.statSync(this.workingDirectory);
        if (!snc.isDirectory(this.workingDirectory)) {
            fs.mkdirSync(this.workingDirectory);
        }
    } catch (e) {
        fs.mkdirSync(this.workingDirectory);
    }

    callback();
    this.workingDirectory = oldWorkingDirectory;
    return ret;
}

function file(filename, text = 'hallo') {
    let filepath = path.join(this.workingDirectory, filename);
    try {
        let snc = fs.statSync(filepath);
        console.error(`cannot create file: object with name ${filename} already exists in ${this.workingDirectory}`);        
    } catch (e) {
        fs.writeFileSync(filepath, text);
        console.log('create file: ' + path.join(this.workingDirectory, filename));
    }

}

function cleanAll(){
    const tmpDirContents = fs.readdirSync(os.tmpdir());
    tmpDirContents.filter((cpath) => {
       if( fs.statSync(os.tmpdir(), cpath).isDirectory() && cpath.match(/^xanthippe\w{6}$/) ){
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


/* const dirdir = directory('hello', () => {
    directory('hello2', () => {
        file('hallo.txt');
    });
    directory('hello3', () => {
        file('hallo.txt');
        file('hallo2.txt');
        file('hallo2.txt');
    });
    const somedir = directory('hello3', () => {
        file('halloolal');
        file('hallo2.txt');
    });
    file('hello3');
    console.log(somedir);
}); */
//fs.rmdirSync(dirdir, { recursive: true });
// nix mehr da

// directory('helo', () => {
//     directory('helo2', () => {
//         file('helo.js');
//     });
// });
