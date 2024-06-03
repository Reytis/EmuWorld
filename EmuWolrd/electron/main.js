import {app, BrowserWindow, ipcMain, dialog} from "electron"
import {exec} from 'child_process'
import fs from 'fs-extra'
import path from "path"
import url from 'url'

const DirectoriesJSON = path.join('directories.json');

const currentDir = path.dirname(new URL(import.meta.url).pathname);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.resolve(currentDir.substring(3), 'preload.cjs'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(currentDir, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl);
  //mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('open-file', (event, filePath) => {
  const command = `start "" "${filePath}"`;
  exec(command, (err) => {
    if (err) {
      console.log(`Erreur lors de l'ouverture du fichier: ${err, filePath}`)
    }
  })
})


ipcMain.handle('list-files', async (event, dirPath) => {
  const absoluteDirPath = path.resolve(app.getAppPath(), 'public', dirPath);
  return new Promise((resolve, reject) => {
    // Read the directory to list file
    fs.readdir(absoluteDirPath, (err, files) => {
      if (err) {
        reject(`Erreur lors de la lecture du répertoire: ${err.message}`);
      } else {
        resolve(files);
      }
    })
  })
})

ipcMain.handle('get-directories', async () => {
  try {
    // Lire le fichier JSON s'il existe
    if (fs.existsSync(DirectoriesJSON)) {
      const directories = await fs.readJson(DirectoriesJSON);
      return directories;
    } else {
      return []; // Retourner un tableau vide si le fichier n'existe pas
    }
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier JSON :', error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
})

ipcMain.handle('add-directory', async (event, dirPath) => {
  try {
    // Lire le fichier JSON actuel s'il existe
    let directories = [];
    if (fs.existsSync(DirectoriesJSON)) {
      directories = await fs.readJson(DirectoriesJSON);
    }

    // Ajouter le nouveau répertoire
    if (!directories.includes(dirPath)) {
      directories.push(dirPath);
    }

    // Écrire le tableau dans le fichier JSON
    await fs.writeJson(DirectoriesJSON, directories);

    // Retourner le tableau mis à jour
    return directories;
  } catch (error) {
    console.error('Erreur lors de l\'écriture du fichier JSON :', error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
})

ipcMain.handle('remove-directory', async (event, dirPath) => {
  try {
    // Lire le fichier JSON actuel s'il existe
    let directories = [];
    if (fs.existsSync(DirectoriesJSON)) {
      directories = await fs.readJson(DirectoriesJSON);
    }

    // Retirer le répertoire de l'array
    const index = directories.indexOf(dirPath);
    if (index !== -1) {
      directories.splice(index, 1);
    }

    // Écrire le tableau mis à jour dans le fichier JSON
    await fs.writeJson(DirectoriesJSON, directories);

    // Retourner le tableau mis à jour
    return directories;
  } catch (error) {
    console.error('Erreur lors de la suppression du répertoire :', error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
})

ipcMain.handle('choose-directory', async () => {
  //open pick directory like input[type:file] but for select a folder path
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  return result;
});
