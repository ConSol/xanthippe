const { runFiles, filterTestfiles, getCanonicalPaths } = require('./testrunner');

describe('getCanonicalPaths', () => {

    it('should return all filepaths under cli_test_files', () => {
        //GIVEN
        const inputPaths = ['cli_test_files'];

        //WHEN
        const result = getCanonicalPaths(inputPaths);
        const expectedPaths = [
            'cli_test_files/test_2_cli.js',
            'cli_test_files/test_2_cli.xtest.js',
            'cli_test_files/test_cli.js',
            'cli_test_files/test_cli.xtest.js'
        ];

        //THEN
        expect(result).toEqual(expectedPaths);
    });
    
});
