const fs = require('fs')
const path = require('path')

function organizefn(dirpath) {
    // 1. input of a dir path
    let destPath;
    if (dirpath == undefined) {
        console.log('Please Enter a directory path');
        return
    }
    else {
        let doesExist = fs.existsSync(dirpath) // checking folder exists or not
        // console.log(doesExist);

        if (doesExist == true) {
            // 2. Create an Organised file directory
            destPath = path.join(dirpath, 'Organised_files')
            // joining the dir path with the name of new folder to create a new folder

            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath)
            }
            else {
                console.log('FOLDER ALREADY EXISTS');
            }
        }
        else {
            console.log('Please enter a valid directory path');
        }
    }

    console.log('Organize function implimented');
    organizeHelper(dirpath, destPath);

}

// function organizeHelper(src) {
//     let childNames = fs.readdirSync(src);
//     console.log(childNames);
// }

function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src); // readdirSync -> returns nemes of all files and folders contained
    //console.log(childNames)

    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();

        if (isFile == true) {
            let fileCategory = getCategory(childNames[i]);
            console.log(childNames[i] + "  belongs to  " + fileCategory);

            sendFiles(childAddress, dest, fileCategory)
        }
    }
}

function getCategory(name) {
    let ext = path.extname(name);
    //console.log(ext)
    ext = ext.slice(1);
    //console.log(ext)

    for (let type in types) {
        let cTypeArr = types[type];
        //console.log(cTypeArr)

        for (let i = 0; i < cTypeArr.length; i++) {
            if (ext == cTypeArr[i]) {
                return type;
            }
        }
    }
    return "others"
}

function sendFiles(srcFilePath, dest, fileCategory) {
    let catPath = path.join(dest, fileCategory)

    if (fs.existsSync(catPath) == false)
        fs.mkdirSync(catPath)

    let fileName = path.basename(srcFilePath)
    let destFilePath = path.join(catPath, fileName)
    fs.copyFileSync(srcFilePath, destFilePath)
    fs.unlinkSync(srcFilePath)

    console.log(fileName + "copied to " + fileCategory)
}

module.exports={
    organizefnKey: organizefn
}