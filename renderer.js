// Aqui no se puede usar el Require para importar modulos por temas de seguridad
// En caso de necesitarlo solo para Desarrollo (Por temas de Seguridad), Se debe
// Activar la opcion 'nodeIntegration' en el main.js dentro de la Intancia de el Window,
// La unica manera de poder usar importes de modulos es dentro de el main.js
document.getElementById('nodeVersion').innerText = `Node: ${window.versions.node()}`;
document.getElementById('chromeVersion').innerText = `Chrome: ${window.versions.chrome()}`;
document.getElementById('electronVersion').innerText = `Electron: ${window.versions.electron()}`;

const checkTheme = async () => {
    await window.darkMode.theme() ? document.getElementById('theme-toggle').checked = true : document.getElementById('theme-toggle').checked = false
}

// Funcion para centralizar las Notificaciones
function noticacion(titulo, cuerpo) {
    new window.Notification(titulo, { body: cuerpo}).onclick = () => {
        console.log('Boton Mensage clickeado!')
    }
}

document.getElementById('notificationBtn').addEventListener('click', async () => {
    new window.Notification('Notificacion desde Electron', { body: "Hiciste Click en el Boton"}).onclick = () => {
        console.log('Boton Mensage clickeado!')
    }
})

// Logica para cambiar la clase de el Modal de "modal hidden" a "modal"
document.getElementById("botonModal").addEventListener("click", () => {
    document.getElementById("modal").classList.remove('hidden')
})

// Logica para agregarle la clase "hidden" a el modal
function agregarClaseHidden() {
    const modalElement = document.getElementById("modal").classList
    if (modalElement.contains("hidden")) {
        null
    } else {
        modalElement.add('hidden')
    }
}

// Logica para agregar los datos de el JSON a la Tabla

function actualizarTabla(ahorrosData) {

    const tablaBody = document.getElementById('tablaBody')
    let total = 0
    let montoIcon = ""
    
    // Limpiando la Tabla para evitar Errores y Duplicados
    tablaBody.innerHTML = ""
    // Validando que ahorrosData sea distindo a null y que sea un objeto tipo Array
    if (ahorrosData && Array.isArray(ahorrosData)) {
        
        ahorrosData.map( async (row, index) => {

            const formattedDate = await window.fsUtils.formatDate(row.fecha)
            /* Que en Intl.NumberFormat:
                Es un objeto Nativo de JS el cual permite formatear los numeros sensible al Idioma
                Es decir que permite establecer un Formato dependiendo de como se manejen los Numeros
                en Dicho idioma.

                Ademas Permite Establecer si: 
                    el Numero es una Moneda (style),
                    Que tipo de Moneda (currency) usando los Codigos de Moneda **ISO 4217**,
                    Como mostrar el Tipo de Moneda (currencyDisplay) code, symbol, narrowSymbol, name,
                    fraccionMinima de Digitos (decimales 1,000.00),
                    fraccionMaxima de Digitos (ecimales 1,000.0000)

                [Mas Info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
                [Locale Options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#locale_options)
                [Style Formats](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#style_options)
                [Currency Format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#currency)
            */

            if (row.movimiento.toLowerCase() === "ingreso") {
                montoIcon = "➕"
                total += row.monto
            } else {
                montoIcon = "➖"
                total -= row.monto
            }
            
            tablaBody.innerHTML += `
                <tr>
                    <td>${row.movimiento}</td>
                    <td>${formattedDate}</td>
                    <td>${Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', currencyDisplay: 'code', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(row.monto)} ${montoIcon}</td>
                    <td>${row.usuario}</td>
                </tr>
            `
            
        })
        
        document.getElementById('tablaTotal').innerText = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', currencyDisplay: 'code', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(total)
    }

}

Array.from(document.getElementsByClassName("cerrarModal")).forEach(element => {
    element.addEventListener('click', agregarClaseHidden)
});


document.getElementById('theme-toggle').addEventListener('change', async () => {

    const isDarkMode = await window.darkMode.toggle()
    console.log('Se cambio el tema a ', isDarkMode ? 'Dark' : 'Light')

    // isDarkMode ? document.getElementById('theme-toggle').checked = true : document.getElementById('theme-toggle').checked = false

    // No se como funciona pero siempre entra 💀
    // Y lo que menos tiene sentido es que entra cuando `checked` no es true 🤷‍♂️.

    // Como sea, Esto soluciona el problema de que se active el evento de el click dos veces
    // Ni idea porque pasa eso.
    // if (document.getElementById('checkbox').checked) {
    //     const isDarkMode = await window.darkMode.toggle()
    //     console.log('Se cambio el tema a ', isDarkMode ? 'Dark' : 'Light', isDarkMode, ' Checked? ', document.getElementById('checkbox').checked)
    //     isDarkMode ? document.getElementById('checkbox').checked = true : document.getElementById('checkbox').checked = false
    // }
})

const loadData = async () => {
    const data = await window.fsUtils.readData()
    console.log('Datos Cargados: ', data)
    return data
}

const saveData = async (newData) => {
    const result = await window.fsUtils.writeData(newData)

    console.log("Resultado Escritura: ", result)

    if (result.success) {
        console.log('Datos guardados exitosamente.')
        // Ocultando el modal
        agregarClaseHidden()
        // Actualizando la Tabla
        actualizarTabla(newData.Ahorros)
        // Iniciando el intento de Sincronización en segundo plano
        const syncResult = await window.syncUtils.sync(newData)
        console.log(`Resultado de la Syncronización: ${syncResult}`)
    } else {
        console.error('Error al guardar los datos:', result.error)
    }
}

// Cargar los datos de el JSON Cuando la Pagina este Lista
document.addEventListener('DOMContentLoaded', async () => {
    const myData = await loadData()
    const {
        Ahorros,
        Facturas,
        Arriendo
    } = {...myData}

    console.log("Datos actuales: ", {...myData}, '\nAhorros: ', Ahorros.keys(), '\nFacturas: ', Facturas, '\nArriendo: ', Arriendo)

    actualizarTabla(Ahorros)
})

// Event Listener de el Formulario para actualizar los Datos Locales
document.getElementById("formulario").addEventListener('submit', async (e) => {
    e.preventDefault() // Previene el comportamiento por defecto de un elemento Form HTML
    const formData = new FormData(e.target)
    const now = new Date().toISOString()

    console.log("Datos crudos de el Formulario: ", formData)

    const newTransaction = {
        movimiento: formData.get('movimiento'),
        fecha: formData.get('fecha'),
        monto: Number(formData.get('monto')),
        usuario: formData.get('usuario'),
        timestamp: now,
        syncStatus: 'pending',
    }

    const myData = await loadData() // Cargo los datos almacenados actualmente

    myData.Ahorros.push(newTransaction) // Agrego los Nuevos Datos (Obj) a el Arreglo Ahorros

    await saveData(myData)

}) 

checkTheme()