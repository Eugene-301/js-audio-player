import { app, BrowserWindow, ipcMain } from "electron/main";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(path.join(__dirname, "preload.js"));

if (!fs.existsSync(path.join(__dirname, "preload.js"))) {
  console.error("Файл preload.js не найден по пути:", preloadPath);
} else {
  console.log("файл найден");
}

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
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  win.loadFile("index.html");
};

app.on("ready", () => {
  createWindow();
  ipcMain.handle("ping", () => {
    console.log("recived ping");

    return "pong";
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
