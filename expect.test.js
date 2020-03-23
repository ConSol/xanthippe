const xant = require('./core_functionality.js');

describe('xant.expect', () => {

    it('toBe', () => {
        expect(() => xant.expect(1).toBe(1)).not.toThrow();
    });

    it('not to be', () => {
        expect(() => {xant.expect(1).toBe(2)}).toThrow();
    });

    it('not to be', () => {
        expect(() => {xant.expect(1).not().toBe(2)}).not.toThrow();
    });

    it('not to be', () => {
        expect(() => {xant.expect(1).not().toBe(1)}).toThrow();
    });

    it('not not to be', () => {
        expect(() => {xant.expect(1).not().not().toBe(1)}).not.toThrow();
    });

    it('not not to be', () => {
        expect(() => {xant.expect(1).not().not().toBe(2)}).toThrow();
    });

});