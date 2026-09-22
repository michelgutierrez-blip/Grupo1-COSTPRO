export default function NavbarEmpleado({ onToggleMenu }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button
                    className="menu-toggle"
                    id="menuToggle"
                    type="button"
                    onClick={onToggleMenu}
                    aria-label="Abrir o cerrar menú"
                >
                    <span className="menu-icon">☰</span>
                    <span>MENÚ</span>
                </button>
            </div>

            <div className="navbar-right">
                <span className="bienvenida-texto">Bienvenido Empleado</span>

                <div className="usuario-navbar">
                    <span className="icono-usuario">👤</span>
                    <span>Empleado</span>
                </div>
            </div>
        </nav>
    );
}