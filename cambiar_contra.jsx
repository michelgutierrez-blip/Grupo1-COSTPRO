import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CambiarContrasenia() {
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const navigate = useNavigate();

  const handleCambio = (e) => {
    e.preventDefault();

    // Validar campos
    if (nueva.trim() === "" || confirmar.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Debes completar todos los campos.",
      });
      return;
    }

    // Validar que las contraseñas coincidan
    if (nueva !== confirmar) {
      Swal.fire({
        icon: "error",
        title: "Contraseñas diferentes",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    // Guardar la nueva contraseña
    const usuarioRegistrado = JSON.parse(
      localStorage.getItem("usuarioRegistrado")
    );

    if (usuarioRegistrado) {
      usuarioRegistrado.password = nueva;

      localStorage.setItem(
        "usuarioRegistrado",
        JSON.stringify(usuarioRegistrado)
      );
    }

    Swal.fire({
      icon: "success",
      title: "¡Contraseña actualizada!",
      text: "Tu contraseña se ha cambiado correctamente.",
      timer: 1800,
      showConfirmButton: false,
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="contenedor">
      <div className="login">

        {/* ENCABEZADO */}
        <div className="login-top">
          <img
            src="/img/logo.jpeg"
            alt="Logo de CostPro"
          />

          <h1>CostPro</h1>

          <p>Sistema de Costos de Producción</p>
        </div>

        {/* FORMULARIO */}
        <div className="login-body">

          <h2>Cambiar Contraseña</h2>

          <p className="mensaje">
            Crea una nueva contraseña para continuar.
          </p>

          <form onSubmit={handleCambio}>

            <label htmlFor="nueva">
              Nueva Contraseña
            </label>

            <div className="input-box">
              <i className="fa-solid fa-lock"></i>

              <input
                type="password"
                id="nueva"
                placeholder="Nueva contraseña"
                value={nueva}
                onChange={(e) => setNueva(e.target.value)}
                required
              />
            </div>

            <label htmlFor="confirmar">
              Confirmar Contraseña
            </label>

            <div className="input-box">
              <i className="fa-solid fa-lock"></i>

              <input
                type="password"
                id="confirmar"
                placeholder="Confirmar contraseña"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-login"
            >
              Guardar Cambios
            </button>

          </form>

          <div className="links">
            <Link to="/login">
              ← Volver al inicio
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}