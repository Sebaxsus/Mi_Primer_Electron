document.getElementById('nodeVersion').innerText = `Node: ${window.versions.node()}`;
document.getElementById('chromeVersion').innerText = `Chrome: ${window.versions.chrome()}`;
document.getElementById('electronVersion').innerText = `Electron: ${window.versions.electron()}`;

const checkTheme = async () => {
    await window.darkMode.theme() ? document.getElementById('theme-toggle').checked = true : document.getElementById('theme-toggle').checked = false
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

    if (result.success) {
        console.log('Datos guardados exitosamente.')
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

    Ahorros.map( (row, index) => {
        document.getElementById('tablaBody').innerHTML += `<tr><td>${row.movimiento}</td><td>${row.fecha}</td><td>${row.monto} ${row.movimiento === "Ingreso" ? "➕" : "➖"}</td><td>${row.usuario}</td></tr>`
    })


})

checkTheme()