const { contextBridge, ipcRenderer } = require('electron')

// API de Electron para Exponer las Versiones de Node, Chrome y Electron JS

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
})

// API para Exponer los Metodos para manejar el Sistema de Temas de el Proceso Principal 

contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('toggle-theme'),
    theme: () => ipcRenderer.invoke('current-theme'),
})

// API para Exponer los datos de Lectura y EScribir datos desde el Proceso Principal

contextBridge.exposeInMainWorld('fsUtils', {
    readData: () => ipcRenderer.invoke('read-data'),
    writeData: (data) => ipcRenderer.invoke('write-data', data),
})