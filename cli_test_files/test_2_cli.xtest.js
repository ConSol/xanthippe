const obj1 = {
    var1: 1,
    var2: 2
}

const obj2 = {
    var1: 1,
    var2: 2
}

beforeEach(() => console.log("I wanna be called before each testcase"));
afterEach(() => console.log("I wanna be called after each testcase"));

testcase('1 should be 1', () => {
    assertEquals(obj1,obj2);
});

testcase('1 should be 1', () => {
    assertEquals(obj1,obj2);
});

testcase('1 should be 1', () => {
    assertEquals(obj1,obj2);
});
