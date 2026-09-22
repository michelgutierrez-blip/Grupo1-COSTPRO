import { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/admin.css";

export default function Productos() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const [modalProducto, setModalProducto] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoEliminar, setProductoEliminar] = useState(null);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [contenido, setContenido] = useState("");
  const [unidadContenido, setUnidadContenido] = useState("");
  const [manoObra, setManoObra] = useState("");
  const [insumosProducto, setInsumosProducto] = useState([]);

  /* =====================================================
      INSUMOS DISPONIBLES
  ===================================================== */

  const insumosDisponibles = [
    { nombre: "Base de glicerina", unidad: "kg", precio: 18000 },
    { nombre: "Aceite de coco", unidad: "litro", precio: 28000 },
    { nombre: "Aceite de oliva", unidad: "litro", precio: 32000 },
    { nombre: "Esencia de lavanda", unidad: "litro", precio: 25000 },
    { nombre: "Colorante cosmético", unidad: "unidad", precio: 4500 },
    { nombre: "Avena en hojuelas", unidad: "kg", precio: 9000 },
    { nombre: "Miel", unidad: "litro", precio: 22000 },
    { nombre: "Envases para jabón", unidad: "unidad", precio: 1200 },
  ];

  /* =====================================================
     PRODUCTOS INICIALES
  ===================================================== */

  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Jabón de lavanda",
      descripcion:
        "Jabón artesanal elaborado con base de glicerina y esencia de lavanda.",
      presentacion: "Barra",
      contenido: 100,
      unidadContenido: "g",
      manoObra: 2000,
      insumos: [
        { nombre: "Base de glicerina", cantidad: 0.1, unidad: "kg" },
        { nombre: "Aceite de coco", cantidad: 0.02, unidad: "litro" },
        { nombre: "Esencia de lavanda", cantidad: 0.005, unidad: "litro" },
        { nombre: "Colorante cosmético", cantidad: 0.1, unidad: "unidad" },
        { nombre: "Envases para jabón", cantidad: 1, unidad: "unidad" },
      ],
    },
    {
      id: 2,
      nombre: "Jabón de coco",
      descripcion:
        "Jabón artesanal con base de glicerina y aceite natural de coco.",
      presentacion: "",
      contenido: "",
      unidadContenido: "",
      manoObra: 2000,
      insumos: [
        { nombre: "Base de glicerina", cantidad: 0.1, unidad: "kg" },
        { nombre: "Aceite de coco", cantidad: 0.03, unidad: "litro" },
        { nombre: "Colorante cosmético", cantidad: 0.1, unidad: "unidad" },
        { nombre: "Envases para jabón", cantidad: 1, unidad: "unidad" },
      ],
    },
    {
      id: 3,
      nombre: "Jabón de oliva",
      descripcion:
        "Jabón artesanal elaborado con aceite de oliva y base de glicerina.",
      presentacion: "",
      contenido: "",
      unidadContenido: "",
      manoObra: 2000,
      insumos: [
        { nombre: "Base de glicerina", cantidad: 0.1, unidad: "kg" },
        { nombre: "Aceite de oliva", cantidad: 0.025, unidad: "litro" },
        { nombre: "Colorante cosmético", cantidad: 0.1, unidad: "unidad" },
        { nombre: "Envases para jabón", cantidad: 1, unidad: "unidad" },
      ],
    },
    {
      id: 4,
      nombre: "Jabón de avena y miel",
      descripcion:
        "Jabón artesanal con avena, miel y aceites naturales para el cuidado de la piel.",
      presentacion: "",
      contenido: "",
      unidadContenido: "",
      manoObra: 2200,
      insumos: [
        { nombre: "Base de glicerina", cantidad: 0.1, unidad: "kg" },
        { nombre: "Avena en hojuelas", cantidad: 0.02, unidad: "kg" },
        { nombre: "Miel", cantidad: 0.01, unidad: "litro" },
        { nombre: "Aceite de coco", cantidad: 0.01, unidad: "litro" },
        { nombre: "Envases para jabón", cantidad: 1, unidad: "unidad" },
      ],
    },
  ]);

  /* =====================================================
     FORMATO DE MONEDA
  ===================================================== */

  const formatCOP = (valor) => {
    return "$ " + Number(valor || 0).toLocaleString("es-CO");
  };

  /* =====================================================
     ICONO SEGÚN PRESENTACIÓN
  ===================================================== */

  const iconoPresentacion = (presentacionProducto) => {
    const iconos = {
      Barra: "fa-cube",
      Líquido: "fa-flask",
      Crema: "fa-pump-soap",
      Polvo: "fa-box",
      Unidad: "fa-cube",
      Caja: "fa-box",
    };

    return iconos[presentacionProducto] || "fa-tag";
  };

  /* =====================================================
     CALCULAR COSTO DE LOS INSUMOS
  ===================================================== */

  const calcularCostoInsumos = (producto) => {
    if (!producto.insumos || producto.insumos.length === 0) {
      return 0;
    }

    return producto.insumos.reduce((total, insumo) => {
      const insumoOriginal = insumosDisponibles.find(
        (item) => item.nombre === insumo.nombre
      );

      if (!insumoOriginal) {
        return total;
      }

      return total + insumo.cantidad * insumoOriginal.precio;
    }, 0);
  };

  /* =====================================================
     CALCULAR COSTO TOTAL
  ===================================================== */

  const costoTotal = (producto) => {
    return (
      calcularCostoInsumos(producto) + Number(producto.manoObra || 0)
    );
  };

  /* =====================================================
     ABRIR MODAL PARA NUEVO PRODUCTO
  ===================================================== */

  const abrirNuevoProducto = () => {
    setModoEdicion(false);
    setProductoEditando(null);

    setNombre("");
    setDescripcion("");
    setPresentacion("");
    setContenido("");
    setUnidadContenido("");
    setManoObra("");
    setInsumosProducto([]);

    setModalProducto(true);
  };

  /* =====================================================
     CERRAR MODAL
  ===================================================== */

  const cerrarModalProducto = () => {
    setModalProducto(false);

    setModoEdicion(false);
    setProductoEditando(null);

    setNombre("");
    setDescripcion("");
    setPresentacion("");
    setContenido("");
    setUnidadContenido("");
    setManoObra("");
    setInsumosProducto([]);
  };

  /* =====================================================
     AGREGAR FILA DE INSUMO
  ===================================================== */

  const agregarInsumo = () => {
    setInsumosProducto([
      ...insumosProducto,
      {
        id: Date.now(),
        nombre: "",
        cantidad: "",
        unidad: "",
      },
    ]);
  };

  /* =====================================================
     ACTUALIZAR INSUMO
  ===================================================== */

  const actualizarInsumo = (id, campo, valor) => {
    setInsumosProducto(
      insumosProducto.map((insumo) => {
        if (insumo.id !== id) {
          return insumo;
        }

        if (campo === "nombre") {
          const insumoSeleccionado = insumosDisponibles.find(
            (item) => item.nombre === valor
          );

          return {
            ...insumo,
            nombre: valor,
            unidad: insumoSeleccionado
              ? insumoSeleccionado.unidad
              : "",
          };
        }

        return {
          ...insumo,
          [campo]: valor,
        };
      })
    );
  };

  /* =====================================================
     ELIMINAR FILA DE INSUMO
  ===================================================== */

  const quitarInsumo = (id) => {
    setInsumosProducto(
      insumosProducto.filter((insumo) => insumo.id !== id)
    );
  };

  /* =====================================================
     EDITAR PRODUCTO
  ===================================================== */

  const editarProducto = (producto) => {
    setModoEdicion(true);
    setProductoEditando(producto);

    setNombre(producto.nombre);
    setDescripcion(producto.descripcion || "");
    setPresentacion(producto.presentacion || "");
    setContenido(producto.contenido ?? "");
    setUnidadContenido(producto.unidadContenido || "");
    setManoObra(producto.manoObra);

    setInsumosProducto(
      producto.insumos.map((insumo) => ({
        ...insumo,
        id: Date.now() + Math.random(),
      }))
    );

    setModalProducto(true);
  };

  /* =====================================================
     GUARDAR PRODUCTO
  ===================================================== */

  const guardarProducto = () => {
    if (!nombre.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campo obligatorio",
        text: "Ingresa el nombre del producto.",
      });
      return;
    }

    if (!presentacion) {
      Swal.fire({
        icon: "warning",
        title: "Presentación requerida",
        text: "Selecciona la presentación del producto.",
      });
      return;
    }

    if (
      contenido === "" ||
      isNaN(Number(contenido)) ||
      Number(contenido) <= 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Contenido inválido",
        text: "Ingresa una cantidad de contenido válida.",
      });
      return;
    }

    if (!unidadContenido) {
      Swal.fire({
        icon: "warning",
        title: "Unidad de contenido requerida",
        text: "Selecciona la unidad correspondiente al contenido.",
      });
      return;
    }

    if (
      manoObra === "" ||
      isNaN(Number(manoObra)) ||
      Number(manoObra) < 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Mano de obra inválida",
        text: "Ingresa un costo de mano de obra válido.",
      });
      return;
    }

    for (const insumo of insumosProducto) {
      if (
        !insumo.nombre ||
        insumo.cantidad === "" ||
        Number(insumo.cantidad) <= 0
      ) {
        Swal.fire({
          icon: "warning",
          title: "Insumos incompletos",
          text: "Completa correctamente el nombre y la cantidad de cada insumo.",
        });
        return;
      }
    }

    const datosProducto = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      presentacion,
      contenido: Number(contenido),
      unidadContenido,
      manoObra: Number(manoObra),
      insumos: insumosProducto.map((insumo) => ({
        nombre: insumo.nombre,
        cantidad: Number(insumo.cantidad),
        unidad: insumo.unidad,
      })),
    };

    if (modoEdicion && productoEditando) {
      setProductos(
        productos.map((producto) =>
          producto.id === productoEditando.id
            ? { ...producto, ...datosProducto }
            : producto
        )
      );

      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        text: "La información del producto se actualizó correctamente.",
        timer: 1600,
        showConfirmButton: false,
      });
    } else {
      const nuevoId =
        productos.length > 0
          ? Math.max(...productos.map((producto) => producto.id)) + 1
          : 1;

      setProductos([
        ...productos,
        {
          id: nuevoId,
          ...datosProducto,
        },
      ]);

      Swal.fire({
        icon: "success",
        title: "Producto registrado",
        text: "El producto se agregó correctamente.",
        timer: 1600,
        showConfirmButton: false,
      });
    }

    cerrarModalProducto();
  };

  /* =====================================================
     ABRIR MODAL ELIMINAR
  ===================================================== */

  const pedirEliminar = (producto) => {
    setProductoEliminar(producto);
    setModalEliminar(true);
  };

  /* =====================================================
     CERRAR MODAL ELIMINAR
  ===================================================== */

  const cerrarModalEliminar = () => {
    setModalEliminar(false);
    setProductoEliminar(null);
  };

  /* =====================================================
     CONFIRMAR ELIMINACIÓN
  ===================================================== */

  const confirmarEliminar = () => {
    if (!productoEliminar) {
      return;
    }

    setProductos(
      productos.filter(
        (producto) => producto.id !== productoEliminar.id
      )
    );

    Swal.fire({
      icon: "success",
      title: "Producto eliminado",
      text: "El producto se eliminó correctamente.",
      timer: 1600,
      showConfirmButton: false,
    });

    cerrarModalEliminar();
  };

  /* =====================================================
     FILTRAR PRODUCTOS
  ===================================================== */

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  /* =====================================================
     DATOS DEL RESUMEN
  ===================================================== */

  const totalProductos = productos.length;

  const costoPromedio =
    productos.length > 0
      ? productos.reduce(
          (total, producto) => total + costoTotal(producto),
          0
        ) / productos.length
      : 0;

  const productoEconomico =
    productos.length > 0
      ? productos.reduce((menor, producto) =>
          costoTotal(producto) < costoTotal(menor)
            ? producto
            : menor
        )
      : null;

  const totalInsumosUtilizados = productos.reduce(
    (total, producto) => total + producto.insumos.length,
    0
  );

  return (
    <div className="admin-panel">

      {/* ================= NAVBAR ================= */}

      <Navbar
        onToggleMenu={() => setMenuAbierto(!menuAbierto)}
      />

      {/* ================= SIDEBAR ================= */}

      <Sidebar
        abierto={menuAbierto}
        onCerrar={() => setMenuAbierto(false)}
      />

      {/* ================= CONTENIDO ================= */}

      <main>
        <div className="header">
          <h1>
            <i className="fas fa-cube"></i>
            Gestión de Productos
          </h1>

          <p>
            Registra los productos que fabricas, sus insumos y el
            costo de mano de obra
          </p>
        </div>

        {/* =====================================================
            RESUMEN DE PRODUCTOS
        ===================================================== */}

        <div className="resumen-productos">

          <div className="tarjeta-producto tarjeta-verde-prod">
            <div className="tarjeta-prod-icono">
              <i className="fas fa-boxes-stacked"></i>
            </div>

            <div className="tarjeta-prod-info">
              <span>Productos registrados</span>
              <strong>{totalProductos}</strong>
              <small>Productos activos</small>
            </div>
          </div>

          <div className="tarjeta-producto tarjeta-azul-prod">
            <div className="tarjeta-prod-icono">
              <i className="fas fa-calculator"></i>
            </div>

            <div className="tarjeta-prod-info">
              <span>Costo promedio</span>
              <strong>{formatCOP(costoPromedio)}</strong>
              <small>Por producto</small>
            </div>
          </div>

          <div className="tarjeta-producto tarjeta-amarillo-prod">
            <div className="tarjeta-prod-icono">
              <i className="fas fa-tag"></i>
            </div>

            <div className="tarjeta-prod-info">
              <span>Producto más económico</span>

              <strong className="nombre-economico">
                {productoEconomico
                  ? productoEconomico.nombre
                  : "Sin productos"}
              </strong>

              <small>
                {productoEconomico
                  ? formatCOP(costoTotal(productoEconomico))
                  : "$ 0"}
              </small>
            </div>
          </div>

          <div className="tarjeta-producto tarjeta-rojo-prod">
            <div className="tarjeta-prod-icono">
              <i className="fas fa-flask"></i>
            </div>

            <div className="tarjeta-prod-info">
              <span>Insumos utilizados</span>
              <strong>{totalInsumosUtilizados}</strong>
              <small>En todos los productos</small>
            </div>
          </div>

        </div>

        {/* ================= LISTA DE PRODUCTOS ================= */}

        <section className="seccion">

          <div className="seccion-head">

            <div>
              <h2>
                <i className="fas fa-list"></i>
                Productos registrados
              </h2>

              <p>
                Consulta, edita o elimina los productos del sistema
              </p>
            </div>

            <button
              className="btn-primario"
              onClick={abrirNuevoProducto}
            >
              <i className="fas fa-plus"></i>
              Nuevo producto
            </button>

          </div>

          {/* BUSCADOR */}

          <div className="buscador-wrap">
            <i className="fas fa-search buscador-icono"></i>

            <input
              type="text"
              className="buscador-input"
              placeholder="Buscar producto por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* TABLA */}

          <div className="tabla-wrap">
            <table className="tabla-productos">

              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Presentación</th>
                  <th>Contenido</th>
                  <th>Insumos</th>
                  <th>Mano de obra / u.</th>
                  <th>Costo total estimado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>

                {productosFiltrados.map((producto) => {

                  const costoInsumos =
                    calcularCostoInsumos(producto);

                  return (
                    <tr key={producto.id}>

                      <td>
                        <div className="producto-nombre">

                          <div className="avatar-prod">
                            <i className="fas fa-cube"></i>
                          </div>

                          <div>
                            <div className="prod-title">
                              {producto.nombre}
                            </div>

                            {producto.descripcion && (
                              <div className="prod-desc">
                                {producto.descripcion}
                              </div>
                            )}
                          </div>

                        </div>
                      </td>

                      <td>
                        {producto.presentacion ? (
                          <span className="badge-unidad">
                            <i
                              className={`fas ${iconoPresentacion(
                                producto.presentacion
                              )}`}
                            ></i>

                            {producto.presentacion}
                          </span>
                        ) : (
                          <span className="badge-sin-insumos">
                            Sin definir
                          </span>
                        )}
                      </td>

                      <td>
                        {producto.contenido &&
                        producto.unidadContenido ? (
                          <span className="badge-unidad">
                            {producto.contenido}{" "}
                            {producto.unidadContenido}
                          </span>
                        ) : (
                          <span className="badge-sin-insumos">
                            Sin definir
                          </span>
                        )}
                      </td>

                      <td>
                        {producto.insumos.length > 0 ? (
                          <span className="badge-insumos">
                            {producto.insumos.length}{" "}
                            {producto.insumos.length === 1
                              ? "insumo"
                              : "insumos"}
                          </span>
                        ) : (
                          <span className="badge-sin-insumos">
                            Sin insumos
                          </span>
                        )}
                      </td>

                      <td className="celda-mano">
                        {formatCOP(producto.manoObra)}
                      </td>

                      <td className="celda-costo">
                        <strong>
                          {formatCOP(
                            costoInsumos +
                              Number(producto.manoObra)
                          )}
                        </strong>
                      </td>

                      <td>
                        <div className="acciones-fila">

                          <button
                            className="btn-icon btn-editar"
                            title="Editar"
                            onClick={() =>
                              editarProducto(producto)
                            }
                          >
                            <i className="fas fa-pen"></i>
                          </button>

                          <button
                            className="btn-icon btn-eliminar"
                            title="Eliminar"
                            onClick={() =>
                              pedirEliminar(producto)
                            }
                          >
                            <i className="fas fa-trash"></i>
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>

          {/* ESTADO VACÍO */}

          {productosFiltrados.length === 0 && (
            <div className="tabla-vacia">

              <i className="fas fa-box-open"></i>

              <p>
                {busqueda
                  ? "No se encontraron productos."
                  : "No hay productos registrados aún."}
              </p>

              {!busqueda && (
                <span>
                  Haz clic en{" "}
                  <strong>Nuevo producto</strong> para comenzar.
                </span>
              )}

            </div>
          )}

        </section>
      </main>

      {/* =====================================================
          MODAL NUEVO / EDITAR PRODUCTO
      ===================================================== */}

      {modalProducto && (
        <div
          className="modal-overlay activo"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              cerrarModalProducto();
            }
          }}
        >

          <div className="modal-box modal-grande">

            <div className="modal-head">

              <h2>
                <i
                  className={`fas ${
                    modoEdicion ? "fa-pen" : "fa-plus"
                  }`}
                ></i>

                {modoEdicion
                  ? "Editar producto"
                  : "Nuevo producto"}
              </h2>

              <button
                className="modal-cerrar"
                onClick={cerrarModalProducto}
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            <div className="modal-body">

              {/* INFORMACIÓN GENERAL */}

              <div className="form-bloque">

                <div className="form-bloque-titulo">
                  <i className="fas fa-info-circle"></i>
                  Información general
                </div>

                <div className="campo">
                  <label>
                    Nombre del producto{" "}
                    <span className="req">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Ej: Jabón de lavanda"
                    value={nombre}
                    onChange={(e) =>
                      setNombre(e.target.value)
                    }
                  />
                </div>

                <div className="campo">
                  <label>Descripción</label>

                  <textarea
                    rows="3"
                    placeholder="Describe brevemente el producto..."
                    value={descripcion}
                    onChange={(e) =>
                      setDescripcion(e.target.value)
                    }
                  ></textarea>
                </div>

                {/* PRESENTACIÓN */}

                <div className="campo campo-mitad">

                  <label>
                    Presentación{" "}
                    <span className="req">*</span>
                  </label>

                  <select
                    value={presentacion}
                    onChange={(e) =>
                      setPresentacion(e.target.value)
                    }
                  >
                    <option value="">
                      — Seleccionar —
                    </option>

                    <option value="Barra">
                      Barra
                    </option>

                    <option value="Líquido">
                      Líquido
                    </option>

                    <option value="Crema">
                      Crema
                    </option>

                    <option value="Polvo">
                      Polvo
                    </option>

                    <option value="Unidad">
                      Unidad
                    </option>

                    <option value="Caja">
                      Caja
                    </option>
                  </select>

                </div>

                {/* CONTENIDO */}

                <div className="campo campo-mitad">

                  <label>
                    Contenido{" "}
                    <span className="req">*</span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Ej: 100"
                    value={contenido}
                    onChange={(e) =>
                      setContenido(e.target.value)
                    }
                  />

                </div>

                {/* UNIDAD DEL CONTENIDO */}

                <div className="campo campo-mitad">

                  <label>
                    Unidad de contenido{" "}
                    <span className="req">*</span>
                  </label>

                  <select
                    value={unidadContenido}
                    onChange={(e) =>
                      setUnidadContenido(e.target.value)
                    }
                  >
                    <option value="">
                      — Seleccionar —
                    </option>

                    <option value="g">
                      Gramo (g)
                    </option>

                    <option value="kg">
                      Kilogramo (kg)
                    </option>

                    <option value="ml">
                      Mililitro (mL)
                    </option>

                    <option value="L">
                      Litro (L)
                    </option>
                  </select>

                </div>

              </div>

              {/* MANO DE OBRA */}

              <div className="form-bloque">

                <div className="form-bloque-titulo">
                  <i className="fas fa-hard-hat"></i>
                  Mano de obra directa
                </div>

                <div className="campo campo-mitad">

                  <label>
                    Costo de mano de obra por unidad{" "}
                    <span className="req">*</span>
                  </label>

                  <div className="input-prefix-wrap">

                    <span className="input-prefix">
                      $
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0"
                      value={manoObra}
                      onChange={(e) =>
                        setManoObra(e.target.value)
                      }
                    />

                  </div>

                </div>

              </div>

              {/* INSUMOS */}

              <div className="form-bloque">

                <div className="form-bloque-titulo-fila">

                  <div>
                    <i className="fas fa-box"></i>
                    Insumos del producto
                  </div>

                  <button
                    type="button"
                    className="btn-agregar-fila"
                    onClick={agregarInsumo}
                  >
                    <i className="fas fa-plus"></i>
                    Agregar insumo
                  </button>

                </div>

                <div className="insumos-cabecera">
                  <span>Insumo</span>
                  <span>Cantidad</span>
                  <span>Unidad</span>
                  <span></span>
                </div>

                <div id="listaInsumos">

                  {insumosProducto.map((insumo) => (

                    <div
                      className="fila-insumo"
                      key={insumo.id}
                    >

                      <select
                        className="campo-insumo-select"
                        value={insumo.nombre}
                        onChange={(e) =>
                          actualizarInsumo(
                            insumo.id,
                            "nombre",
                            e.target.value
                          )
                        }
                      >

                        <option value="">
                          — Seleccionar insumo —
                        </option>

                        {insumosDisponibles.map((item) => (
                          <option
                            key={item.nombre}
                            value={item.nombre}
                          >
                            {item.nombre}
                          </option>
                        ))}

                      </select>

                      <input
                        type="number"
                        className="campo-insumo-cant"
                        min="0"
                        step="0.01"
                        placeholder="0"
                        value={insumo.cantidad}
                        onChange={(e) =>
                          actualizarInsumo(
                            insumo.id,
                            "cantidad",
                            e.target.value
                          )
                        }
                      />

                      <input
                        type="text"
                        className="campo-insumo-unidad"
                        placeholder="Unidad"
                        value={insumo.unidad}
                        readOnly
                      />

                      <button
                        type="button"
                        className="btn-quitar-fila"
                        title="Quitar insumo"
                        onClick={() =>
                          quitarInsumo(insumo.id)
                        }
                      >
                        <i className="fas fa-xmark"></i>
                      </button>

                    </div>

                  ))}

                </div>

                {insumosProducto.length === 0 && (
                  <div
                    id="insumos-vacio"
                    className="insumos-vacio"
                  >
                    <i className="fas fa-cubes"></i>

                    Aún no has agregado insumos. Haz clic en{" "}
                    <strong>Agregar insumo</strong>.
                  </div>
                )}

              </div>

              {/* PREVISUALIZACIÓN DEL COSTO */}

              {insumosProducto.length > 0 && (
                <div className="alerta-warning">

                  <i className="fas fa-calculator"></i>

                  <div>

                    <strong>
                      Costo estimado de insumos:
                    </strong>

                    <span>
                      {formatCOP(
                        insumosProducto.reduce(
                          (total, insumo) => {

                            const original =
                              insumosDisponibles.find(
                                (item) =>
                                  item.nombre ===
                                  insumo.nombre
                              );

                            if (!original) {
                              return total;
                            }

                            return (
                              total +
                              Number(
                                insumo.cantidad || 0
                              ) * original.precio
                            );
                          },
                          0
                        )
                      )}
                    </span>

                  </div>

                </div>
              )}

            </div>

            {/* FOOTER */}

            <div className="modal-footer">

              <button
                className="btn-secundario"
                onClick={cerrarModalProducto}
              >
                Cancelar
              </button>

              <button
                className="btn-primario"
                onClick={guardarProducto}
              >
                <i className="fas fa-check"></i>

                {modoEdicion
                  ? "Guardar cambios"
                  : "Guardar producto"}
              </button>

            </div>

          </div>
        </div>
      )}

      {/* =====================================================
          MODAL ELIMINAR
      ===================================================== */}

      {modalEliminar && productoEliminar && (
        <div
          className="modal-overlay activo"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              cerrarModalEliminar();
            }
          }}
        >

          <div className="modal-box modal-chico">

            <div className="modal-head modal-head-danger">

              <h2>
                <i className="fas fa-triangle-exclamation"></i>
                Eliminar producto
              </h2>

              <button
                className="modal-cerrar"
                onClick={cerrarModalEliminar}
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>

            <div className="modal-body">

              <div className="alerta-danger">

                <i className="fas fa-circle-exclamation"></i>

                <div>

                  <p>
                    Estás a punto de eliminar{" "}
                    <strong>
                      "{productoEliminar.nombre}"
                    </strong>.
                  </p>

                  <p className="alerta-sub">
                    Esta acción no se puede deshacer. Se
                    perderán todos los insumos y costos
                    asociados al producto.
                  </p>

                </div>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="btn-secundario"
                onClick={cerrarModalEliminar}
              >
                Cancelar
              </button>

              <button
                className="btn-danger"
                onClick={confirmarEliminar}
              >
                <i className="fas fa-trash"></i>
                Sí, eliminar
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}