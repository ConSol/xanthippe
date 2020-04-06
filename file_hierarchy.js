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
        console.log(`cannot create file: object with name ${filename} already exists in ${this.workingDirectory}`);
    } catch (e) {
        fs.writeFileSync(filepath, text);
        console.log('create file: ' + path.join(this.workingDirectory, filename));
    }

}


mkdir('hello', () => {
    mkdir('hello2', () => {
        touch('hallo.txt');
    });
    mkdir('hello3', () => {
        touch('hallo.txt');
        touch('hallo2.txt');
        touch('hallo2.txt');
    });
    mkdir('hello3', () => {
        touch('halloolal');
        touch('hallo2.txt');
    });
    touch('hello3');
});

mkdir('helo', () => {
    mkdir('helo2', () => {
        touch('helo.js');
    });
});
