export default function Navbar({ onToggleMenu }) {
  return (
    <header className="navbar">
      <button className="menu-btn" onClick={onToggleMenu}>
        <i className="fa-solid fa-bars"></i>
        MENÚ
      </button>

      <div className="admin-user">
        <span>Bienvenido Administrador</span>
        <i className="fa-regular fa-circle-user"></i>
      </div>
    </header>
  );
}