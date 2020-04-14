const {directory} = require('./file_hierarchy');
const {join, sep} = require('path');
const {tmpdir} = require('os');
const fs = require('fs');

const mymkdtempSync = fs.mkdtempSync;
fs.mkdtempSync = jest.fn((elem) => mymkdtempSync(elem));


describe('directory', () => {

    it('should call the mkdirtemp function to return a temporary xanthippe directory', () => {
        //GIVEN
        const call = join(tmpdir(), 'xanthippe');
    

        //WHEN
        directory('1234', () => console.log('hallo'));


        //THEN
        expect(fs.mkdtempSync).toHaveBeenCalledWith(call);
    })


    it('should create and return a temporary directory', () => {
        //GIVEN
        const dirname = "testDir";

        //WHEN
        const createdDir = directory(dirname, () => console.log("hallo"));
        const isTempdir = fs.statSync(createdDir).isDirectory();

        //THEN
        expect(isTempdir).toBe(true)

    })

    it('should create and return a temporary directory with name xanthippe<rand string>', () => {
        //GIVEN
        const dirname = 'testdir';

        // //WHEN
        const rootTmp = directory(dirname, () => console.log('hallo'));
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
                console.log('hello');
            });
        });
        const expected = tmpdir().split(sep);
        expected.push(expect.stringMatching(/^xanthippe\w{6}$/));
        expected.push(dirname1);
        expected.push(dirname2);

        //THEN
        expect(testdir.split(sep)).toEqual(expected);
    });
})