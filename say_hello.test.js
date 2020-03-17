const sayHelloFunction = require('./say_hello.js');

test("Sample test: Hello World!", () => {
    expect(sayHelloFunction()).toBe("Hello World!");
});

