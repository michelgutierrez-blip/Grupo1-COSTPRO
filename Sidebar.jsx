import { Link } from "react-router-dom";

export default function Sidebar({ abierto, onCerrar, modo = "admin", rutaActiva }) {
  const enlacesAdmin = [
    { to: "/Administrador/panel_principal", icono: "fas fa-home", texto: "Inicio" },
    { to: "/insumos", icono: "fas fa-box", texto: "Insumos" },
    { to: "/productos", icono: "fas fa-cube", texto: "Productos" },
    { to: "/costos", icono: "fas fa-dollar-sign", texto: "Costos" },
    { to: "/ventas", icono: "fas fa-cart-shopping", texto: "Ventas" },
    { to: "/reportes", icono: "fas fa-file-alt", texto: "Reportes" },
    { to: "/equilibrio", icono: "fas fa-scale-balanced", texto: "Equilibrio" },
    { to: "/usuarios", icono: "fas fa-users", texto: "Usuarios" },
    { to: "/analisis", icono: "fas fa-chart-line", texto: "Análisis" },
    { to: "/auditoria", icono: "fas fa-clipboard-list", texto: "Auditoría" },
    { to: "/configuracion", icono: "fas fa-gear", texto: "Configuración" },
  ];

  const enlaces = modo === "empleado" ? [] : enlacesAdmin;

  return (
    <aside className={`sidebar${abierto ? " active" : ""}`}>
      <ul>
        {enlaces.map((enlace) => (
          <li key={enlace.to}>
            <Link
              to={enlace.to}
              className={rutaActiva === enlace.to ? "activo" : ""}
              onClick={onCerrar}
            >
              <i className={enlace.icono}></i>
              {enlace.texto}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/login" onClick={onCerrar}>
            <i className="fas fa-sign-out-alt"></i> Cerrar sesión
          </Link>
        </li>
      </ul>
    </aside>
  );
}
