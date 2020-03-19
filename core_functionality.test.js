const xant = require('./core_functionality.js');

// test("Sample test: Hello World!", () => {
//     expect(testFunction("2 + 2 = 4", 2 + 2 === 4)).toBe(true);
// });

describe('Testing core functionality of xanthippe', () => {

    it('assertTrue should return true if given function returns true.', () => {
        const myfn = function(){
            return false;
        }
        expect(() => xant.assertTrue('should be true', myfn)).toThrow();
    });

    describe('Testing assertEquals function.', () => {

        it('Comparing two naive string values', () => {
            expect(xant.assertEquals('hallo','hallo')).toBeUndefined();
        });

        it('Comparing two naive integers.', () => {
            expect(xant.assertEquals(1,1)).toBeUndefined();
        });

        it('Comparing two naive integers, should fail', () => {
            let variable2 = 3;
            expect(() => xant.assertEquals(1,variable2)).toThrow();
        });

        it('Comparing flat object.', () => {
            let object2 = {val1: 1, val2: 2};
            expect(xant.assertEquals({val1: 1, val2: 2}, object2)).toBeUndefined();
        });

        it('Comparing nested object', () => {
            expect(xant.assertEquals({val1: 1, val2: {val: 1}},{ val1: 1, val2: {val: 1}})).toBeUndefined();
        });

        it('Comparing nested object', () => {
            expect(() => xant.assertEquals({val1: 1, val2: {val: 1}},{ val1: 1, val2: {val: 2}})).toThrow();
        });
    });

    describe('xant.testcase: ', () => {

        it('should correctly assert the equality of 1 and 1.', () => {
            // GIVEN
            const testFunction = () => {
                xant.assertEquals(1,1);
            };

            // WHEN
            const SUT = () => xant.testcase('1 should equal 1', testFunction);

            // THEN
            expect(SUT).not.toThrow();
        });

        it('should correctly fail the assertion, that 1 and 2 are equal.', () => {
            // GIVEN
            const testFunction = () => {
                xant.assertEquals(1,2);
            }

            // WHEN
            const SUT = () => {
                xant.testcase('1 should not equal 2', testFunction);
            }

            // THEN
            expect(SUT).toThrow();
        });

        it('nested tests.', () => {
            // GIVEN
            const testFunction1 = () => {
                xant.assertEquals(1,1);
            }
            const testFunction2 = () => {
                xant.assertEquals(2,2);
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

});