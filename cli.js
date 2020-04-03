#! /usr/bin/env node

const { listDir } = require("./listDir");

const fs = require('fs');
const chalk = require('chalk');
const { join } = require('path');
const { addDefaultDir } = require('./cli_utils.js');
const { runFiles, filterTestfiles } = require('./testrunner');

//Arguments
let [, , ...args] = process.argv;
let index = 0;

//Log
console.log("Xanthippe starting...");
console.log(`Test scripts: `);

let files = [];


//Checking for --recursive, -r flag
if (args.length === 0) {
    ////
    args = addDefaultDir(args);
} else {
    args.forEach(element => {
        ////
        if (element === '--recursive') {
            const index = args.indexOf(element);
            args.splice(index, 1);
            console.log("Recursion wanted");
            if (args.length === 0) {
                args = addDefaultDir(args);
            }
            files = listDir(args[0],true);
            console.log(args);
        } else {
            ////
            args.forEach(element => {
                try {
                    const stat = fs.statSync(element);
                    if (stat.isDirectory()) {
                        const tempfiles = fs.readdirSync(join(element));
                        tempfiles.forEach((filename) => {
                            const stat2 = fs.statSync(join(element, filename));
                            if (!stat2.isDirectory()) {
                                files.push(join(element, filename));
                                index++;
                            }
                        });
                    } else {
                        //run only file
                        index++;
                        files.push(element);
                        console.log(` ${index}: ${element}`);
                    }
                } catch (e) {
                    console.error(chalk.red(`file ${element} does not exist`));
                }
            });
        }
        ////
    });
}


//Checking if directory or file and filtering testing files

//Execute xanthippe on testfiles
runFiles(filterTestfiles(files));