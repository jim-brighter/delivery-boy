const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveRequest: (key, request) => ipcRenderer.invoke('saveRequest', key, request),
    loadRequest: (key) => ipcRenderer.invoke('loadRequest', key)
});
