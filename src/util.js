const { app } = require("electron");
const path = require("node:path");
const fs = require("node:fs");

const env = require("dotenv");

module.exports = {
  getHost: () => {
    let exePath = app.getPath("exe");

    let dir = path.dirname(exePath);
    let envPath = dir + ".env";
    if (fs.existsSync(envPath)) {
      let config = env.parse(fs.readFileSync(envPath).toString());
      if (config.HOST) {
        return config.HOST;
      }
    }

    return "https://pugai.minapp.xin";
  },
};
