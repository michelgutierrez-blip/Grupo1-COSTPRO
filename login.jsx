import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

<img
    src="/img/logo.jpeg"
    alt="Logo de CostPro"
/>

export default function Login() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [recordar, setRecordar] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

    // Validar campos
    if (!correo || !password) {
    Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Debes completar todos los campos.",
    });

    return;
    }

    // Usuarios de prueba
    const usuarios = [
    {
        correo: "admin@costpro.com",
        password: "Admin123",
        rol: "admin",
    },
    {
        correo: "empleado@costpro.com",
        password: "Empleado123",
        rol: "empleado",
    },
    ];

    // Buscar usuario por correo
    const usuario = usuarios.find(
        (u) => u.correo.toLowerCase() === correo.toLowerCase()
    );

    // Validar correo
    if (!usuario) {
        Swal.fire({
        icon: "error",
        title: "Correo incorrecto",
        text: "El correo ingresado no existe.",
    });

        return;
    }

    // Validar contraseña
    if (usuario.password !== password) {
    Swal.fire({
        icon: "error",
        title: "Contraseña incorrecta",
        text: "La contraseña ingresada no es correcta.",
    });

        return;
    }

    // Guardar información del usuario
    localStorage.setItem("usuario", usuario.rol);
    localStorage.setItem("correoUsuario", usuario.correo);

    // Si seleccionó recordar, guardar una marca
    if (recordar) {
        localStorage.setItem("recordarUsuario", "true");
    } else {
        localStorage.removeItem("recordarUsuario");
    }

    // Mensaje de bienvenida
    Swal.fire({
        icon: "success",
        title: "¡Bienvenido a CostPro!",
        text: "Has iniciado sesión correctamente.",
        timer: 1500,
        showConfirmButton: false,
    }).then(() => {
      // Redireccionar dependiendo del rol
        if (usuario.rol === "admin") {
        navigate("/panel_principal");
        } else {
        navigate("/empleado/panel_principal");
        }
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

            <h2>Iniciar Sesión</h2>

            <form onSubmit={handleLogin}>

            {/* CORREO */}
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
            />

            </div>

            {/* CONTRASEÑA */}
            <label htmlFor="password">
                Contraseña
            </label>

            <div className="input-box">

                <i className="fa-solid fa-lock"></i>

            <input
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            </div>

            {/* OPCIONES */}
            <div className="opciones">

            <label>
                <input
                    type="checkbox"
                    checked={recordar}
                    onChange={(e) => setRecordar(e.target.checked)}
                />

                Recordar
            </label>

            <Link to="/recuperar_contra">
                ¿Olvidó su contraseña?
            </Link>

            </div>

            {/* BOTÓN */}
            <button
                type="submit"
                className="btn-login"
            >
                Ingresar
            </button>

            {/* REGISTRO */}
            <div className="registro">

            <p>
                ¿No tienes cuenta?

                <Link to="/registro">
                    Crear cuenta
                </Link>
            </p>

            </div>

        </form>

          {/* USUARIOS DE PRUEBA */}
        <div className="usuarios">

            <p>
                <strong>Usuarios de prueba</strong>
            </p>

            <p>
                Administrador → admin@costpro.com
            </p>

            <p>
                Empleado → empleado@costpro.com
            </p>

            <p>
                <strong>Contraseñas:</strong>
            </p>

            <p>Admin123</p>

            <p>Empleado123</p>

        </div>

        </div>

        </div>
    </div>
);
}