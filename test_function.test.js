const testFunction = require('./test_function.js');

test("Sample test: Hello World!", () => {
    expect(testFunction("2 + 2 = 4", 2 + 2 === 4)).toBe(true);
});

