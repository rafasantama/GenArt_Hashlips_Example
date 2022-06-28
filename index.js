const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);
// import startCreating from `${basePath}/src/main.js`;
// import buildSetup from `${basePath}/src/main.js`;


(() => {
    buildSetup();
    startCreating();
})();