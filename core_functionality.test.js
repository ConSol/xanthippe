const xant = require('./core_functionality.js');


console.log = jest.fn();
console.error = jest.fn();
//console.log = jest.spyOn(console, 'log');

beforeEach(() => {
    jest.resetAllMocks();
});


describe('xant.testcase: ', () => {

    it('should correctly assert the equality of 1 and 1.', () => {
        // GIVEN
        const testFunction = jest.fn();

        // WHEN
        const SUT = () => xant.testcase('1 should equal 1', testFunction);

        // THEN
        expect(SUT).not.toThrow();
        expect(testFunction).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Running test: 1 should equal 1"));
        expect(console.log).toHaveBeenLastCalledWith(expect.stringContaining("... test succeeded"));
        expect(console.log).toHaveBeenCalledTimes(2);
    });



    it('should correctly fail the assertion, that 1 and 2 are equal.', () => {
        // GIVEN
        const testFunction = () => {
            xant.assertEquals(1, 2);
        }

        // WHEN
        const SUT = () => {
            xant.testcase('1 should not equal 2', testFunction);
        }

        // THEN
        expect(SUT).toThrow();
        expect(console.log).toHaveBeenCalledWith("Running test: 1 should not equal 2");
        expect(console.error).toHaveBeenLastCalledWith(expect.stringContaining("... test failed!"));
    });


    it('nested tests.', () => {
        // GIVEN
        const testFunction1 = () => {
            xant.assertEquals(1, 1);
        }
        const testFunction2 = () => {
            xant.assertEquals(2, 2);
        }

        // WHEN
        const SUT = () => {
            xant.testcase('Numbers should be equal.', () => {
                xant.testcase('1 should equal 1', testFunction1);
                xant.testcase('2 should equal 2', testFunction2);
            });
        }

        // THEN
        expect(SUT).not.toThrow();
        expect(console.log).toHaveBeenCalledWith("Running test: Numbers should be equal.");
        expect(console.log).toHaveBeenCalledWith("Running test: 1 should equal 1");
        expect(console.log).toHaveBeenLastCalledWith(expect.stringContaining("... test succeeded"));
        expect(console.log).toHaveBeenCalledWith("Running test: 2 should equal 2");
        expect(console.log).toHaveBeenLastCalledWith(expect.stringContaining("... test succeeded"));
        expect(console.log).toHaveBeenLastCalledWith(expect.stringContaining("... test succeeded"));
        expect(console.log).toHaveBeenCalledTimes(6);
    })

});
