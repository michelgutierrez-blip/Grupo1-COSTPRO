import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Registro() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [correoAlterno, setCorreoAlterno] = useState("");
    const [terminos, setTerminos] = useState(false);

    const navigate = useNavigate();

    const handleRegistro = (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (
        !nombre ||
        !apellido ||
        !usuario ||
        !correo ||
        !password
    ) {
        Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Debes completar todos los campos obligatorios.",
        });

        return;
    }

    // Validar términos y condiciones
    if (!terminos) {
        Swal.fire({
            icon: "warning",
            title: "Términos y condiciones",
            text: "Debes aceptar términos y condiciones.",
        });

        return;
    }

    // Guardar los datos del usuario
    const nuevoUsuario = {
        nombre,
        apellido,
        usuario,
        correo,
        password,
        correoAlterno,
    };

    localStorage.setItem(
        "usuarioRegistrado",
        JSON.stringify(nuevoUsuario)
    );

    // Mensaje de éxito
    Swal.fire({
        icon: "success",
        title: "¡Cuenta creada!",
        text: "Tu cuenta se ha creado correctamente.",
        timer: 1800,
        showConfirmButton: false,
    }).then(() => {
        navigate("/login");
    });
};

    return (
        <section className="contenedor">

            <div className="formulario">

        {/* LOGO */}
        <img
            src="/img/logo.jpeg"
            alt="Logo CostPro"
            className="logo"
        />

        <h2>Crear cuenta</h2>

        {/* FORMULARIO */}
        <form onSubmit={handleRegistro}>

          {/* NOMBRE */}
        <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
        />

          {/* APELLIDO */}
        <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
        />

          {/* USUARIO */}
        <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
        />

          {/* CORREO */}
        <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
        />

          {/* CONTRASEÑA */}
        <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />

          {/* CORREO ALTERNO */}
        <input
            type="email"
            placeholder="Correo alterno"
            value={correoAlterno}
            onChange={(e) => setCorreoAlterno(e.target.value)}
        />

          {/* TÉRMINOS */}
        <div className="check">

            <input
                type="checkbox"
                id="terminos"
                checked={terminos}
                onChange={(e) => setTerminos(e.target.checked)}
            />

            <label htmlFor="terminos">
                Acepto términos y condiciones
            </label>

        </div>

          {/* BOTÓN */}
        <button
            type="submit"
            className="btn-registrarse"
        >
            Registrarse
        </button>

          {/* LINK LOGIN */}
        <div className="links">

            <Link to="/login">
                ¿Ya tienes cuenta? Inicia sesión
            </Link>

        </div>

        </form>

    </div>

    </section>
);
}

