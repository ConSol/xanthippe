const xant_assert = require('./assertions.js');
const chalk = require('chalk');
const file_hierarchy = require("file_hierarchy");

function testcase(description, callback){
    console.log('Running test: ' + description);
    try {
        callback();
    } catch (e){
        console.error(chalk.red.inverse.bold("... test failed!"));
        throw e;
    }
    console.log(chalk.green.inverse.bold("... test succeeded"));
}

module.exports = {
    assertEquals: xant_assert.assertEquals,
    assertTrue: xant_assert.assertTrue,
    testcase,
    it: testcase,
    directory: file_hierarchy.directory,
    file: file_hierarchy.file
};