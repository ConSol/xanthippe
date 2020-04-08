#! /usr/bin/env node

const { listDir } = require("./listDir");
const { runFiles, filterTestfiles, filterDirectories } = require('./testrunner');

//Arguments
let [, , ...args] = process.argv;

//Log
console.log("Xanthippe starting...");
console.log(`Test scripts: `);

//Checking for recursion flag.
const recursiveFlag = "--recursive";
const isRecursive = args.includes(recursiveFlag);
const inputPaths = args.filter(elem => elem !== recursiveFlag);

//If no path provided add current path as default.
if (inputPaths.length === 0) {
    inputPaths.push(process.cwd());
}

//Getting all files listed in specified directories as well as other files.
const inputFilesAndDirectories = inputPaths.reduce((akk, elem) => akk.concat(listDir((elem), isRecursive)), []);

//running xanthippe on testfiles
runFiles(
    //Filtering for testfile candidates
    filterTestfiles(
        //Filtering directories from inputFilesAndDirectories
        filterDirectories(
            inputFilesAndDirectories
        )
    )
);