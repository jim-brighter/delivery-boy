const { app, BrowserWindow, ipcMain } = require ('electron');
const path = require('node:path');

const SCALE = 0.8;

const createWindow = (width, height) => {
    const win = new BrowserWindow({
        width: Math.floor(SCALE * width),
        height: Math.floor(SCALE * height),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong');

    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay();

    createWindow(primaryDisplay.workAreaSize.width, primaryDisplay.workAreaSize.height);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow(primaryDisplay.workAreaSize.width, primaryDisplay.workAreaSize.height);
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
