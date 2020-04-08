#! /usr/bin/env node

const { listDir } = require("./listDir");
const { runFiles, filterTestfiles } = require('./testrunner');

//Arguments
let [, , ...args] = process.argv;

//Log
console.log("Xanthippe starting...");
console.log(`Test scripts: `);

// Checking for recursion flag.
const isRecursive = args.includes("--recursive");
const inputpaths = args.filter(elem => elem !== "--recursive");

// If no path provided add current path as default.
if(inputpaths.length === 0){
    inputpaths.push(process.cwd());
}

// Getting all files listed in specified directories as well as other files.
const inputfiles = inputpaths.reduce((akk, elem) => akk.concat(listDir((elem), isRecursive)), []);

//Execute xanthippe on testfile candidates.
runFiles(filterTestfiles(inputfiles));