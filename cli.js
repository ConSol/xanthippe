#! /usr/bin/env node

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

let filepaths = [];

args.forEach(element => {
    try {
        const stat = fs.statSync(element);
        if (!stat.isDirectory()) {
            index++;
            filepaths.push(element);
            console.log(` ${index}: ${element}`);
        } else {
            console.error(chalk.red(`${element} is a directory`));
        }
    } catch (e) {
        console.error(chalk.red(`file ${element} does not exist`));
    }
});

filepaths.forEach(filepath => {
    console.log('Running testsuite: ' + filepath);
    const code = fs.readFileSync(filepath, 'utf-8');
    const context = { ...{ console: console, require: require }, ...xant };
    vm.createContext(context);
    try {
        vm.runInContext(code, context);
        console.log(chalk.green('... Testsuite passed correctly.'));
    } catch (e) {
        console.error(chalk.magenta(e.stack));
        break;
    }
});
