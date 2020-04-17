const xant_assert = require('./assertions.js');
const xant_expect = require('./expect.js');
const chalk = require('chalk');

//Global variables
let beforeEachFunction;
let afterEachFunction;

function testcase(description, callback) {
    console.log('Running test: ' + description);
    try {
        if (beforeEachFunction !== undefined) {
            beforeEachFunction();
        }
        callback();

    } catch (e) {
        console.error(chalk.red.inverse.bold("... test failed!"));
        throw e;
    }
    console.log(chalk.green.inverse.bold("... test succeeded"));
    if (afterEachFunction !== undefined) {
        afterEachFunction();
    }
}

function beforeEach(callback) {
    beforeEachFunction = callback;
}

function afterEach(callback) {
    afterEachFunction = callback;
}



module.exports = {
    assertEquals: xant_assert.assertEquals,
    assertTrue: xant_assert.assertTrue,
    testcase,
    it: testcase,
    expect: xant_expect.expect,
    beforeEach,
    afterEach
};