import { NavLink, useNavigate } from "react-router-dom";

export default function SidebarEmpleado({ abierto = false, setAbierto }) {

    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("rol");
        localStorage.removeItem("correo");
        localStorage.removeItem("recordar");

        navigate("/login");
    };

    const cerrarMenu = () => {
        if (setAbierto) {
            setAbierto(false);
        }
    };

    return (
        <aside
            className={`sidebar ${abierto ? "active" : ""}`}
            id="sidebar"
            aria-expanded={abierto}
            style={{
                left: abierto ? "0" : "-220px",
                transition: "left 0.3s ease",
                position: "fixed",
                top: "60px",
                width: "210px",
                height: "100%",
                zIndex: 900,
                background: "linear-gradient(180deg, #2f8a7d, #1b6d63)",
                paddingTop: "15px"
            }}
        >

            <ul className="menu">

                {/* PANEL PRINCIPAL */}
                <li>
                    <NavLink
                        to="/empleado/panel_principal"
                        className={({ isActive }) =>
                            isActive ? "activo" : ""
                        }
                        onClick={cerrarMenu}
                    >
                        <span>🏠</span>
                        Panel principal
                    </NavLink>
                </li>

                {/* INSUMOS */}
                <li>
                    <NavLink
                        to="/empleado/insumos"
                        className={({ isActive }) =>
                            isActive ? "activo" : ""
                        }
                        onClick={cerrarMenu}
                    >
                        <span>📦</span>
                        Insumos
                    </NavLink>
                </li>

                {/* PRODUCTOS */}
                <li>
                    <NavLink
                        to="/empleado/productos"
                        className={({ isActive }) =>
                            isActive ? "activo" : ""
                        }
                        onClick={cerrarMenu}
                    >
                        <span>🧴</span>
                        Productos
                    </NavLink>
                </li>

                {/* COSTOS */}
                <li>
                    <NavLink
                        to="/empleado/costos"
                        className={({ isActive }) =>
                            isActive ? "activo" : ""
                        }
                        onClick={cerrarMenu}
                    >
                        <span>💰</span>
                        Costos
                    </NavLink>
                </li>

                {/* PRODUCCIÓN */}
                <li>
                    <NavLink
                        to="/empleado/produccion"
                        className={({ isActive }) =>
                            isActive ? "activo" : ""
                        }
                        onClick={cerrarMenu}
                    >
                        <span>🏭</span>
                        Producción
                    </NavLink>
                </li>

                {/* REPORTES */}
                <li>
                    <NavLink
                        to="/empleado/reportes"
                        className={({ isActive }) =>
                            isActive ? "activo" : ""
                        }
                        onClick={cerrarMenu}
                    >
                        <span>📊</span>
                        Reportes
                    </NavLink>
                </li>

            </ul>

            {/* CERRAR SESIÓN */}
            <div className="sidebar-footer">

                <button
                    type="button"
                    className="btn-cerrar-sesion"
                    onClick={cerrarSesion}
                >
                    <span>🚪</span>
                    Cerrar sesión
                </button>

            </div>

        </aside>
    );
}