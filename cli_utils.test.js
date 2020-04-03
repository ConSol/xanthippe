const { addDefaultDir } = require('./cli_utils.js');

describe('addDefaultDir', () => {

    it('Should add current working directory', () => {
        // GIVEN
        const expectedOutput = [process.cwd()];
        const input = [];

        // WHEN
        const paths = addDefaultDir(input);
        
        // THEN
        expect(paths).toEqual(expectedOutput);
    });

    it('Should add current working directory', () => {
        // GIVEN
        const expectedOutput = [process.cwd()];
        const input = ['some/path'];

        // WHEN
        const paths = addDefaultDir(input);
        
        // THEN
        expect(paths).toEqual(expect.arrayContaining(expectedOutput));
    });
});