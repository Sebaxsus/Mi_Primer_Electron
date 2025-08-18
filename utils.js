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

module.exports = { 
    formatDate: formatDate,
}