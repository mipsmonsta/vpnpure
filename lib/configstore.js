const Configstore = require("configstore");
const packageJSON = require("../package.json");
const { CONFIG_PATH_SERVER_CONF_DEST } = require("./constants");
const constants = require("./constants");

const config = new Configstore(packageJSON.name);

config.set(
  constants.CONFIG_PATH_SERVER_CONF_DEST,
  constants.CONFIG_PATH_SERVER_CONF_DEST
);

module.exports = config;
