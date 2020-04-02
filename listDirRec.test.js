const  { listDirRec } = require("./listDirRec");
const { join } = require("path");

describe("listDirRec", () => {
    it("should return an empty list for empty folders", () => {
        //GIVEN
        const absolutePathToTestFolder = join(__dirname, "cli_test_files" , "subfolder_empty");
        const expectedListOutput = [];

        //WHEN
        const result = listDirRec(absolutePathToTestFolder);

        //THEN
        expect(result).toEqual(expectedListOutput);
    });

    it("should return all filepaths in <a> directory", () => {
        //GIVEN
        const absolutePathToTestFolder = join("cli_test_files" , "subfolder");
        const expectedListOutput = [];
        expectedListOutput.push(join("cli_test_files","subfolder","test_2_cli.js"));
        expectedListOutput.push(join("cli_test_files","subfolder","test_2_cli.xtest.js"));


        //WHEN
        const result = listDirRec(absolutePathToTestFolder);

        //THEN
        expect(result).toEqual(expectedListOutput);
    });
})
