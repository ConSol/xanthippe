const assert = require('assert');

// assertTrue( description::String, (function() => Boolean) ) => Boolean
// Tests if function fn returns true or not.
function assertTrue(description, fn ){
    console.log("assertTrue: " + description);
    if( fn.name === undefined){
        console.log("Asserting if anonymous function returns true");
    } else {
        console.log(`Asserting if function ${fn.name} returns true.`);
    }
    let ret = fn();
    if(!ret){
        console.error("...Assertion failed!");
    } else {
        console.log("... Assertion passed.");
    }
    return ret;
}

function assertEquals(value1, value2) {
        assert.deepEqual(value1, value2);
}

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
    assertTrue,
    assertEquals,
    testcase,
    it: testcase
};