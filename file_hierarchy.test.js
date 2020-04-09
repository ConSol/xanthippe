const {directory} = require('./file_hierarchy');
const {join} = require('path');
const {tmpdir} = require('os');
const fs = require('fs');

const mymkdtempSync = fs.mkdtempSync;
fs.mkdtempSync = jest.fn((elem) => mymkdtempSync(elem));
//fs.mkdirSync = jest.fn();


describe('directory', () => {
    /* it('should return a temporary xanthippe directory', () => {
        //GIVEN
        const tempdirname = "1234"
        const path = "".concat(join(tmpdir(), 'xanthippe').split("\\").map(elem => {
            if ( elem === "\\") {
                return "\\\\";
            } else {
                return elem;
            }
        }));
        const prefix = "\^";
        const expected = new RegExp(prefix.concat(path));

        //WHEN
        const rootdir = directory(tempdirname, () => {console.log("Hallo")});
        

        //THEN
        expect(rootdir).toEqual(expect.stringMatching(expected));
    })  */

    it('should return a temporary xanthippe directory', () => {
        //GIVEN
        const call = join(tmpdir(), 'xanthippe');
    

        //WHEN
        directory('1234', () => console.log('hallo'));


        //THEN
        expect(fs.mkdtempSync).toHaveBeenCalledWith(call);
    }
)})