#! /usr/bin/env node

const { listDir } = require("./listDir");
const { addDefaultDir } = require('./cli_utils.js');
const { runFiles, filterTestfiles, getCanonicalPaths } = require('./testrunner');

//Arguments
let [, , ...args] = process.argv;

//Log
console.log("Xanthippe starting...");
console.log(`Test scripts: `);

let files = [];
//Checking for --recursive, -r flag
if (args.length === 0) {
    args = addDefaultDir(args);
} else {
    args.forEach(element => {
        if (element === '--recursive') {
            const index = args.indexOf(element);
            args.splice(index, 1);
            if (args.length === 0) {
                args = addDefaultDir(args);
            }
            files = listDir(args[0], true);
        } else {
            files = getCanonicalPaths(args);
        }
    });
}

//Execute xanthippe on testfiles
runFiles(filterTestfiles(files));