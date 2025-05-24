const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  win.loadFile("index.html");
};

app.on("ready", () => {
  createWindow();
  ipcMain.handle("ping", () => "pong");

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
