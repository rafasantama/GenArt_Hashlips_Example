# Welcome to AstroNeas 

For install:

"npm install"

For generate:

"npm run generate"

For Upload images to IPFS:

   1. Upload images folder to Pinata (https://app.pinata.cloud/)
   2. Copy the CID from Pinata (Images folder)
   3. Paste de CID on the config.js file,  line 10 (baseUri), in this format "ipfs://CID" and save.
   
For Upload Metadata to IPFS:

  1. Run "node utils/update_info.js" (Update the Json files with the IPFS link)
  2. Upload json folder to Pinata (https://app.pinata.cloud/)

For mint on (Use the 0.8.1 Solidity Compiler):

In the ERC721 smart contract, there are a field called "INITBASEURI", in this field you must paste the CID (JSON folder) in this format "ipfs://CID" and run deploy.





