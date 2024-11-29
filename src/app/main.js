const { app, BrowserWindow, ipcMain, session } = require ('electron');
const path = require('node:path');
const fs = require('node:fs');

const SCALE = 0.8;
const AUTOSAVE_INTERVAL = 5000; // 5 seconds

let interval;

const requestsFilePath = path.join(app.getPath('userData'), 'requests.json');
let requestsData = {};

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

const readRequestsData = () => {
    try {
        requestsData = JSON.parse(fs.readFileSync(requestsFilePath));
    } catch(error) {
        console.log('No request data loaded');
    }
}

const writeRequestsData = () => {
    try {
        fs.writeFileSync(requestsFilePath, JSON.stringify(requestsData));
    } catch(error) {
        console.error('Failed to save requests data to disk');
    }
}

app.whenReady().then(() => {

    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
            ...details.responseHeaders,
            'Content-Security-Policy': ['connect-src http:', 'script-src \'self\'']
            }
        })
    })

    readRequestsData();

    ipcMain.handle('saveRequest', (event, key, request) => {
        requestsData[key] = request;
    });

    ipcMain.handle('loadRequest', (event, key) => {
        return requestsData[key];
    })

    ipcMain.handle('loadAllRequests', (event) => {
        return requestsData;
    })

    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay();

    interval = setInterval(writeRequestsData, AUTOSAVE_INTERVAL);
    createWindow(primaryDisplay.workAreaSize.width, primaryDisplay.workAreaSize.height);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            interval = setInterval(writeRequestsData, AUTOSAVE_INTERVAL);
            createWindow(primaryDisplay.workAreaSize.width, primaryDisplay.workAreaSize.height);
        }
    });
});

const cleanup = () => {
    writeRequestsData();

    clearInterval(interval);
}

app.on('window-all-closed', () => {

    cleanup();

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', () => {

    cleanup();

    app.quit();
});
