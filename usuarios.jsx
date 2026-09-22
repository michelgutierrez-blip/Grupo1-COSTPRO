import { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/admin.css";

export default function Usuarios() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: "Administrador",
      apellido: "CostPro",
      correo: "admin@costpro.com",
      password: "Admin123",
      rol: "Administrador",
      estado: "Activo",
      fecha: "10/09/2026",
    },
    {
      id: 2,
      nombre: "Empleado",
      apellido: "CostPro",
      correo: "empleado@costpro.com",
      password: "Empleado123",
      rol: "Empleado",
      estado: "Activo",
      fecha: "10/09/2026",
    },
  ]);

  const [busqueda, setBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);

  const [modoEdicion, setModoEdicion] = useState(false);

  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    rol: "Empleado",
    estado: "Activo",
  });

  /* =====================================================
     FILTRAR USUARIOS
     ===================================================== */

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const texto = busqueda.toLowerCase();

    return (
      usuario.nombre.toLowerCase().includes(texto) ||
      usuario.apellido.toLowerCase().includes(texto) ||
      usuario.correo.toLowerCase().includes(texto) ||
      usuario.rol.toLowerCase().includes(texto)
    );
  });

  /* =====================================================
     RESUMEN
     ===================================================== */

  const totalUsuarios = usuarios.length;

  const administradores = usuarios.filter(
    (usuario) => usuario.rol === "Administrador"
  ).length;

  const empleados = usuarios.filter(
    (usuario) => usuario.rol === "Empleado"
  ).length;

  const usuariosActivos = usuarios.filter(
    (usuario) => usuario.estado === "Activo"
  ).length;

  /* =====================================================
     ABRIR MODAL NUEVO
     ===================================================== */

  const nuevoUsuario = () => {
    setModoEdicion(false);
    setUsuarioEditando(null);

    setFormulario({
      nombre: "",
      apellido: "",
      correo: "",
      password: "",
      rol: "Empleado",
      estado: "Activo",
    });

    setMostrarModal(true);
  };

  /* =====================================================
     ABRIR MODAL EDITAR
     ===================================================== */

  const editarUsuario = (usuario) => {
    setModoEdicion(true);
    setUsuarioEditando(usuario);

    setFormulario({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      password: "",
      rol: usuario.rol,
      estado: usuario.estado,
    });

    setMostrarModal(true);
  };

  /* =====================================================
     CAMBIOS DEL FORMULARIO
     ===================================================== */

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  /* =====================================================
     GUARDAR USUARIO
     ===================================================== */

  const guardarUsuario = (e) => {
    e.preventDefault();

    /* VALIDACIÓN */

    if (
      !formulario.nombre ||
      !formulario.apellido ||
      !formulario.correo ||
      !formulario.rol ||
      (!modoEdicion && !formulario.password)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Debes completar todos los campos obligatorios.",
      });

      return;
    }

    /* =================================================
       EDITAR USUARIO
       ================================================= */

    if (modoEdicion) {
      const usuariosActualizados = usuarios.map((usuario) =>
        usuario.id === usuarioEditando.id
          ? {
              ...usuario,

              nombre: formulario.nombre,
              apellido: formulario.apellido,
              correo: formulario.correo,
              rol: formulario.rol,
              estado: formulario.estado,

              // Si se escribe una nueva contraseña,
              // se actualiza. Si queda vacía,
              // se conserva la anterior.
              password: formulario.password
                ? formulario.password
                : usuario.password,
            }
          : usuario
      );

      setUsuarios(usuariosActualizados);

      setMostrarModal(false);

      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        text: "Los datos del usuario fueron actualizados correctamente.",
        timer: 1600,
        showConfirmButton: false,
      });

      return;
    }

    /* =================================================
       CREAR USUARIO
       ================================================= */

    const nuevo = {
      id: Date.now(),
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      correo: formulario.correo,
      password: formulario.password,
      rol: formulario.rol,
      estado: formulario.estado,
      fecha: new Date().toLocaleDateString("es-CO"),
    };

    setUsuarios([...usuarios, nuevo]);

    setMostrarModal(false);

    Swal.fire({
      icon: "success",
      title: "Usuario registrado",
      text: "El nuevo usuario fue registrado correctamente.",
      timer: 1600,
      showConfirmButton: false,
    });
  };

  /* =====================================================
     ELIMINAR USUARIO
     ===================================================== */

  const eliminarUsuario = (usuario) => {
    if (usuario.rol === "Administrador") {
      Swal.fire({
        icon: "warning",
        title: "No se puede eliminar",
        text: "El usuario administrador principal no puede ser eliminado.",
      });

      return;
    }

    Swal.fire({
      icon: "warning",
      title: "¿Eliminar usuario?",
      text: `Se eliminará a ${usuario.nombre} ${usuario.apellido}.`,
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        setUsuarios(
          usuarios.filter((u) => u.id !== usuario.id)
        );

        Swal.fire({
          icon: "success",
          title: "Usuario eliminado",
          text: "El usuario fue eliminado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  /* =====================================================
     CAMBIAR ESTADO
     ===================================================== */

  const cambiarEstado = (usuario) => {
    if (usuario.rol === "Administrador") {
      Swal.fire({
        icon: "info",
        title: "Administrador principal",
        text: "El administrador principal debe permanecer activo.",
      });

      return;
    }

    const nuevoEstado =
      usuario.estado === "Activo" ? "Inactivo" : "Activo";

    setUsuarios(
      usuarios.map((u) =>
        u.id === usuario.id
          ? { ...u, estado: nuevoEstado }
          : u
      )
    );
  };

  /* =====================================================
     CERRAR MODAL
     ===================================================== */

  const cerrarModal = () => {
    setMostrarModal(false);

    setFormulario({
      nombre: "",
      apellido: "",
      correo: "",
      password: "",
      rol: "Empleado",
      estado: "Activo",
    });

    setModoEdicion(false);
    setUsuarioEditando(null);
  };

  return (
    <div className="admin-panel">

      {/* =================================================
          NAVBAR
          ================================================= */}

      <Navbar
        onToggleMenu={() => setMenuAbierto(!menuAbierto)}
      />

      {/* =================================================
          SIDEBAR
          ================================================= */}

      <Sidebar
        abierto={menuAbierto}
        onCerrar={() => setMenuAbierto(false)}
      />

      {/* =================================================
          CONTENIDO
          ================================================= */}

      <main>

        <div className="header">

          <h1>
            <i className="fas fa-users"></i>
            Usuarios y Roles
          </h1>

          <p>
            Administra los usuarios que tienen acceso al
            sistema CostPro
          </p>

        </div>

        {/* =================================================
            TARJETAS DE RESUMEN
            ================================================= */}

        <div className="resumen-usuarios">

          <div className="tarjeta-usuario resumen-usuario-verde">

            <div className="icono-resumen-usuario">
              <i className="fas fa-users"></i>
            </div>

            <div>

              <span>Total usuarios</span>

              <strong>
                {totalUsuarios}
              </strong>

              <small>
                Registrados en el sistema
              </small>

            </div>

          </div>

          <div className="tarjeta-usuario resumen-usuario-azul">

            <div className="icono-resumen-usuario">
              <i className="fas fa-user-shield"></i>
            </div>

            <div>

              <span>Administradores</span>

              <strong>
                {administradores}
              </strong>

              <small>
                Con acceso administrativo
              </small>

            </div>

          </div>

          <div className="tarjeta-usuario resumen-usuario-amarillo">

            <div className="icono-resumen-usuario">
              <i className="fas fa-user"></i>
            </div>

            <div>

              <span>Empleados</span>

              <strong>
                {empleados}
              </strong>

              <small>
                Usuarios operativos
              </small>

            </div>

          </div>

          <div className="tarjeta-usuario resumen-usuario-rojo">

            <div className="icono-resumen-usuario">
              <i className="fas fa-user-check"></i>
            </div>

            <div>

              <span>Usuarios activos</span>

              <strong>
                {usuariosActivos}
              </strong>

              <small>
                Con acceso actualmente
              </small>

            </div>

          </div>

        </div>

        {/* =================================================
            SECCIÓN USUARIOS
            ================================================= */}

        <section className="seccion usuarios-seccion">

          <div className="seccion-head">

            <div>

              <h2>
                <i className="fas fa-user-gear"></i>
                Usuarios registrados
              </h2>

              <p>
                Consulta, edita o administra los usuarios
                del sistema
              </p>

            </div>

            <button
              className="btn-primario"
              onClick={nuevoUsuario}
            >
              <i className="fas fa-user-plus"></i>
              Nuevo usuario
            </button>

          </div>

          {/* =================================================
              BUSCADOR
              ================================================= */}

          <div className="buscador-usuarios">

            <i className="fas fa-search"></i>

            <input
              type="text"
              placeholder="Buscar usuario por nombre, correo o rol..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(e.target.value)
              }
            />

          </div>

          {/* =================================================
              TABLA
              ================================================= */}

          <div className="tabla-usuarios-wrap">

            <table className="tabla-usuarios">

              <thead>

                <tr>
                  <th>Usuario</th>
                  <th>Correo electrónico</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Fecha de registro</th>
                  <th>Acciones</th>
                </tr>

              </thead>

              <tbody>

                {usuariosFiltrados.length > 0 ? (

                  usuariosFiltrados.map((usuario) => (

                    <tr key={usuario.id}>

                      {/* USUARIO */}

                      <td>

                        <div className="usuario-info">

                          <div className="avatar-usuario">

                            {usuario.nombre
                              .charAt(0)
                              .toUpperCase()}

                          </div>

                          <div>

                            <strong>
                              {usuario.nombre}{" "}
                              {usuario.apellido}
                            </strong>

                            <small>
                              ID #{usuario.id}
                            </small>

                          </div>

                        </div>

                      </td>

                      {/* CORREO */}

                      <td>

                        <span className="correo-usuario">

                          <i className="fas fa-envelope"></i>

                          {usuario.correo}

                        </span>

                      </td>

                      {/* ROL */}

                      <td>

                        {usuario.rol === "Administrador" ? (

                          <span className="badge-rol badge-admin">

                            <i className="fas fa-shield-halved"></i>

                            Administrador

                          </span>

                        ) : (

                          <span className="badge-rol badge-empleado">

                            <i className="fas fa-user"></i>

                            Empleado

                          </span>

                        )}

                      </td>

                      {/* ESTADO */}

                      <td>

                        <button
                          className={`estado-usuario ${
                            usuario.estado === "Activo"
                              ? "estado-activo"
                              : "estado-inactivo"
                          }`}
                          onClick={() =>
                            cambiarEstado(usuario)
                          }
                        >

                          <span></span>

                          {usuario.estado}

                        </button>

                      </td>

                      {/* FECHA */}

                      <td>

                        <span className="fecha-usuario">

                          <i className="far fa-calendar"></i>

                          {usuario.fecha}

                        </span>

                      </td>

                      {/* ACCIONES */}

                      <td>

                        <div className="acciones-fila">

                          <button
                            className="btn-icon btn-editar"
                            title="Editar usuario"
                            onClick={() =>
                              editarUsuario(usuario)
                            }
                          >
                            <i className="fas fa-pen"></i>
                          </button>

                          <button
                            className="btn-icon btn-eliminar"
                            title="Eliminar usuario"
                            onClick={() =>
                              eliminarUsuario(usuario)
                            }
                          >
                            <i className="fas fa-trash"></i>
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="usuarios-vacio"
                    >

                      <i className="fas fa-user-slash"></i>

                      <strong>
                        No se encontraron usuarios
                      </strong>

                      <span>
                        Intenta realizar otra búsqueda.
                      </span>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

      {/* =================================================
          MODAL NUEVO / EDITAR USUARIO
          ================================================= */}

      {mostrarModal && (

        <div
          className="modal-overlay activo"
          onClick={cerrarModal}
        >

          <div
            className="modal-box modal-usuario"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER DEL MODAL */}

            <div className="modal-head">

              <div>

                <h3>

                  <i
                    className={
                      modoEdicion
                        ? "fas fa-user-pen"
                        : "fas fa-user-plus"
                    }
                  ></i>

                  {modoEdicion
                    ? "Editar usuario"
                    : "Nuevo usuario"}

                </h3>

                <p>

                  {modoEdicion
                    ? "Actualiza la información del usuario"
                    : "Registra un nuevo usuario en CostPro"}

                </p>

              </div>

              <button
                className="modal-cerrar"
                onClick={cerrarModal}
              >

                <i className="fas fa-times"></i>

              </button>

            </div>

            {/* =================================================
                FORMULARIO
                ================================================= */}

            <form
              className="modal-body"
              onSubmit={guardarUsuario}
            >

              {/* NOMBRE Y APELLIDO */}

              <div className="campos-fila">

                <div className="campo">

                  <label>
                    Nombre <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    placeholder="Ej. María"
                    value={formulario.nombre}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="campo">

                  <label>
                    Apellido <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="apellido"
                    placeholder="Ej. Gutiérrez"
                    value={formulario.apellido}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* CORREO */}

              <div className="campo">

                <label>
                  Correo electrónico <span>*</span>
                </label>

                <div className="input-con-icono">

                  <i className="fas fa-envelope"></i>

                  <input
                    type="email"
                    name="correo"
                    placeholder="usuario@costpro.com"
                    value={formulario.correo}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* CONTRASEÑA */}

              <div className="campo">

                <label>
                  Contraseña{" "}
                  {!modoEdicion && <span>*</span>}
                </label>

                <div className="input-con-icono">

                  <i className="fas fa-lock"></i>

                  <input
                    type="password"
                    name="password"
                    placeholder={
                      modoEdicion
                        ? "Dejar vacío para conservar la actual"
                        : "Ingresa una contraseña"
                    }
                    value={formulario.password}
                    onChange={handleChange}
                    required={!modoEdicion}
                  />

                </div>

                {modoEdicion && (
                  <small className="texto-ayuda">
                    Si no escribes una nueva contraseña,
                    se conservará la actual.
                  </small>
                )}

              </div>

              {/* ROL Y ESTADO */}

              <div className="campos-fila">

                <div className="campo">

                  <label>
                    Rol <span>*</span>
                  </label>

                  <select
                    name="rol"
                    value={formulario.rol}
                    onChange={handleChange}
                  >

                    <option value="Administrador">
                      Administrador
                    </option>

                    <option value="Empleado">
                      Empleado
                    </option>

                  </select>

                </div>

                <div className="campo">

                  <label>
                    Estado
                  </label>

                  <select
                    name="estado"
                    value={formulario.estado}
                    onChange={handleChange}
                  >

                    <option value="Activo">
                      Activo
                    </option>

                    <option value="Inactivo">
                      Inactivo
                    </option>

                  </select>

                </div>

              </div>

              {/* INFORMACIÓN */}

              <div className="alerta-usuario">

                <i className="fas fa-circle-info"></i>

                <span>
                  El rol determina las opciones a las que
                  tendrá acceso el usuario dentro de CostPro.
                </span>

              </div>

              {/* FOOTER */}

              <div className="modal-footer">

                <button
                  type="button"
                  className="btn-secundario"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn-primario"
                >

                  <i className="fas fa-save"></i>

                  {modoEdicion
                    ? "Guardar cambios"
                    : "Registrar usuario"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}