const xant = require('./core_functionality.js');

// test("Sample test: Hello World!", () => {
//     expect(testFunction("2 + 2 = 4", 2 + 2 === 4)).toBe(true);
// });

//console.log = jest.fn();
console.log = jest.spyOn(console, 'log');

beforeEach(() => {
    jest.resetAllMocks();
});


describe('xant.testcase: ', () => {

    it('should correctly assert the equality of 1 and 1.', () => {
        // GIVEN
        const testFunction = () => {
            xant.assertEquals(1, 1);
        };

        // WHEN
        const SUT = () => xant.testcase('1 should equal 1', testFunction);

        // THEN
        expect(SUT).not.toThrow();
        expect(console.log).toHaveBeenCalledWith("Running test: 1 should equal 1");
        expect(console.log).toHaveBeenLastCalledWith("... test succeeded");
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
        expect(console.log.mock.calls[0][0]).toBe("Running test: 1 should not equal 2");
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
    })

});
