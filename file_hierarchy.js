const fs = require('fs');
const path = require('path');
const os = require('os');

function directory(dirname, callback) {
    let oldWorkingDirectory = this.workingDirectory;
    console.log(oldWorkingDirectory);
    let ret = "";
    if (this.workingDirectory === undefined) {
        //let basepath = path.join(os.tmpdir(), 'xanthippe');
        let tempdir = fs.mkdtempSync(path.join(os.tmpdir(), 'xanthippe'));
        //let tempdir = fs.mkdirSync(path.join(os.tmpdir(), 'xanthippe'));
        //console.log(tempdir);
        fs.mkdirSync(path.join(tempdir, dirname));
        this.workingDirectory = path.join(tempdir, dirname);
        //console.log(this.workingDirectory);
        ret = tempdir;
    } else {
        this.workingDirectory = path.join(this.workingDirectory, dirname);
        ret = this.workingDirectory;
    }
    console.log(this.workingDirectory);
    try {
        let snc = fs.statSync(this.workingDirectory);
        if (!snc.isDirectory(this.workingDirectory)) {
            /// create directory this.workingDirectory
            fs.mkdirSync(this.workingDirectory);
            //console.log('create direcotry: ' + this.workingDirectory);
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
        // if (!fs.statSync(filepath).isFile()) {
        //     fs.writeFileSync(filepath, text);
        //     console.log('create file: ' + path.join(this.workingDirectory, filename));
        
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
