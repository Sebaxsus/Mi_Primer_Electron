document.getElementById('nodeVersion').innerText = `Node: ${window.versions.node()}`;
document.getElementById('chromeVersion').innerText = `Chrome: ${window.versions.chrome()}`;
document.getElementById('electronVersion').innerText = `Electron: ${window.versions.electron()}`;

const checkTheme = async () => {
    await window.darkMode.theme() ? document.getElementById('checkbox').checked = true : document.getElementById('checkbox').checked = false
}

document.getElementById('theme-toggle').addEventListener('click', async () => {
    // No se como funciona pero siempre entra 💀
    // Y lo que menos tiene sentido es que entra cuando `checked` no es true 🤷‍♂️.

    // Como sea, Esto soluciona el problema de que se active el evento de el click dos veces
    // Ni idea porque pasa eso.
    if (document.getElementById('checkbox').checked) {
        const isDarkMode = await window.darkMode.toggle()
        console.log('Se cambio el tema a ', isDarkMode ? 'Dark' : 'Light', isDarkMode, ' Checked? ', document.getElementById('checkbox').checked)
        isDarkMode ? document.getElementById('checkbox').checked = true : document.getElementById('checkbox').checked = false
    }
})

checkTheme()