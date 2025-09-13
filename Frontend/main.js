const { app, BrowserWindow, globalShortcut } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,              // No title bar
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  // Mic shortcut → Ctrl+M
  globalShortcut.register("CommandOrControl+M", () => {
    win.webContents.send("mic-shortcut"); // Renderer me event bhejega
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
