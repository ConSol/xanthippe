
function addDefaultDir(paths){
    paths.push(process.cwd());
    return paths;
}

module.exports = {
        addDefaultDir
    };
