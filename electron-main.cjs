const { app, BrowserWindow } = require("electron");
const path = require("path");

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 490,
    height: 580,
    icon: path.join(__dirname, "strawb-icon.ico"),
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#ffc2d9", //background of the control buttons
      symbolColor: "#e754cc", // pink minimize, maximize, and close
      height: 37, // button height
    },

    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "dist-vue", "index.html"));
  } else {
    win.loadURL("http://localhost:5173");
  }
});
