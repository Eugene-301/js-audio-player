import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(path.join(__dirname, "/preload.js"));

async function handleSquirrelEvent() {
  try {
    const squirrelStartup = await import("electron-squirrel-startup");
    if (squirrelStartup.default) {
      app.quit();
      return true;
    }
  } catch (error) {
    console.error("Failed to load electron-squirrel-startup:", error);
  }
  return false;
}

handleSquirrelEvent().catch((error) => {
  console.log(error);
});

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.once("ready-to-show", () => {
    window.show();
  });

  window.loadFile("index.html");
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
