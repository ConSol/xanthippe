#! /usr/bin/env node

const { listDirRec } = require("./listDirRec");

const vm = require('vm');
const xant = require('./core_functionality.js');
const fs = require('fs');
const chalk = require('chalk');
const { join } = require('path');

const context = {};
//Arguments
let [, , ...args] = process.argv;
let index = 0;

//Log
console.log("Xanthippe starting...");
console.log(`Test scripts: `);

let testfiles = [];

//Checking for --recursive, -r flag
if(args.length == 0){
    args.push(process.cwd());
} else { args.forEach(element => {
    if(element === '--recursive'){
        const index = args.indexOf(element)
        args.splice(index,1);
        console.log("Recursion wanted");
        if(args.length == 0){
            args.push(process.cwd());
        } 
        testfiles = listDirRec(args[0]);
        console.log(args);
    } else {
        args.forEach(element => {
             try {
                const stat = fs.statSync(element);
                if ( stat.isDirectory() ) {
                    const files = fs.readdirSync(join( element));
                    files.forEach((filename) => {
                        const stat2 = fs.statSync(join( element, filename ));
                        if ( !stat2.isDirectory() ){
                            testfiles.push( join( element, filename ));
                            index++;
                        }
                    });
                } else {
                    //run only file
                    index++;
                    testfiles.push(element);
                    console.log(` ${index}: ${element}`);
                }
             } catch (e) {
                 console.error(chalk.red(`file ${element} does not exist`));
             }
        });
    }
})}


//Checking if directory or file and filtering testing files

// At this point we expect only file paths.
const lastfiles = [];
testfiles.forEach((filename) => {
    if(filename.includes(".xtest.js")){
    index++;
    lastfiles.push(filename);
    console.log(` ${index}: ${filename}`);}
    else{
        console.log(`${filename} not a testing file`)

    }
});

//Execute xanthippe on testfiles
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
