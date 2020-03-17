function test(description,testcase){
    console.log(`test description: ${description}`);
    if(testcase === true){
        console.info(`Truthy: ${description} is true`);
        return true;
    } else {
       console.error(`Falsy: ${description} is false`);
       return false;
    }


}

module.exports = test;