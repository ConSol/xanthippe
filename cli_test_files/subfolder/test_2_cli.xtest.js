const obj1 = {
    var1: 1,
    var2: 2
}

const obj2 = {
    var1: 1,
    var2: 2
}

testcase('1 should be 1', () => {
    assertEquals(obj1,obj2);
});