const {directory} = require('./file_hierarchy');
const {join, sep} = require('path');
const {tmpdir} = require('os');
const fs = require('fs');

const mymkdtempSync = fs.mkdtempSync;
fs.mkdtempSync = jest.fn((elem) => mymkdtempSync(elem));
const mockFunction = jest.fn(() => {});


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


    it('should create and return a directory', () => {
        //GIVEN
        const dirname = "testdir";

        //WHEN
        const createdDir = directory(dirname, () => mockFunction());
        const isTempdir = fs.statSync(createdDir).isDirectory();

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

        //THEN
        expect(rootTmp.split(sep)).toEqual(expected);
    });

    it('should create and return nested directories in system temp folder', () => {
        //GIVEN
        const dirname1 = 'testdir1';
        const dirname2 = 'testdir2';

        //WHEN
        let testdir;
        directory(dirname1, () => {
            testdir = directory(dirname2, () => {
                mockFunction();
            });
        });
        const expected = tmpdir().split(sep);
        expected.push(expect.stringMatching(/^xanthippe\w{6}$/));
        expected.push(dirname1);
        expected.push(dirname2);

        //THEN
        expect(testdir.split(sep)).toEqual(expected);
    })
    

})