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

describe('filterTestFiles', () => {
    it('should filter out all filepaths without the xtest extension', () => {
        //GIVEN
        const paths = [
            'some/paths.js',
            'some/paths.xtest.js',
            'some.xtest/paths.js',
            'path.xtest.js',
            'path.xtest.txt.js',
            'path.xtest.js/hallo'
        ];

        //WHEN
        const result = filterTestfiles(paths);
        const expectedPaths = [
            'some/paths.xtest.js',
            'path.xtest.js'
        ];

        //THEN
        expect(result).toEqual(expectedPaths);
    });
});
