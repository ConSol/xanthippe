const { directory, file, cleanAll, directoryRec } = require('./file_hierarchy');
const { join, sep } = require('path');
const { tmpdir } = require('os');
const fs = require('fs');

const mymkdtempSync = fs.mkdtempSync;
fs.mkdtempSync = jest.fn((elem) => mymkdtempSync(elem));
const mockFunction = jest.fn(() => { });


describe('directory', () => {

    it('should call the mkdirtemp function and the function delivered to the directory function', () => {
        //GIVEN
        const call = join(tmpdir(), 'xanthippe');


        //WHEN
        directory('testdir', () => mockFunction());


        //THEN
        expect(fs.mkdtempSync).toHaveBeenCalledWith(call);
        expect(mockFunction).toHaveBeenCalled();
    })

    it("should call the mkdirtemp function and the function delivered to the directory function", () => {
        //GIVEN
        const call = join(tmpdir(), "xanthippe");

        //WHEN
        workingDirectory = "foo";
        directory("testdir", () => mockFunction());

        //THEN
        expect(fs.mkdtempSync).toHaveBeenCalledWith(call);
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should create and return a directory', () => {
        //GIVEN
        const dirname = "testdir";

        //WHEN
        const createdDir = directory(dirname, () => mockFunction());
        const isTempdir = fs.statSync(createdDir.dir).isDirectory();

        //THEN
        expect(isTempdir).toBe(true)

    })

    it('should create and return a temporary directory with name xanthippe<rand string>', () => {
        //GIVEN
        const dirname = 'testdir';

        // //WHEN
        const rootTmp = directory(dirname, () => mockFunction());
        const expected = tmpdir().split(sep);
        expected.push(expect.stringMatching(/^xanthippe\w{6}$/));
        expected.push(dirname);

        //THEN
        expect(rootTmp.dir.split(sep)).toEqual(expected);
    });

    it('should create and return nested directories in system temp folder', () => {
        //GIVEN
        const dirname1 = 'testdir1';
        const dirname2 = 'testdir2';

        //WHEN
        let testdir;
        directory(dirname1, (workingDirectory) => {
            testdir = directory(dirname2, () => {
                mockFunction();
            }, workingDirectory);
        });
        const expected = tmpdir().split(sep);
        expected.push(expect.stringMatching(/^xanthippe\w{6}$/));
        expected.push(dirname1);
        expected.push(dirname2);

        //THEN
        expect(testdir.dir.split(sep)).toEqual(expected);
    })


})

describe('file', () => {


    it('should create a file with a given name', () => {
        //GIVEN
        const filename = 'testfile1';
        const text = ''

        //WHEN
        const directoryWithFile = directory('testdir', (workingDirectory) => file(filename, text, workingDirectory));
        const expected = fs.statSync(join(directoryWithFile.dir, filename)).isFile();


        //THEN
        expect(expected).toBe(true);
    })

    it('should not create a file when a file with the same name already exists and log an error message', () => {
        //GIVEN
        const filename = 'testfile1';
        const text = '';
        console.error = jest.fn();

        //WHEN
        const directoryWithFiles = directory('testdir', (workingDirectory) => {
            file(filename, text, workingDirectory);
            file(filename, text, workingDirectory);
        });

        //THEN
        expect(console.error).toHaveBeenCalledWith(`cannot create file: object with name ${filename} already exists in ${directoryWithFiles.dir}`)
    })

    it('should write the delivered text into the file', () => {
        //GIVEN
        text = "This is the text we expect to be in the file"

        //WHEN
        const directoryWithFileAndText = directory('testdir', (workingDirectory) => {
            file('file1', text, workingDirectory);
        });
        const textInFile = fs.readFileSync(join(directoryWithFileAndText.dir, 'file1'), 'utf-8');

        //THEN
        expect(text).toEqual(textInFile);
    })
});

describe('cleanAll', () => {
    it('should delete all xanthippe folders in os.tmpdir()', () => {
        //GIVEN
        const xantDir = directory('testdir', () => { });

        //WHEN
        cleanAll();

        //THEN
        expect(() => fs.statSync(xantDir.getRoot())).toThrow();
    });
});

describe('deleteTree', () => {
    it('should delete a directorys xanthippe root recursively', () => {
        //GIVEN
        const xantDir = directory('hallo', () => { });

        //WHEN
        xantDir.deleteTree();

        //THEN
        expect(() => fs.statSync(xantDir.getRoot())).toThrow();
    });

    it('should delete a the xanthippe root of a nested directory', () => {
        //GIVEN
        let xantDir;
        directory('hallo', () => {
            xantDir = directory('hello', () => { });
        });

        //WHEN
        xantDir.deleteTree();

        //THEN
        expect(() => fs.statSync(xantDir.getRoot())).toThrow();
    });
});

describe('directoryRec', () => {
    it('should create a directory and return its path', () => {
        //GIVEN
        const dirname = ["testdir"];

        //WHEN
        const createdDir = directoryRec(dirname, () => mockFunction());
        const isTempdir = fs.statSync(createdDir.dir).isDirectory();

        //THEN
        expect(isTempdir).toBe(true)
    });

    it('should throw an error if no directory names are specified', () => {
        //GIVEN
        const dirname = [];

        //WHEN
        const createdDir = () => directoryRec(dirname, () => mockFunction());

        //THEN
        expect(createdDir).toThrow();
    });

    it('should throw an error if a workingDirectory parameter is passed to the outer-most function invocation', () => {
        //GIVEN
        const dirname = ['tick', 'trick', 'track'];

        //WHEN
        const createdDir = () => directoryRec(dirname, () => { }, 'abacadabra');

        //THEN
        expect(createdDir).toThrow();
    });

    it('should create a series of nested directories', () => {
        //GIVEN
        const dirnames = ['tick', 'trick', 'track'];
        const expDirNames = [...dirnames];
        //WHEN
        const createdDir = directoryRec(dirnames, () => {});

        let expected = tmpdir().split(sep);
        expected.push(expect.stringMatching(/^xanthippe\w{6}$/));
        expected.push(expDirNames[0]);
        expected.push(expDirNames[1]);
        expected.push(expDirNames[2]);
        const isTempdir = fs.statSync(createdDir.dir).isDirectory();

        //THEN
        expect(createdDir.dir.split(sep)).toEqual(expected);
        expect(isTempdir).toBe(true);

        expected.deleteTree();
    });

});
