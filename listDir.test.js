const { listDir } = require("./listDir");
const { join } = require("path");

describe("listDirRec", () => {
    it("should return an empty list for empty folders", () => {
        //GIVEN
        const absolutePathToTestFolder = join(__dirname, "cli_test_files", "subfolder_empty");
        const expectedListOutput = [];

        //WHEN
        const result = listDir(absolutePathToTestFolder);

        //THEN
        expect(result).toEqual(expectedListOutput);
    });

    it("should return all filepaths in a non empty subfolder", () => {
        //GIVEN
        const absolutePathToTestFolder = join("cli_test_files", "subfolder");
        const expectedListOutput = [];
        expectedListOutput.push(join("cli_test_files", "subfolder", "test_2_cli.js"));
        expectedListOutput.push(join("cli_test_files", "subfolder", "test_2_cli.xtest.js"));


        //WHEN
        const result = listDir(absolutePathToTestFolder, true);

        //THEN
        expect(result).toEqual(expectedListOutput);
    });

    it("should return all subfolders and filepaths in a directory ", () => {
        //GIVEN
        const absolutePathToTestFolder = join("cli_test_files");
        const expectedListOutput = [];
        expectedListOutput.push(join("cli_test_files", "subfolder", "test_2_cli.js"));
        expectedListOutput.push(join("cli_test_files", "subfolder", "test_2_cli.xtest.js"));
        expectedListOutput.push(join("cli_test_files", "test_2_cli.js"));
        expectedListOutput.push(join("cli_test_files", "test_2_cli.xtest.js"));
        expectedListOutput.push(join("cli_test_files", "test_cli.js"));
        expectedListOutput.push(join("cli_test_files", "test_cli.xtest.js"));


        //WHEN
        const result = listDir(absolutePathToTestFolder, true);

        //THEN
        expect(result).toEqual(expectedListOutput);
    });

    it('Should return all files in just a folder without descending into subfolders.', () => {
        //GIVEN
        const absolutePathToTestFolder = join("cli_test_files");
        const expectedListOutput = [];
        expectedListOutput.push(join("cli_test_files", "test_2_cli.js"));
        expectedListOutput.push(join("cli_test_files", "test_2_cli.xtest.js"));
        expectedListOutput.push(join("cli_test_files", "test_cli.js"));
        expectedListOutput.push(join("cli_test_files", "test_cli.xtest.js"));

        //WHEN
        const result = listDir(absolutePathToTestFolder);

        //THEN
        expect(result).toEqual(expectedListOutput);
    });
})
