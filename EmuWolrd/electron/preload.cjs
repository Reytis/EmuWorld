const { contextBridge, ipcRenderer } = require('electron');


//Manege list for different IPC event
contextBridge.exposeInMainWorld('EmulatorOpener', {
  openFile: (filePath) => ipcRenderer.send('open-file', filePath),
  listFiles: (dirPath) => ipcRenderer.invoke('list-files', dirPath),
  getDirectories: () => ipcRenderer.invoke('get-directories'),
  addDirectory: (dirPath) => ipcRenderer.invoke('add-directory', dirPath),
  removeDirectory: (dirPath) => ipcRenderer.invoke('remove-directory', dirPath),
  chooseDirectory: () => ipcRenderer.invoke('choose-directory'),
});

//verify that preload is load
console.log("preload.js loaded");