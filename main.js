// Convenciones de Capitalizacion de Modulos
// Las convenciones tipicas de JavaScript
// Los Modulos con **PascalCase** son Constructores de Clase Instanciables (E.J BrowserWindow, Tray, Notification)
// Los Modulos cob **camelCase** son modulos **NO INSTANCIABLES** (E.J app, ipcRender, webContets)
// [Mas Info](https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app#importing-modules)
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('node:path')

// Se puede importar usando los tipos exactos de modulos
// Para manejar mejor los tipos cuando se usa TypeScript
// Usando su alias (Ej require('electron/main') )
// [Mas Info](https://www.electronjs.org/docs/latest/tutorial/process-model#process-specific-module-aliases-typescript)

const createWindow = () => {
    
    const window = new BrowserWindow({
        with: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    window.loadFile("index.html")

}

ipcMain.handle('current-theme', () => {
    // Si es dark devuelve True
    return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('toggle-theme', () => {
    
    // console.log('Hola, Theme ', nativeTheme.shouldUseDarkColors) Debug 😁

    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
    } else {
        nativeTheme.themeSource = 'dark'
    }

    return nativeTheme.shouldUseDarkColors
})

// Como electron usa la arquitectura asyncrona manejada por eventos de
// node, Cuando las promesas son resueltas el crea la ventana
// [Mas info](https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app#calling-your-function-when-the-app-is-ready)
app.whenReady().then(() => {

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})