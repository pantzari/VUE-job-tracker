const { app, BrowserWindow } = require("electron");
const path = require("path");

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 490,
    height: 580,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#ffc2d9", // Background of the control buttons
      symbolColor: "#e754cc", // Pink minimize, maximize, and closenpm run electronicons
      height: 37, // Button height
    },

    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL("http://localhost:5173");
});
