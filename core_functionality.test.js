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

});