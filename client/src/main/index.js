import { app, BrowserWindow, ipcMain } from "electron";
import "../renderer/store";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path").join(__dirname, "/static").replace(/\\/g, "\\\\");
}

let loginWindow;
let homeWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9080/"
    : `file://${__dirname}/index.html`;

function createLoginWindow() {
  /**
   * Initial window options
   */
  loginWindow = new BrowserWindow({
    height: 325,
    useContentSize: true,
    width: 430,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
    },
  });
  loginWindow.loadURL(`${winURL}#/login`);
  loginWindow.setMenu(null);
  ipcMain.on("minMain", () => {
    loginWindow.minimize();
    console.log(`min${Math.random()}`);
  });
  ipcMain.on("closeMain", () => {
    loginWindow.close();
  });
}
function createRegisterWindow() {
  const registerWindow = new BrowserWindow({
    height: 325,
    useContentSize: true,
    width: 430,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
    },
  });
  registerWindow.loadURL(`${winURL}#/register`);
  registerWindow.setMenu(null);
  ipcMain.on("minReg", () => {
    registerWindow.minimize();
  });
  ipcMain.on("closeReg", () => {
    registerWindow.close();
  });
}
ipcMain.on("openRegister", () => {
  createRegisterWindow();
});
function createFindPasswordWindow() {
  const findPasswordWindow = new BrowserWindow({
    height: 325,
    useContentSize: true,
    width: 430,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
    },
  });
  findPasswordWindow.loadURL(`${winURL}#/findPassword`);
  findPasswordWindow.setMenu(null);
  ipcMain.on("minFPwd", () => {
    findPasswordWindow.minimize();
  });
  ipcMain.on("closeFPwd", () => {
    findPasswordWindow.close();
  });
}
ipcMain.on("openFindPassword", () => {
  createFindPasswordWindow();
});
function createHomeWindow() {
  homeWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 1214,
    minWidth: 1200,
    minHeight: 800,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
    },
  });
  homeWindow.loadURL(`${winURL}#/home`);
  homeWindow.setMenu(null);
  homeWindow.on("maximize", () => {
    homeWindow.webContents.send("isMax", true);
  });
  homeWindow.on("unmaximize", () => {
    homeWindow.webContents.send("isMax", false);
  });
  ipcMain.on("minHome", () => {
    homeWindow.minimize();
  });
  ipcMain.on("maxHome", () => {
    homeWindow.maximize();
  });
  ipcMain.on("restoreHome", () => {
    homeWindow.setContentSize(1200, 750);
    homeWindow.center();
  });
  ipcMain.on("closeHome", () => {
    homeWindow.close();
  });
}

ipcMain.on("openHome", () => {
  loginWindow.close();
  createHomeWindow();
});
ipcMain.on("openLogin", () => {
  homeWindow.close();
  createLoginWindow();
});
app.on("ready", createLoginWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (loginWindow === null) {
    createLoginWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
