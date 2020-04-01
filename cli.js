#! /usr/bin/env node

const { listDirRec } = require("./listDirRec");

const vm = require('vm');
const xant = require('./core_functionality.js');
const fs = require('fs');
const chalk = require('chalk');

const context = {};
//Arguments
const [, , ...args] = process.argv;
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
        args.push(listDirRec(args));
    }
})}


//Checking if directory or file and filtering testing files
args.forEach(element => {
    try {
        const stat = fs.statSync(element);
        if (stat.isDirectory()) {
            const files = fs.readdirSync(element);
            files.forEach(filename => {
                if(filename.includes(".xtest.js")){
                index++;
                testfiles.push(element + "/" + filename);
                console.log(` ${index}: ${filename}`);}
                else{
                    console.log(`${filename} not a testing file`)
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
})

//Execute xanthippe on testfiles
testfiles.forEach(filepath => {
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
