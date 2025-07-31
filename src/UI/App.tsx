import './App.css'

function App() {

  return (
    <>
      <header>
            <nav className="Themes">
                <div id="theme-toggle">
                    <input type="checkbox" className="checkbox" id="checkbox" />
                    <label htmlFor="checkbox" className="checkbox-label">
                        <i className="fas fa-moon"></i>
                        <i className="fas fa-sun"></i>
                        <span className="ball"></span>
                    </label>
                </div>
            </nav>
        </header>
        <main>
            <h1>Hello from Electron + React</h1>
            <table id="tabla">
                <thead>
                    <tr>
                        <th>Movimiento</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ingreso</td>
                        <td>24-07-2024 12:00:00</td>
                        <td>100000 ➕</td>
                        <td>Sebastian</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total: 100000</th>
                        <td>➕ Nueva Transaccion</td>
                    </tr>
                </tfoot>
            </table>
            <article id="resume">
                <h2>Resumen Financiero</h2>
                <section>
                    <h3>Sebastian</h3>
                    <p>
                        Sebastian lleva un registro positivo con un total de: 100000
                    </p>
                </section>
            </article>
        </main>
        <footer>
            <h2>Versiones:</h2>
            <ul className="versionsList">
                <li id="nodeVersion"></li>
                <li id="chromeVersion"></li>
                <li id="electronVersion"></li>
            </ul>
        </footer>
        <script src="./renderer.js"></script>
    </>
  )
}

export default App
