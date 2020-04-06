const fs = require('fs');
const path = require('path');
const os = require('os');

function mkdir(dirname, callback) {
    let oldpwd = this.PWD;
    if (this.PWD === undefined) {
        //let basepath = path.join(os.tmpdir(), 'xanthippe');
        let tempdir = fs.mkdtempSync(path.join(os.tmpdir(), 'xanthippe'));
        //let tempdir = fs.mkdirSync(path.join(os.tmpdir(), 'xanthippe'));
        console.log(tempdir);
        fs.mkdirSync(path.join(tempdir, dirname));
        this.PWD = path.join(tempdir, dirname);
        console.log(this.PWD);
    } else {
        this.PWD = path.join(this.PWD, dirname);
    }
    console.log(this.PWD);
    try {
        let snc = fs.statSync(this.PWD);
        if (!snc.isDirectory(this.PWD)) {
            /// create directory this.PWD
            fs.mkdirSync(this.PWD);
            //console.log('create direcotry: ' + this.PWD);
        }
    } catch (e) {
        fs.mkdirSync(this.PWD);
    }

    callback();
    const ret = this.PWD;
    this.PWD = oldpwd;
    return ret;
}

function touch(filename, text = 'hallo') {
    let filepath = path.join(this.PWD, filename);
    try {
        let snc = fs.statSync(filepath);
        console.log(`cannot create file: object with name ${filename} already exists in ${this.PWD}`);
        // if (!fs.statSync(filepath).isFile()) {
        //     fs.writeFileSync(filepath, text);
        //     console.log('create file: ' + path.join(this.PWD, filename));
        
    } catch (e) {
        fs.writeFileSync(filepath, text);
        console.log('create file: ' + path.join(this.PWD, filename));
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
