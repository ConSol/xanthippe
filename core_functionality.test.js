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

    it('assertIntEquals should return true', () => {
        expect(xant.assertIntEquals('...', 1234, 1234)).toBe(true);
    })

    it('assertIntEquals should return false', () => {
        expect(xant.assertIntEquals('...', 1234, 1235)).toBe(false);
    })

    describe('Testing assertEquals function.', () => {

        it('Comparing two naive string values', () => {
            expect(xant.assertEquals('hallo','hallo')).toBe(true);
        });

        it('Comparing two naive integers.', () => {
            expect(xant.assertEquals(1,1)).toBe(true);
        });

        it('Comparing two naive integers, should fail', () => {
            expect(() => xant.assertEquals(1,3)).toThrow();
        });

        it('Comparing flat object.', () => {
            expect(xant.assertEquals({val1: 1, val2: 2},{val1: 1, val2: 2})).toBe(true);
        });

        it('Comparing nested object', () => {
            expect(xant.assertEquals({val1: 1, val2: {val: 1}},{ val1: 1, val2: {val: 1}})).toBe(true);
        });

    });

});