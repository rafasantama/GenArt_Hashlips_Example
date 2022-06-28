// const FormData = require('form-data');
import FormData from 'form-data';
// const fetch = require('node-fetch');
import fetch from "node-fetch";
// const path = require("path");
import path from "path";
const basePath = process.cwd();
// const fs = require("fs");
import fs from "fs";


var options;
var formData;
var fileStream;
var url;


fs.readdirSync(`${basePath}/build/images`).
forEach(file => {
    formData = new FormData();
    fileStream = fs.createReadStream(`${basePath}/build/images/${file}`);
    formData.append('file', fileStream);

    url = 'https://api.nftport.xyz/v0/files';

    options = {
        method: 'POST',
        headers: {
            Authorization: '2c35862d-ab47-4440-81f6-7a9d2aa91e0f',
        },
        body: formData
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            const fileName = path.parse(json.file_name).name
            let rawdata = fs.readFileSync(`${basePath}/build/json/${fileName}.json`);
            let metaData = JSON.parse(rawdata);

            metaData.file_url = json.ipfs_url;
            fs.writeFileSync(`${basePath}/build/json/${fileName}.json`,
                JSON.stringify(metaData, null, 2));

            console.log(`${json.file_name} uploaded & ${fileName}.json updated! `);
        })
        .catch(err =>
            console.error('error:' + err)
        )
})