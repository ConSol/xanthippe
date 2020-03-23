#! /usr/bin/env node

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
