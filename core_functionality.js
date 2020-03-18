
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
    let ergebnis = fn(); // Boolean
    //let ret = performIO(description, ergebnis );
    let ret = ergebnis;
    if(!ret){
        console.error("...Assertion failed!");
    } else {
        console.log("... Assertion passed.");
    }
    return ergebnis;
}

// Tests if the two numbers: number1 and number2 are equal.
function assertIntEquals( description, number1, number2 ){
    let ergebnis = number1 === number2;
    return performIO( description, ergebnis );
}

module.exports = {
    performIO,
    assertTrue,
    assertIntEquals
};