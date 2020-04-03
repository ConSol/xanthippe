const vm = require('vm');
const xant = require('./core_functionality.js');
const fs = require('fs');
const chalk = require('chalk');


function filterTestfiles(files) {
    const filteredfiles = [];
    files.forEach((filename, index) => {
        if (filename.includes(".xtest.js")) {
            filteredfiles.push(filename);
            console.log(` ${index}: ${filename}`);
        }
        else {
            console.log(`${filename} not a testing file`)

        }
    });
    return filteredfiles;
}

function runFiles(lastfiles) {
    lastfiles.forEach(filepath => {
        console.log('Running testsuite: ' + filepath);
        const code = fs.readFileSync(filepath, 'utf-8');
        const context = { ...{ console: console, require: require }, ...xant };
        vm.createContext(context);
        try {
            vm.runInContext(code, context);
            console.log(chalk.green('... Testsuite passed correctly.'));
        } catch (e) {
            console.error(chalk.magenta(e.stack));
        }
    });
}

module.exports = {
    filterTestfiles,
    runFiles
}