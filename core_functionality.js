
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
    let ergebnis = fn(); // Boolean
    return performIO(description, ergebnis );
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