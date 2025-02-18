const { contextBridge, ipcRenderer } = require('electron');

// Manage list for different IPC events
contextBridge.exposeInMainWorld('EmulatorOpener', {
  openFile: (filePath) => ipcRenderer.send('open-file', filePath),
  listFiles: (dirPath) => ipcRenderer.invoke('list-files', dirPath),
  getDirectories: () => ipcRenderer.invoke('get-directories'),
  addDirectory: (dirPath) => ipcRenderer.invoke('add-directory', dirPath),
  addSaveDirectory: (dirPath) => ipcRenderer.invoke('add-save-directory', dirPath),
  removeDirectory: (dirPath) => ipcRenderer.invoke('remove-directory', dirPath),
  removeSaveDirectory: (dirPath) => ipcRenderer.invoke('remove-save-directory', dirPath),
  chooseDirectory: () => ipcRenderer.invoke('choose-directory'),
  openDirectory: (dirPath) => ipcRenderer.invoke('open-directory', dirPath),
});

ipcRenderer.on('proxy-log', (event, message) => {
  console.log(message);
  const logElement = document.getElementById('log-output');
  logElement.textContent += message + '\n';
});

// Verify that preload is loaded
console.log("preload.js loaded");
