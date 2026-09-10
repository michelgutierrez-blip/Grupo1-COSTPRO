import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RecuperarContra() {
  const [correo, setCorreo] = useState("");
  const [correoAlterno, setCorreoAlterno] = useState("");

  const navigate = useNavigate();

  const handleRecuperar = (e) => {
    e.preventDefault();

    // Validar correo principal
    if (correo.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Campo obligatorio",
        text: "Debes ingresar tu correo electrónico.",
      });
      return;
    }

    // Validar que tenga formato de correo
    if (!correo.includes("@")) {
      Swal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Ingresa un correo electrónico válido.",
      });
      return;
    }

    // Mensaje de código enviado
    Swal.fire({
      icon: "success",
      title: "Código enviado",
      text: "Hemos enviado un código de verificación a tu correo.",
      timer: 1800,
      showConfirmButton: false,
    }).then(() => {
      // IMPORTANTE:
      // Lleva a la página CodigoVeri.jsx
      navigate("/codigo_veri");
    });
  };

  return (
    <div className="contenedor">
      <div className="login">

        {/* Encabezado */}
        <div className="login-top">
          <img
            src="/img/logo.jpeg"
            alt="Logo de CostPro"
          />

          <h1>CostPro</h1>

          <p>Recuperación de Cuenta</p>
        </div>

        {/* Contenido */}
        <div className="login-body">

          <h2>Recuperar Contraseña</h2>

          <p className="mensaje">
            Ingresa el correo para enviar el código.
          </p>

          <form onSubmit={handleRecuperar}>

            {/* Correo principal */}
            <label htmlFor="correo">
              Correo Electrónico
            </label>

            <div className="input-box">
              <i className="fa-regular fa-envelope"></i>

              <input
                type="email"
                id="correo"
                placeholder="usuario@costpro.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            {/* Correo alterno */}
            <label htmlFor="correoAlterno">
              Correo Alterno
            </label>

            <div className="input-box">
              <i className="fa-solid fa-envelope-circle-check"></i>

              <input
                type="email"
                id="correoAlterno"
                placeholder="Opcional"
                value={correoAlterno}
                onChange={(e) => setCorreoAlterno(e.target.value)}
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="btn-login"
            >
              Enviar Código
            </button>

          </form>

          {/* Volver al login */}
          <div className="links">
            <Link to="/login">
              ← Volver al Inicio
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}