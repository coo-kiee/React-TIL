const { override, removeModuleScopePlugin, getBabelLoader, addWebpackAlias } = require("customize-cra");
const path = require("path");


console.log(`${__dirname}/aaa`)
console.log(path.normalize(path.join(process.cwd(), `./aaa`)).replace(/\\/g, "\\"))

const updateAliases = (config) => {
    const aliases = {
        "@aaa": [`${__dirname}/aaa`]
    };
    return addWebpackAlias(aliases)(config);
};
const updateIncludes = (config) => {
    const loader = getBabelLoader(config, false);
    const commonPath = path.normalize(path.join(process.cwd(), `./aaa`)).replace(/\\/g, "\\");
    loader.include = [loader.include, commonPath];
    return config;
};
module.exports = override(
    // updateAliases,
    updateIncludes,
    removeModuleScopePlugin()
);