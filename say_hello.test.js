const sampleFunction = require('./say_hello.js');

test("Sample test: Did your password got created?", () => {
    expect(sampleFunction(7)).toBe(true);
});

