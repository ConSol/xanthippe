const xant_assert = require('./assertions.js');
const xant_expect = require('./expect.js');

function testcase(description, callback){
    console.log('Running test: ' + description);
    try {
        callback();
    } catch (e){
        console.error("... test failed!");
        throw e;
    }
    console.log("... test succeeded");
}

module.exports = {
    assertEquals: xant_assert.assertEquals,
    assertTrue: xant_assert.assertTrue,
    testcase,
    it: testcase,
    expect: xant_expect.expect
};