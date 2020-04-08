const {directory} = require('./file_hierarchy');
const {join} = require('path');
const {tmpdir} = require('os');

describe('directory', () => {
    it('should return a temporary xanthippe directory', () => {
        //GIVEN
        const tempdirname = "1234"
        const path = join(tmpdir(), 'xanthippe');
        const prefix = "\^";
        const expected = new RegExp(prefix.concat(path));

        //WHEN
        const rootdir = directory(tempdirname, () => {console.log("Hallo")});
        

        //THEN
        expect(rootdir).toEqual(expect.stringMatching(expected));
    }) 
})