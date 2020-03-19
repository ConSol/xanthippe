const xant = require('./core_functionality.js');

// test("Sample test: Hello World!", () => {
//     expect(testFunction("2 + 2 = 4", 2 + 2 === 4)).toBe(true);
// });

describe('Testing core functionality of xanthippe', () => {

    it('performIO should simply return its input values (true).', () => {
        expect(xant.performIO('',true)).toBe(true);
    });

    it('performIO should simply return its input values (false).', () => {
        expect(xant.performIO('',false)).toBe(false);
    });

    it('assertTrue should return true if given function returns true.', () => {
        const myfn = function(){
            return false;
        }
        expect(xant.assertTrue('should be true', myfn)).toBe(false);
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

        it('testcase: should correctly assert the equality of 1 and 1.', () => {
            expect(xant.testcase('1 should equal 1',() => {
                xant.assertEquals(1,1);
            })).toBeUndefined();
        });

        it('testcase: should correctly fail the assertion, that 1 and 2 are equal.', () => {
            expect(() => {
                xant.testcase('1 should not equal 2', () => {
                    xant.assertEquals(1,2);
                })
            }).toThrow();
        });

    });

});