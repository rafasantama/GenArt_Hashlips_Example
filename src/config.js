const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Astro Neas";
const description = "Una colección de Neas Espaciales. Términos y Condiciones en: https://bit.ly/astroneaTOS. Canal de Youtube: https://m.youtube.com/channel/UCJTRmyEtzA9PQkgndThaF9A";
const external_url = "https://astronea.co/";
const animation_url = "ipfs://QmQPUHCavSpgVykqzATj5FGVsJ9qPNxA9jSWkn81VuR6cu";
const youtube_url = "https://youtu.be/ejRSaC0o4OE";
const baseUri = "ipfs://QmcRSdTiRnpovi99BbxMkQ7H7Eb1Qvhj6rPf2anVgWUotE"; // Paste Pinata CID Here!

const solanaMetadata = {
    symbol: "YC",
    seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
    external_url: "https://www.youtube.com/c/hashlipsnft",
    creators: [{
        address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
        share: 100,
    }, ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [{
    growEditionSizeTo: 100,
    layersOrder: [
        { name: "Fondo" }, //0
        { name: "Suelo" }, //1
        { name: "Plantas" }, //2
        { name: "Paredes" }, //3
        { name: "Ventanas" }, //4
        { name: "Techo" }, //5
        { name: "Balcon" }, //6
        { name: "Puertas" }, //7
    ],
}, ];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
    width: 1500,
    height: 1500,
    smoothing: false,
};

const gif = {
    export: false,
    repeat: 0,
    quality: 100,
    delay: 500,
};

const text = {
    only: false,
    color: "#ffffff",
    size: 20,
    xGap: 40,
    yGap: 40,
    align: "left",
    baseline: "top",
    weight: "regular",
    family: "Courier",
    spacer: " => ",
};

const pixelFormat = {
    ratio: 2 / 128,
};

const background = {
    generate: true,
    brightness: "80%",
    static: false,
    default: "#000000",
};

const extraMetadata = {
    //external_url: "Website of the collection"
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
    thumbPerRow: 5,
    thumbWidth: 50,
    imageRatio: format.height / format.width,
    imageName: "preview.png",
};

const preview_gif = {
    numberOfImages: 5,
    order: "ASC", // ASC, DESC, MIXED
    repeat: 0,
    quality: 100,
    delay: 500,
    imageName: "preview.gif",
};

module.exports = {
    format,
    baseUri,
    description,
    external_url,
    animation_url,
    youtube_url,
    background,
    uniqueDnaTorrance,
    layerConfigurations,
    rarityDelimiter,
    preview,
    shuffleLayerConfigurations,
    debugLogs,
    extraMetadata,
    pixelFormat,
    text,
    namePrefix,
    network,
    solanaMetadata,
    gif,
    preview_gif,
};