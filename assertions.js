const assert = require('assert');

// assertTrue( description::String, (function() => Boolean) ) => Boolean
// Tests if function fn returns true or not.
const assertTrue = (description, val2) => {
    console.log(description);
    assertEquals(val2(), true);
}

function assertEquals(actual, expected) {
    assert.deepEqual(actual, expected);
}

module.exports = {
    assertEquals,
    assertTrue
};
