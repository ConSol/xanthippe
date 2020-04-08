const { runFiles, filterTestfiles, filterDirectories } = require('./testrunner');
const {join} = require('path');

describe('filterDirectories', () => {
    it('should filter out all subdirectories in a directorie and return only filepaths' , () => {
        //GIVEN
        const inputList = [];
        inputList.push(join("cli_test_files", "subfolder"));
        inputList.push(join("cli_test_files", "subfolder_empty"));
        inputList.push(join("cli_test_files", "test_2_cli.js"));
        inputList.push(join("cli_test_files", "test_2_cli.xtest.js"));
        inputList.push(join("cli_test_files", "test_cli.js"));
        inputList.push(join("cli_test_files", "test_cli.xtest.js"));

        const outputList = [];
        outputList.push(join("cli_test_files", "test_2_cli.js"));
        outputList.push(join("cli_test_files", "test_2_cli.xtest.js"));
        outputList.push(join("cli_test_files", "test_cli.js"));
        outputList.push(join("cli_test_files", "test_cli.xtest.js"));


        //WHEN
        const obtained = filterDirectories(inputList);

        //THEN
        expect(obtained).toEqual(outputList);
    })
})

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
