const { app, BrowserWindow, Menu } = require("electron");
const path = require("node:path");
const { data } = require("./shared");
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let util = require("./util");
data.set({
  sended: 0,
  received: 0,
  host: util.getHost(),
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      backgroundThrottling: false, // 禁用后台节流
      sandbox: false,
    },
  });

  // Menu.setApplicationMenu(null);

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  if (process.platform !== "darwin") {
    const Wechaty = require("wechaty");
    const { PuppetXp } = require("wechaty-puppet-xp");
    const { WechatyBuilder } = Wechaty;
    const puppet = new PuppetXp();
    const bot = require("./bot");
    const botInstance = WechatyBuilder.build({
      puppet: puppet,
      name: "bot",
    });
    bot.load(botInstance);
  }
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
