const { app, BrowserWindow } = require("electron");
// import { app, BrowserWindow } from "electron";

const path = require("path");
// import path from "path";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 640,
    height: 480,
    webPreferences: { preload: path.join(__dirname, "preload.js") },
  });

  win.loadFile("./gpt/restaurant-picker.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
