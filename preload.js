const { contextBridge, ipcRenderer } = require('electron')
/*
    Para poder importar modulos en Electron.js hay que tener en cuenta
    Distintas cosas como:
        1. El sistema de gestión de archivos de Electron es distinto
            al de Node.js convencional ya que no Admite Rutas Relativas
            Solo Admite Rutas Absolutas
        2. Por temas de seguridad ni el Renderer como el Preload tiene permisos
            para leer/usar los modulos o sistema de Importe de Node.js
            Solo puede importarse un modulo dentro de el main.js
        3. Por esto las dos soluciones serian:
            - Importar el Modulo dentro de el main y luego invocarlor aqui en el preload
                para exponerlo al renderer
            - Crear la funcion dentro de el preload.js o el Mismo renderer.js
*/

// Funciones Utilitarias

/**
 * Formatea una fecha de un string de fecha (ISO 8601) a un formato legible.
 * Ejemplo: "2025-05-24T12:00" -> "24-07-2025 12:00:00"
 * @param {string} dateString La fecha en formato ISO 8601 "2025-05-24T12:00"
 * @returns {string} La fecha formateada "24-07-2025 12:00:00"
 */
function formatDate(dateString) {
    if (!dateString) {
        return ""
    }

    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}

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

// API para Exponer los datos de Lectura y Escribir datos desde el Proceso Principal

contextBridge.exposeInMainWorld('fsUtils', {
    readData: () => ipcRenderer.invoke('read-data'),
    writeData: (data) => ipcRenderer.invoke('write-data', data),
    formatDate: formatDate,
})

// API para Manejar la Sincronización con el Servidor

contextBridge.executeInMainWorld('syncUtils', {
    sync: (data) => ipcRenderer.invoke('sync-data', data),
})