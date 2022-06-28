const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");

const {
  baseUri,
  description,
  external_url,
  animation_url,
  youtube_url,
  namePrefix,
  network,
  solanaMetadata,
} = require(`${basePath}/src/config.js`);

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
var i=1;
data.forEach((item) => {
  if (i%2==0){
    if (network == NETWORK.sol) {
      item.name = `${namePrefix} #${item.edition}`;
      item.description = description;
      item.external_url = external_url;
      item.animation_url = animation_url;
      item.youtube_url = youtube_url;
      item.creators = solanaMetadata.creators;
    } else {
      item.name = `${namePrefix} #${item.edition}`;
      item.description = description;
      item.external_url = external_url;
      item.animation_url = animation_url;
      item.youtube_url = youtube_url;
      item.image = `${baseUri}/${item.edition}.png`;
    }
    fs.writeFileSync(
      `${basePath}/build/json/${item.edition}.json`,
      JSON.stringify(item, null, 2)
    );
  }
i++
});

fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(data, null, 2)
);

if (network == NETWORK.sol) {
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
  console.log(
    `Updated creators for images to ===> ${JSON.stringify(
      solanaMetadata.creators
    )}`
  );
} else {
  console.log(`Updated baseUri for images to ===> ${baseUri}`);
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
  console.log(`Updated name prefix for external_url to ===> ${external_url}`);
  console.log(`Updated name prefix for animation_url to ===> ${animation_url}`);
  console.log(`Updated name prefix for youtube_url to ===> ${youtube_url}`);
}
