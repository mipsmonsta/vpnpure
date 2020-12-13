const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const config = require("./configstore");
const { CONFIG_PATH_SERVER_CONF_DEST } = require("./constants");
const replace = require("replace-in-file");

module.exports = {
  getFullCWD: () => {
    return process.cwd();
  },

  isExistInDirectory: (filePath) => {
    return fs.existsSync(filePath);
  },

  getOPVNFiles: (dirPath) => {
    const listOVPN = fs
      .readdirSync(dirPath)
      .filter((fileName) => fileName.toLowerCase().endsWith(".ovpn"));
    return listOVPN;
  },
  copyOPVPNFileToDefaultDest: (fullSrcVPNPath) => {
    if (!config.has(CONFIG_PATH_SERVER_CONF_DEST)) {
      throw new Error("Cannot retreive destination from configstore");
    }

    fs.copyFileSync(fullSrcVPNPath, config.get(CONFIG_PATH_SERVER_CONF_DEST));

    //modify
    const results = replace.sync({
      files: config.get(CONFIG_PATH_SERVER_CONF_DEST),
      from: /auth-user-pass/,
      to: "auth-user-pass auth.txt",
    });

    console.log(`auth.txt linked to conf file: ${results[0].hasChanged}`);
  },
};
