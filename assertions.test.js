const xant = require('./core_functionality.js');

describe('Testing assertions', () => {

    it('assertTrue should return true if given function returns true.', () => {
        const myfn = function () {
            return false;
        }
        expect(() => xant.assertTrue('should be true', myfn)).toThrow();
    });


    describe('Testing assertEquals function.', () => {

        it('Comparing two naive string values', () => {
            expect(xant.assertEquals('hallo', 'hallo')).toBeUndefined();
        });

        it('Comparing two naive integers.', () => {
            expect(xant.assertEquals(1, 1)).toBeUndefined();
        });

        it('Comparing two naive integers, should fail', () => {
            let variable2 = 3;
            expect(() => xant.assertEquals(1, variable2)).toThrow();
        });

        it('Comparing flat object.', () => {
            let object2 = { val1: 1, val2: 2 };
            expect(xant.assertEquals({ val1: 1, val2: 2 }, object2)).toBeUndefined();
        });

        it('Comparing nested object', () => {
            expect(xant.assertEquals({ val1: 1, val2: { val: 1 } }, { val1: 1, val2: { val: 1 } })).toBeUndefined();
        });

        it('Comparing nested object', () => {
            expect(() => xant.assertEquals({ val1: 1, val2: { val: 1 } }, { val1: 1, val2: { val: 2 } })).toThrow();
        });
    });
});