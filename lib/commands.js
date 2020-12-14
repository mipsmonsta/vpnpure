const { exec } = require("child_process");

module.exports.showPublicIP = () => {
  exec("hostname -I", (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error ${err}`);
      return;
    }

    const ips = stdout.split(" ");
    console.log(ips[1]);

    if (stderr) {
      console.error(strerr);
      return;
    }
  });
};
