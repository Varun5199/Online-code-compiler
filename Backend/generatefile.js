const fs = require('fs');

const path = require('path');

const dirCodes = path.join(__dirname,"codes");

const {v4 : uuidv4} = require('uuid')

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive: true});

}

const generatefile = async(format,content) =>{
    const jobid=uuidv4();
    const filename=`${jobid}.${format}`
    const filepath=path.join(dirCodes,filename);
    fs.writeFileSync(filepath,content);
    return filepath;
};

module.exports={
    generatefile,
} 