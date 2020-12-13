const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");

module.exports = {
  askIsOVPNDir: () => {
    const questions = [
      {
        name: "is_opvn_dir",
        type: "confirm",
        message: "Is current directory where OPVN files are located?",
        default: false,
      },
    ];
    return inquirer.prompt(questions);
  },
  askCountryVPNToUse: (filelist, lastUseIndex) => {
    let defaultIndex = lastUseIndex;
    if (lastUseIndex < 0 || lastUseIndex >= filelist.length) {
      defaultIndex = 0;
    }

    const questions = [
      {
        type: "rawlist",
        name: "vpnSelected",
        message: "Select Country VPN",
        choices: filelist,
        default: defaultIndex,
      },
    ];
    return inquirer.prompt(questions);
  },
};
