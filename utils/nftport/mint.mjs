import fetch from "node-fetch";
import path from "path";
const basePath = process.cwd();
import fs from "fs";

const ipfsMetas = JSON.parse(fs.readFileSync(`${basePath}/build/json/_metadata.json`))

fs.writeFileSync(`${basePath}/build/minted.json`, "");
const writter = fs.createWriteStream(`${basePath}/build/minted.json`, {
    flags: "a",
});
writter.write("[");
let fileCount = ipfsMetas.lenght;

ipfsMetas.forEach(meta => {
    let url = 'https://api.nftport.xyz/v0/mints/customizable';

    const mintInfo = {
        chain: "rinkeby",
        contractAddress: "0xb4fFf15509F7300670c25F86ce29fe7f4C6Ab7Ae",
        metadata_uri: meta.metadata_uri,
        mint_to_address: "0xD291bF20500E7dcAfD5a54183996528B48A8649E",
        token_id: meta.custom_fields.edition,

    }

    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "aplication/json",
            Authorization: '2c35862d-ab47-4440-81f6-7a9d2aa91e0f',
        },
        body: JSON.stringify(mintInfo),
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            writter.write(JSON.stringify(json, null, 2));
            fileCount--;

            if (fileCount === 0) {
                writter.write("]");
                writter.end();
            } else {
                writter.write(",\n");
            }

            console.log(`Minted: ${json.transaction_external_url}`);
        })
        .catch(err => console.error('error:' + err));
})