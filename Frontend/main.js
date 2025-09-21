const { app, BrowserWindow, globalShortcut } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,             
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hiddenInMissionControl: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.setContentProtection(true); 
  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  // Mic shortcut → Ctrl+N
  globalShortcut.register("CommandOrControl+N", () => {
    win.webContents.send("mic-shortcut"); // Renderer me event bhejega
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
