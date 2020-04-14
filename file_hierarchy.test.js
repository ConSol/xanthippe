const {directory} = require('./file_hierarchy');
const {join} = require('path');
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
})