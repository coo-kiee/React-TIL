const uploadFile = require("../middleware/upload");
const fs = require("fs");

// upload File
const upload = async (req, res) => {

    try {
        await uploadFile(req, res);

        if(!req.file) {
            return res.status(400).send({ message: "Please upload a file!"});
        }
        res.status(200).send({ message: `Could not upload the file: ${req.file.originalname}`});
        
    } catch (err) {

        if(err.code === "LIMIT_FILE_SIZE") {
            return res.status(500).send({ message: `File size cannot be larger than 4MB!`});
        }

        res.status(500).send({ message: `Could not upload the file: ${req.file.originalname}. ${err}`});
    }
};

// getList Files
const baseUrl = "http://localhost:8080/files/";
const getListFiles = (req, res) => {

    const directoryPath = `${__basedir}/resources/static/assets/uploads/`;

    fs.readdir(directoryPath, (err, files) => {

        if(err) {
            res.status(500).send({ message: "Unable to scan files!"});
        }

        const fileInfos = files.map( file => ({
            name: file.name,
            url: baseUrl + file,
        }));

        res.status(200).send(fileInfos);
    });
};

// download file
const download = (res, req) => {
    
    const fileName = req.params.name;
    const directoryPath = `${__basedir}/resources/static/assets/uploads/`;

    res.download(directoryPath + fileName, fileName, (err) => {

        if(err) {
            res.status(500).send({ message: `Could not download the file. ${err}`});
        }
    })
};

module.exports = {
    upload,
    getListFiles,
    download,
}