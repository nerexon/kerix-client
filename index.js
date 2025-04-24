const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

async function load () {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload/preload.js')
    },
    
  })

  win.removeMenu()
  win.loadFile('app/loading.html')
  //win.webContents.openDevTools()
}

app.whenReady().then(async () => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  await load()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    process.exit(0)
  }
})