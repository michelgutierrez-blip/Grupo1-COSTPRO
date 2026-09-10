import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CodigoVeri() {
  const [codigo, setCodigo] = useState("");

  const navigate = useNavigate();

  const handleConfirmar = (e) => {
    e.preventDefault();

    if (codigo.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Campo obligatorio",
        text: "Debes ingresar el código de verificación.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Código confirmado",
      text: "El código ha sido verificado correctamente.",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate("/cambiar_contrasenia");
    });
  };

  return (
    <div className="contenedor">
      <div className="login">

        <div className="login-top">
          <img
            src="/img/logo.jpeg"
            alt="Logo de CostPro"
          />

          <h1>CostPro</h1>

          <p>Sistema de Costos de Producción</p>
        </div>

        <div className="login-body">

          <h2>Verificar Código</h2>

          <p className="mensaje">
            Ingresa el código enviado a tu correo electrónico.
          </p>

          <form onSubmit={handleConfirmar}>

            <label htmlFor="codigo">
              Código de Verificación
            </label>

            <div className="input-box">
              <i className="fa-solid fa-shield-halved"></i>

              <input
                type="text"
                id="codigo"
                placeholder="Ingrese el código"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-login"
            >
              Confirmar Código
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}