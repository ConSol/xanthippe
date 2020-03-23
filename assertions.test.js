const xant = require('./core_functionality.js');

console.log = jest.fn();

describe('Testing assertions', () => {

    it('assertTrue should return true if given function returns true.', () => {
        // GIVEN
        const myfn = function () {
            return false;
        }

        // WHEN
        const SUT = () => xant.assertTrue('should be true', myfn);

        // THEN
        expect(SUT).toThrow();
        expect(console.log).toHaveBeenCalledWith('should be true');
    });

    describe('Testing assertEquals function.', () => {

        it('Comparing two naive string values', () => {
            // GIVEN


            // WHEN
            const SUT = () => xant.assertEquals('hallo', 'hallo');

            // THEN
            expect(SUT()).toBeUndefined();
        });

        it('Comparing two naive integers.', () => {
            // GIVEN

            // WHEN
            const SUT = () => xant.assertEquals(1, 1);

            // THEN
            expect(SUT()).toBeUndefined();
        });

        it('Comparing two naive integers, should fail', () => {
            // GIVEN
            let variable2 = 3;

            // WHEN
            const SUT = () => xant.assertEquals(1, variable2);
            
            // THEN
            expect(SUT).toThrow();
        });

        it('Comparing flat object.', () => {
            // GIVEN
            let object2 = { val1: 1, val2: 2 };

            // WHEN
            const SUT = () => xant.assertEquals({ val1: 1, val2: 2 }, object2);

            // THEN
            expect(SUT()).toBeUndefined();
        });

        it('Comparing nested object', () => {
            // GIVEN
            const obj1 =  {val1: 1, val2: { val: 1 }};
            const obj2 =  { val1: 1, val2: { val: 1 }};

            // WHEN
            const SUT = () => xant.assertEquals(obj1,obj2);

            // THEN

            expect(SUT()).toBeUndefined();
        });

        it('Comparing nested object', () => {
            // GIVEN
            const obj1 = { val1: 1, val2: { val: 1 } };
            const obj2 = { val1: 1, val2: { val: 2 } };

            // WHEN
            const SUT = () => xant.assertEquals(obj1,obj2);

            // THEN
            expect(SUT).toThrow();
        });
    });
});