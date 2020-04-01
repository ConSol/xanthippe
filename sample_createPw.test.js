const sampleFunction = require('./sample_createPw.js');

describe('Test password generation', () => {

    it("Sample test: Did your password got created?", () => {
        expect(sampleFunction(7)).toBe(true);
    });

    it("Sample test: Did your password not get created?", () => {
        expect(sampleFunction(-1)).toBe(false);
    });

});

