
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
        console.error("...Assertion failed!");
    } else {
        console.log("... Assertion passed.");
    }
    return ret;
}

module.exports = {
    performIO,
    assertTrue,
    assertIntEquals
};