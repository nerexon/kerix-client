const { app, BrowserWindow } = require('electron/main')
const path = require('node:path');

async function load () {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

let win;

function createWindow (config) {
  if(!config.path) throw new Error("No path provided")
  config.frame = config.frame !== null && config.frame !== undefined ? config.frame : true

  win = new BrowserWindow({
    width: config.width || 800,
    height: config.height || 600,
    frame: config.frame,
    title: "Kerix",
    autoHideMenuBar: true,
    webPreferences: {
      preload: config.preload ?? null
    }
  })

  win.loadFile(config.path)
  return win;
}

app.whenReady().then(async () => {
  createWindow({path: "app/loading.html", frame: false, width: 550, height: 350})

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow({path: "app/loading.html", frame: false})
    }
  })

  await load()
  win.close()
  createWindow({path: "app/app.html", preload: path.join(__dirname, 'preload/app_preload.js')})
  win.webContents.openDevTools()
  win.maximize()
  
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    process.exit(0)
  }
})