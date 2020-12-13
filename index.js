const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const files = require("./lib/files");
const inquirer = require("./lib/inquirer");
const config = require("./lib/configstore");
const constants = require("./lib/constants");
const { getOPVNFiles } = require("./lib/files");
const { exclude } = require("inquirer/lib/objects/separator");
const argv = require("minimist")(process.argv.slice(2));
const { exec } = require("child_process");

clear();

console.log(
  chalk.blue(
    figlet.textSync("VPNPURE", { horizontalLayout: "fitted", width: 80 })
  )
);

// Do a reset of config
if (argv.r) {
  console.log(argv);
  config.clear();
}

const start = async () => {
  //configstore knows about OVPN directory?
  if (!config.has(constants.CONFIG_KEY_OVPN_DIR)) {
    try {
      const credentials = await inquirer.askIsOVPNDir();

      if (credentials.is_opvn_dir) {
        const directory = files.getFullCWD();
        config.set(constants.CONFIG_KEY_OVPN_DIR, directory);
      } else {
        console.log("You must set the directory where OPVN files are located!");
        process.exit(9);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //Which country VPN to connect to?
  const pathVPNFileList = files.getOPVNFiles(
    config.get(constants.CONFIG_KEY_OVPN_DIR)
  );

  const lastUseIndex = config.has(constants.CONFIG_KEY_LAST_USE_INDEX)
    ? config.get(constants.CONFIG_KEY_LAST_USE_INDEX)
    : 0;

  try {
    let { vpnSelected } = await inquirer.askCountryVPNToUse(
      pathVPNFileList,
      lastUseIndex
    );

    const selectedIndex = pathVPNFileList.indexOf(vpnSelected);
    if (selectedIndex) {
      config.set(constants.CONFIG_KEY_LAST_USE_INDEX, selectedIndex);
    }
  } catch (err) {
    console.log(err);
  }

  //copy selected into openvpn dest, usually /etc/openvpn/server.conf
  //and modify
  fullPathVPNSelected =
    config.get(constants.CONFIG_KEY_OVPN_DIR) +
    "/" +
    pathVPNFileList[config.get(constants.CONFIG_KEY_LAST_USE_INDEX)];
  //console.log(fullPathVPNSelected);
  files.copyOPVPNFileToDefaultDest(fullPathVPNSelected);

  //restart openvpn
  exec("systemctl restart openvpn", (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error ${err}`);
      return;
    }
    console.log(`${stdout}`);
    console.log(`${stderr}`);
  });
};

start();
