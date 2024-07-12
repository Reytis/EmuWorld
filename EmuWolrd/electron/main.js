import {app, BrowserWindow, ipcMain, dialog, shell} from "electron"
import {exec, spawn} from 'child_process'
import fs from 'fs-extra'
import path from "path"
import url from 'url'
import log from 'electron-log'
import isDev from 'electron-is-dev';

const DirectoriesJSON = path.join('directories.json');
const SavesDirectoriesJSON = path.join('save_directories.json');

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

log.transports.console.level = 'debug';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: 'public/logo.ico',
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.cjs'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl);

  return mainWindow;  // Return the mainWindow object for use in other functions
}

const proxyPath = isDev ? path.join(__dirname, 'proxy.js') : path.join(__dirname, 'proxy.js').replace('app.asar', 'app.asar.unpacked')

app.on('ready', () => {
  const mainWindow = createWindow();

  // Launch proxy.js as a child process
  const proxyProcess = spawn('node', [proxyPath]);

  // Handle events related to the proxy.js process
  proxyProcess.stdout.on('data', (data) => {
    log.info(`stdout: ${data}`);
    mainWindow.webContents.send('proxy-log', data.toString()); // Send log to renderer
  });

  proxyProcess.stderr.on('data', (data) => {
    log.error(`stderr: ${data}`);
    mainWindow.webContents.send('proxy-log', `ERROR: ${data.toString()}`); // Send error to renderer
  });

  proxyProcess.on('close', (code) => {
    log.info(`child process exited with code ${code}`);
    mainWindow.webContents.send('proxy-log', `Proxy process exited with code ${code}`);
  });

  // Notify renderer that proxy is running
  log.info('proxy-status', 'Proxy process started successfully')
  mainWindow.webContents.send('proxy-status', 'Proxy process started successfully');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

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

ipcMain.handle('add-save-directory', async (event, dirPath) => {
  try {
    // Lire le fichier JSON actuel s'il existe
    let directories = [];
    if (fs.existsSync(SavesDirectoriesJSON)) {
      directories = await fs.readJson(SavesDirectoriesJSON);
    }

    // Ajouter le nouveau répertoire
    if (!directories.includes(dirPath)) {
      directories.push(dirPath);
    }

    // Écrire le tableau dans le fichier JSON
    await fs.writeJson(SavesDirectoriesJSON, directories);

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

ipcMain.handle('remove-save-directory', async (event, dirPath) => {
  try {
    // Lire le fichier JSON actuel s'il existe
    let directories = [];
    if (fs.existsSync(SavesDirectoriesJSON)) {
      directories = await fs.readJson(SavesDirectoriesJSON);
    }

    // Retirer le répertoire de l'array
    const index = directories.indexOf(dirPath);
    if (index !== -1) {
      directories.splice(index, 1);
    }

    // Écrire le tableau mis à jour dans le fichier JSON
    await fs.writeJson(SavesDirectoriesJSON, directories);

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

ipcMain.handle('open-directory', async (event, dirPath) => {
  await shell.openPath(dirPath);
});