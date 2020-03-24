#! /usr/bin/env node

const vm = require('vm');
const xant = require('./core_functionality.js');
const fs = require('fs');

//global.xant = xant;

const context = {};
//Arguments
const [,, ... args] = process.argv;
let index = 0;

//Log
console.log("Xanthippe starting...");
console.log(`Input parameters: `);
args.forEach(element => {
    index++;
    console.log(` ${index}: ${element}`)
    
});

args.forEach(filepath => {
    console.log('Running testsuite: ' + filepath);
    const code = fs.readFileSync(filepath, 'utf-8');
    //console.log(code);
    //const script = new vm.Script(code);
    const context = {xant : xant, console: console};
    vm.createContext(context);
    vm.runInContext(code, context);
    //console.log(context);
});