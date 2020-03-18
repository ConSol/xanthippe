
// performIO( description::String, passed:Boolean) => Boolean
function performIO(description,isPassed){
    console.log(`test description: ${description}`);
    if(isPassed === true){
        console.info(`Truthy: ${description} is true`);
        return true;
    } else {
       console.error(`Falsy: ${description} is false`);
       return false;
    }
}

// assertTrue( description::String, (function() => Boolean) ) => Boolean
// Tests if function fn returns true or not.
function assertTrue(description, fn ){
    console.log("assertTrue: " + description);
    if( fn.name === undefined){
        console.log("Asserting if anonymous function returns true");
    } else {
        console.log(`Asserting if function ${fn.name} returns true.`);
    }
     // Boolean
    //let ret = performIO(description, ergebnis );
    let ret = fn();
    if(!ret){
        console.error("...Assertion failed!");
    } else {
        console.log("... Assertion passed.");
    }
    return ret;
}

// Tests if the two numbers: number1 and number2 are equal.
function assertIntEquals( description, number1, number2 ){
    console.log("assertIntEquals: " + description);
    let ret = number1 === number2;
    //return performIO( description, ergebnis );
    if(!ret){
        console.error("...Assertion failed: " + number1 + " does not equal " + number2);
    } else {
        console.log("... Assertion passed.");
    }
    return ret;
}
// TODO:
//  - naive values
//  - nested objects
function assertEquals(value1, value2) {
    if (typeof (value1) === 'object' && typeof (value2) === 'object') {

        if (Object.keys(value1).length !== Object.keys(value2).length) {
            throw "test failed";
        }

        for (let [key, value] of Object.entries(value1)) {
            if (value2[key] === undefined) {
                console.error("... Assertion failed: " + value2[key].toString() + " does not equal " + value.toString());
                throw "test failed";
            } else {
                if (!assertEquals(value2[key], value)) {
                    console.error("... Assertion failed: " + value2[key].toString() + " does not equal " + value.toString());
                    throw "test failed";
                    //return false;
                }
            }
        }

        console.log("... Assertion passed");
        return true;

    } else {
        if ( value1 === value2 ){
            console.log("... Assertion passed");
            return true;
        } else {
            throw "test failed";
        }
        //return value1 === vale2;
    }
}

module.exports = {
    performIO,
    assertTrue,
    assertIntEquals,
    assertEquals
};