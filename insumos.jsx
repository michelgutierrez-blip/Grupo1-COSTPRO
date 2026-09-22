import { useState } from "react";
import NavbarEmpleado from "../../components/empleado/NavbarEmpleado"; 
import SidebarEmpleado from "../../components/empleado/SidebarEmpleado";
import "../../styles/empleado.css";

export default function InsumosEmpleado() {

  // =====================================================
  // ESTADOS
  // =====================================================

  const [insumos, setInsumos] = useState([
    {
      id: 1,
      nombre: "Aceite de Oliva",
      categoria: "Materia prima",
      cantidad: 18,
      unidad: "litro",
      precio: 18000,
      proveedorId: 1,
      stockMin: 10,
    },
    {
      id: 2,
      nombre: "Aceite de Coco",
      categoria: "Materia prima",
      cantidad: 12,
      unidad: "litro",
      precio: 22000,
      proveedorId: 1,
      stockMin: 8,
    },
    {
      id: 3,
      nombre: "Manteca de Karité",
      categoria: "Materia prima",
      cantidad: 8,
      unidad: "kg",
      precio: 28000,
      proveedorId: 2,
      stockMin: 10,
    },
    {
      id: 4,
      nombre: "Avena en Polvo",
      categoria: "Materia prima",
      cantidad: 7,
      unidad: "kg",
      precio: 15000,
      proveedorId: 2,
      stockMin: 6,
    },
    {
      id: 5,
      nombre: "Miel",
      categoria: "Materia prima",
      cantidad: 5,
      unidad: "kg",
      precio: 18000,
      proveedorId: 3,
      stockMin: 5,
    },
    {
      id: 6,
      nombre: "Esencia de Lavanda",
      categoria: "Insumo químico",
      cantidad: 400,
      unidad: "ml",
      precio: 25000,
      proveedorId: 4,
      stockMin: 500,
    },
    {
      id: 7,
      nombre: "Arcilla Verde",
      categoria: "Materia prima",
      cantidad: 4,
      unidad: "kg",
      precio: 17000,
      proveedorId: 2,
      stockMin: 5,
    },
    {
      id: 8,
      nombre: "Moldes de Silicona",
      categoria: "Herramienta",
      cantidad: 12,
      unidad: "unidad",
      precio: 18000,
      proveedorId: 5,
      stockMin: 6,
    },
    {
      id: 9,
      nombre: "Cajas Kraft",
      categoria: "Embalaje",
      cantidad: 40,
      unidad: "unidad",
      precio: 1200,
      proveedorId: 5,
      stockMin: 30,
    },
  ]);

  const [proveedores, setProveedores] = useState([
    {
      id: 1,
      nombre: "Aceites Naturales S.A.S.",
      correo: "ventas@aceitesnaturales.com",
      telefono: "300 123 4567",
      descripcion:
        "Proveedor de aceites vegetales para elaboración de jabones.",
    },
    {
      id: 2,
      nombre: "Materias Primas Naturales",
      correo: "contacto@materiasnaturales.com",
      telefono: "304 555 1212",
      descripcion:
        "Mantecas, avena, arcillas y materias primas naturales.",
    },
    {
      id: 3,
      nombre: "Productos Naturales Colombia",
      correo: "ventas@productosnaturales.com",
      telefono: "301 998 4521",
      descripcion:
        "Proveedor de miel y productos naturales.",
    },
    {
      id: 4,
      nombre: "Esencias Aromáticas",
      correo: "pedidos@esenciasaromaticas.com",
      telefono: "310 777 8899",
      descripcion:
        "Esencias y aromas para productos artesanales.",
    },
    {
      id: 5,
      nombre: "Empaques Artesanales",
      correo: "contacto@empaquesartesanales.com",
      telefono: "311 222 3344",
      descripcion:
        "Cajas y elementos de presentación para productos artesanales.",
    },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [stockFiltro, setStockFiltro] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);

  const POR_PAGINA = 6;

  // Modales
  const [modalInsumo, setModalInsumo] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [modalProveedor, setModalProveedor] = useState(false);
  const [modalEliminarProveedor, setModalEliminarProveedor] =
    useState(false);

  // Edición
  const [insumoEditando, setInsumoEditando] = useState(null);
  const [proveedorEditando, setProveedorEditando] = useState(null);

  const [insumoEliminar, setInsumoEliminar] = useState(null);
  const [proveedorEliminar, setProveedorEliminar] = useState(null);

  // Toast
  const [toast, setToast] = useState({
    visible: false,
    mensaje: "",
    tipo: "ok",
  });

  // Formulario insumo
  const [formInsumo, setFormInsumo] = useState({
    nombre: "",
    categoria: "Materia prima",
    cantidad: "",
    unidad: "unidad",
    precio: "",
    proveedorId: "",
    stockMin: "",
  });

  // Formulario proveedor
  const [formProveedor, setFormProveedor] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    descripcion: "",
  });


  // =====================================================
  // TOAST
  // =====================================================

  const mostrarToast = (mensaje, tipo = "ok") => {
    setToast({
      visible: true,
      mensaje,
      tipo,
    });

    setTimeout(() => {
      setToast({
        visible: false,
        mensaje: "",
        tipo: "ok",
      });
    }, 3200);
  };


  // =====================================================
  // UTILIDADES
  // =====================================================

  const formatCOP = (numero) => {
    return "$ " + Math.round(numero).toLocaleString("es-CO");
  };

  const nombreProveedor = (id) => {
    const proveedor = proveedores.find(
      (p) => p.id === Number(id)
    );

    return proveedor ? proveedor.nombre : "";
  };

  const estadoStock = (insumo) => {

    if (!insumo.stockMin || insumo.stockMin === 0) {
      return "ok";
    }

    const ratio =
      insumo.cantidad / insumo.stockMin;

    if (ratio <= 1) {
      return "bajo";
    }

    if (ratio <= 2) {
      return "medio";
    }

    return "ok";
  };


  // =====================================================
  // FILTRADO
  // =====================================================

  const insumosFiltrados = insumos.filter((insumo) => {

    const coincideNombre =
      insumo.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());

    const coincideCategoria =
      !categoriaFiltro ||
      insumo.categoria === categoriaFiltro;

    const coincideStock =
      !stockFiltro ||
      estadoStock(insumo) === stockFiltro;

    return (
      coincideNombre &&
      coincideCategoria &&
      coincideStock
    );
  });


  // =====================================================
  // PAGINACIÓN
  // =====================================================

  const totalPaginas = Math.max(
    1,
    Math.ceil(
      insumosFiltrados.length / POR_PAGINA
    )
  );

  const paginaSegura = Math.min(
    paginaActual,
    totalPaginas
  );

  const indiceInicio =
    (paginaSegura - 1) * POR_PAGINA;

  const insumosPagina =
    insumosFiltrados.slice(
      indiceInicio,
      indiceInicio + POR_PAGINA
    );


  const cambiarBusqueda = (valor) => {
    setBusqueda(valor);
    setPaginaActual(1);
  };

  const cambiarCategoria = (valor) => {
    setCategoriaFiltro(valor);
    setPaginaActual(1);
  };

  const cambiarStock = (valor) => {
    setStockFiltro(valor);
    setPaginaActual(1);
  };


  // =====================================================
  // RESUMEN
  // =====================================================

  const totalInsumos = insumos.length;

  const insumosStockBajo = insumos.filter(
    (insumo) =>
      estadoStock(insumo) === "bajo"
  ).length;

  const valorInventario = insumos.reduce(
    (total, insumo) =>
      total +
      insumo.cantidad * insumo.precio,
    0
  );

  const proveedoresActivos = new Set(
    insumos
      .map((insumo) => insumo.proveedorId)
      .filter(Boolean)
  ).size;


  // =====================================================
  // FORMULARIO INSUMO
  // =====================================================

  const abrirNuevoInsumo = () => {

    setInsumoEditando(null);

    setFormInsumo({
      nombre: "",
      categoria: "Materia prima",
      cantidad: "",
      unidad: "unidad",
      precio: "",
      proveedorId: "",
      stockMin: "",
    });

    setModalInsumo(true);
  };


  const abrirEditarInsumo = (insumo) => {

    setInsumoEditando(insumo);

    setFormInsumo({
      nombre: insumo.nombre,
      categoria: insumo.categoria,
      cantidad: insumo.cantidad,
      unidad: insumo.unidad,
      precio: insumo.precio,
      proveedorId:
        insumo.proveedorId || "",
      stockMin:
        insumo.stockMin || "",
    });

    setModalInsumo(true);
  };


  const cerrarModalInsumo = () => {
    setModalInsumo(false);
    setInsumoEditando(null);
  };


  const guardarInsumo = () => {

    const nombre =
      formInsumo.nombre.trim();

    const cantidad =
      Number(formInsumo.cantidad);

    const precio =
      Number(formInsumo.precio);

    const stockMin =
      Number(formInsumo.stockMin) || 0;


    if (!nombre) {
      mostrarToast(
        "El nombre es obligatorio.",
        "error"
      );
      return;
    }

    if (
      Number.isNaN(cantidad) ||
      cantidad < 0
    ) {
      mostrarToast(
        "Ingresa una cantidad válida.",
        "error"
      );
      return;
    }

    if (
      Number.isNaN(precio) ||
      precio < 0
    ) {
      mostrarToast(
        "Ingresa un precio unitario válido.",
        "error"
      );
      return;
    }


    const proveedorId =
      formInsumo.proveedorId
        ? Number(formInsumo.proveedorId)
        : null;


    if (insumoEditando) {

      setInsumos((anteriores) =>
        anteriores.map((insumo) =>
          insumo.id ===
          insumoEditando.id
            ? {
                ...insumo,
                nombre,
                categoria:
                  formInsumo.categoria,
                cantidad,
                unidad:
                  formInsumo.unidad,
                precio,
                proveedorId,
                stockMin,
              }
            : insumo
        )
      );

      mostrarToast(
        `Insumo "${nombre}" actualizado correctamente.`
      );

    } else {

      const nuevoId =
        insumos.length > 0
          ? Math.max(
              ...insumos.map(
                (insumo) => insumo.id
              )
            ) + 1
          : 1;


      const nuevoInsumo = {
        id: nuevoId,
        nombre,
        categoria:
          formInsumo.categoria,
        cantidad,
        unidad:
          formInsumo.unidad,
        precio,
        proveedorId,
        stockMin,
      };


      setInsumos((anteriores) => [
        ...anteriores,
        nuevoInsumo,
      ]);

      mostrarToast(
        `Insumo "${nombre}" registrado correctamente.`
      );
    }

    cerrarModalInsumo();
  };


  // =====================================================
  // ELIMINAR INSUMO
  // =====================================================

  const pedirEliminarInsumo = (insumo) => {

    setInsumoEliminar(insumo);

    setModalEliminar(true);
  };


  const cerrarModalEliminar = () => {

    setModalEliminar(false);

    setInsumoEliminar(null);
  };


  const confirmarEliminarInsumo = () => {

    if (!insumoEliminar) {
      return;
    }

    const nombre =
      insumoEliminar.nombre;

    setInsumos((anteriores) =>
      anteriores.filter(
        (insumo) =>
          insumo.id !==
          insumoEliminar.id
      )
    );

    cerrarModalEliminar();

    mostrarToast(
      `Insumo "${nombre}" eliminado.`
    );
  };


  // =====================================================
  // FORMULARIO PROVEEDOR
  // =====================================================

  const abrirNuevoProveedor = () => {

    setProveedorEditando(null);

    setFormProveedor({
      nombre: "",
      correo: "",
      telefono: "",
      descripcion: "",
    });

    setModalProveedor(true);
  };


  const abrirEditarProveedor = (
    proveedor
  ) => {

    setProveedorEditando(proveedor);

    setFormProveedor({
      nombre: proveedor.nombre,
      correo: proveedor.correo || "",
      telefono:
        proveedor.telefono || "",
      descripcion:
        proveedor.descripcion || "",
    });

    setModalProveedor(true);
  };


  const cerrarModalProveedor = () => {

    setModalProveedor(false);

    setProveedorEditando(null);
  };


  const guardarProveedor = () => {

    const nombre =
      formProveedor.nombre.trim();

    const correo =
      formProveedor.correo.trim();

    const telefono =
      formProveedor.telefono.trim();

    const descripcion =
      formProveedor.descripcion.trim();


    if (!nombre) {

      mostrarToast(
        "El nombre del proveedor es obligatorio.",
        "error"
      );

      return;
    }


    if (!correo) {

      mostrarToast(
        "El correo es obligatorio.",
        "error"
      );

      return;
    }


    if (!telefono) {

      mostrarToast(
        "El teléfono / contacto es obligatorio.",
        "error"
      );

      return;
    }


    const correoValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        correo
      );


    if (!correoValido) {

      mostrarToast(
        "Ingresa un correo válido.",
        "error"
      );

      return;
    }


    if (proveedorEditando) {

      setProveedores((anteriores) =>
        anteriores.map((proveedor) =>
          proveedor.id ===
          proveedorEditando.id
            ? {
                ...proveedor,
                nombre,
                correo,
                telefono,
                descripcion,
              }
            : proveedor
        )
      );

      mostrarToast(
        `Proveedor "${nombre}" actualizado correctamente.`
      );

    } else {

      const nuevoId =
        proveedores.length > 0
          ? Math.max(
              ...proveedores.map(
                (proveedor) =>
                  proveedor.id
              )
            ) + 1
          : 1;


      setProveedores((anteriores) => [
        ...anteriores,
        {
          id: nuevoId,
          nombre,
          correo,
          telefono,
          descripcion,
        },
      ]);

      mostrarToast(
        `Proveedor "${nombre}" registrado correctamente.`
      );
    }

    cerrarModalProveedor();
  };


  // =====================================================
  // ELIMINAR PROVEEDOR
  // =====================================================

  const pedirEliminarProveedor = (
    proveedor
  ) => {

    setProveedorEliminar(proveedor);

    setModalEliminarProveedor(true);
  };


  const cerrarModalEliminarProveedor =
    () => {

      setModalEliminarProveedor(false);

      setProveedorEliminar(null);
    };


  const confirmarEliminarProveedor =
    () => {

      if (!proveedorEliminar) {
        return;
      }

      const nombre =
        proveedorEliminar.nombre;

      const insumosAsociados =
        insumos.filter(
          (insumo) =>
            insumo.proveedorId ===
            proveedorEliminar.id
        );


      setProveedores((anteriores) =>
        anteriores.filter(
          (proveedor) =>
            proveedor.id !==
            proveedorEliminar.id
        )
      );


      // Los insumos quedan sin proveedor
      if (insumosAsociados.length > 0) {

        setInsumos((anteriores) =>
          anteriores.map((insumo) =>
            insumo.proveedorId ===
            proveedorEliminar.id
              ? {
                  ...insumo,
                  proveedorId: null,
                }
              : insumo
          )
        );
      }


      cerrarModalEliminarProveedor();

      mostrarToast(
        `Proveedor "${nombre}" eliminado.`
      );
    };


  // =====================================================
  // SCROLL A PROVEEDORES
  // =====================================================

  const irAProveedores = () => {

    const seccion =
      document.getElementById(
        "seccionProveedores"
      );

    if (seccion) {
      seccion.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>

      {/* NAVBAR */}
      <NavbarEmpleado />

      {/* MENU */}
      <SidebarEmpleado />


      <main>

        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <div className="header">

          <h1>
            <i className="fas fa-box"></i>
            {" "}Gestión de Insumos
          </h1>

          <p>
            Registra, consulta, edita y elimina
            los insumos y materias primas del
            proceso de producción
          </p>

        </div>


        {/* =================================================
            TARJETAS RESUMEN
        ================================================= */}

        <div className="tarjetas-resumen">

          {/* TOTAL */}

          <div className="tarjeta-res tarjeta-verde">

            <div className="tarjeta-icono">
              <i className="fas fa-boxes-stacked"></i>
            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">
                {totalInsumos}
              </div>

              <div className="tarjeta-label">
                Insumos registrados
              </div>

            </div>

          </div>


          {/* STOCK BAJO */}

          <div className="tarjeta-res tarjeta-rojo">

            <div className="tarjeta-icono">
              <i className="fas fa-triangle-exclamation"></i>
            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">
                {insumosStockBajo}
              </div>

              <div className="tarjeta-label">
                Con stock bajo
              </div>

            </div>

          </div>


          {/* VALOR INVENTARIO */}

          <div className="tarjeta-res tarjeta-amarillo">

            <div className="tarjeta-icono">
              <i className="fas fa-dollar-sign"></i>
            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">
                {formatCOP(valorInventario)}
              </div>

              <div className="tarjeta-label">
                Valor inventario total
              </div>

            </div>

          </div>


          {/* PROVEEDORES */}

          <div className="tarjeta-res tarjeta-azul">

            <div className="tarjeta-icono">
              <i className="fas fa-truck"></i>
            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">
                {proveedoresActivos}
              </div>

              <div className="tarjeta-label">
                Proveedores activos
              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            TABLA DE INSUMOS
        ================================================= */}

        <section className="seccion">

          <div className="seccion-head">

            <div>

              <h2>
                <i className="fas fa-boxes-stacked"></i>
                {" "}Listado de insumos
              </h2>

              <p>
                Consulta cantidad disponible y
                precio unitario. Usa el buscador
                para filtrar por nombre.
              </p>

            </div>


            <div className="seccion-head-btns">

              <button
                className="btn-secundario"
                onClick={irAProveedores}
              >
                <i className="fas fa-truck"></i>
                {" "}Proveedores
              </button>


              <button
                className="btn-primario"
                onClick={abrirNuevoInsumo}
              >
                <i className="fas fa-plus"></i>
                {" "}Nuevo insumo
              </button>

            </div>

          </div>


          {/* FILTROS */}

          <div className="filtros-bar">

            <div className="filtro-wrap">

              <i className="fas fa-search filtro-icono"></i>

              <input
                type="text"
                className="filtro-input"
                placeholder="Buscar por nombre…"
                value={busqueda}
                onChange={(e) =>
                  cambiarBusqueda(
                    e.target.value
                  )
                }
              />

            </div>


            <select
              className="filtro-select"
              value={categoriaFiltro}
              onChange={(e) =>
                cambiarCategoria(
                  e.target.value
                )
              }
            >

              <option value="">
                Todas las categorías
              </option>

              <option value="Materia prima">
                Materia prima
              </option>

              <option value="Insumo químico">
                Insumo químico
              </option>

              <option value="Embalaje">
                Embalaje
              </option>

              <option value="Herramienta">
                Herramienta
              </option>

              <option value="Otro">
                Otro
              </option>

            </select>


            <select
              className="filtro-select"
              value={stockFiltro}
              onChange={(e) =>
                cambiarStock(
                  e.target.value
                )
              }
            >

              <option value="">
                Todo el stock
              </option>

              <option value="bajo">
                Stock bajo
              </option>

              <option value="medio">
                Stock medio
              </option>

              <option value="ok">
                Stock suficiente
              </option>

            </select>

          </div>


          {/* TABLA */}

          {insumosPagina.length > 0 ? (

            <div className="tabla-wrap">

              <table className="tabla-insumos">

                <thead>

                  <tr>

                    <th>Nombre</th>

                    <th>Categoría</th>

                    <th>
                      Cantidad disponible
                    </th>

                    <th>Unidad</th>

                    <th>Precio unitario</th>

                    <th>Proveedor</th>

                    <th>Estado stock</th>

                    <th>Acciones</th>

                  </tr>

                </thead>


                <tbody>

                  {insumosPagina.map(
                    (insumo) => {

                      const estado =
                        estadoStock(insumo);

                      const categoriaColores = {
                        "Materia prima": {
                          bg: "#e8f5e9",
                          fg: "#1b6d2a",
                        },

                        "Insumo químico": {
                          bg: "#fde8e8",
                          fg: "#9a1e1e",
                        },

                        Embalaje: {
                          bg: "#e3f2fd",
                          fg: "#1d4ed8",
                        },

                        Herramienta: {
                          bg: "#fff8e1",
                          fg: "#9a6b00",
                        },

                        Otro: {
                          bg: "#f3f4f6",
                          fg: "#6d7a68",
                        },
                      };


                      const colorCategoria =
                        categoriaColores[
                          insumo.categoria
                        ] ||
                        categoriaColores.Otro;


                      return (

                        <tr
                          key={insumo.id}
                        >

                          {/* NOMBRE */}

                          <td>

                            <div className="ins-nombre-cell">

                              <div className="avatar-ins">

                                <i className="fas fa-box"></i>

                              </div>

                              {insumo.nombre}

                            </div>

                          </td>


                          {/* CATEGORÍA */}

                          <td>

                            <span
                              style={{
                                padding:
                                  "4px 10px",
                                background:
                                  colorCategoria.bg,
                                color:
                                  colorCategoria.fg,
                                borderRadius:
                                  "20px",
                                fontSize:
                                  "11px",
                                fontWeight:
                                  "bold",
                              }}
                            >
                              {insumo.categoria}
                            </span>

                          </td>


                          {/* CANTIDAD */}

                          <td>

                            <span
                              className={
                                estado === "bajo"
                                  ? "celda-stock-bajo"
                                  : "celda-cantidad"
                              }
                            >
                              {insumo.cantidad.toLocaleString(
                                "es-CO"
                              )}{" "}
                              {insumo.unidad}
                            </span>

                          </td>


                          {/* UNIDAD */}

                          <td>

                            <span className="badge-unidad">
                              {insumo.unidad}
                            </span>

                          </td>


                          {/* PRECIO */}

                          <td className="celda-valor">

                            {formatCOP(
                              insumo.precio
                            )}

                          </td>


                          {/* PROVEEDOR */}

                          <td>

                            {nombreProveedor(
                              insumo.proveedorId
                            ) ? (

                              <span className="badge-proveedor">
                                {nombreProveedor(
                                  insumo.proveedorId
                                )}
                              </span>

                            ) : (

                              <span
                                style={{
                                  color: "#aaa",
                                  fontSize: "12px",
                                }}
                              >
                                —
                              </span>

                            )}

                          </td>


                          {/* STOCK */}

                          <td>

                            {estado === "bajo" && (

                              <span className="stock-bajo">

                                <i className="fas fa-circle-exclamation"></i>

                                {" "}Stock bajo

                              </span>

                            )}


                            {estado === "medio" && (

                              <span className="stock-medio">

                                <i className="fas fa-triangle-exclamation"></i>

                                {" "}Stock medio

                              </span>

                            )}


                            {estado === "ok" && (

                              <span className="stock-ok">

                                <i className="fas fa-circle-check"></i>

                                {" "}Suficiente

                              </span>

                            )}

                          </td>


                          {/* ACCIONES */}

                          <td>

                            <div className="acciones-fila">

                              <button
                                className="btn-icon btn-editar"
                                title="Editar"
                                onClick={() =>
                                  abrirEditarInsumo(
                                    insumo
                                  )
                                }
                              >

                                <i className="fas fa-pen"></i>

                              </button>


                              <button
                                className="btn-icon btn-eliminar"
                                title="Eliminar"
                                onClick={() =>
                                  pedirEliminarInsumo(
                                    insumo
                                  )
                                }
                              >

                                <i className="fas fa-trash"></i>

                              </button>

                            </div>

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div
              className="vacio-estado"
              style={{
                display: "flex",
              }}
            >

              <i className="fas fa-box-open"></i>

              <p>
                No se encontraron insumos
                con ese criterio.
              </p>

            </div>

          )}


          {/* PAGINACIÓN */}

          {insumosFiltrados.length > 0 && (

            <div className="paginacion">

              <div className="paginacion-info">

                Mostrando{" "}
                {indiceInicio + 1}
                –
                {Math.min(
                  indiceInicio +
                    POR_PAGINA,
                  insumosFiltrados.length
                )}{" "}
                de{" "}
                {insumosFiltrados.length}{" "}
                insumos

              </div>


              <div className="paginacion-btns">

                <button
                  className="pag-btn"
                  disabled={
                    paginaSegura === 1
                  }
                  onClick={() =>
                    setPaginaActual(
                      (pagina) =>
                        Math.max(
                          1,
                          pagina - 1
                        )
                    )
                  }
                >
                  ‹ Anterior
                </button>


                {Array.from(
                  {
                    length: totalPaginas,
                  },
                  (_, index) =>
                    index + 1
                ).map((pagina) => (

                  <button
                    key={pagina}
                    className={`pag-btn ${
                      pagina ===
                      paginaSegura
                        ? "activo"
                        : ""
                    }`}
                    onClick={() =>
                      setPaginaActual(
                        pagina
                      )
                    }
                  >
                    {pagina}
                  </button>

                ))}


                <button
                  className="pag-btn"
                  disabled={
                    paginaSegura ===
                    totalPaginas
                  }
                  onClick={() =>
                    setPaginaActual(
                      (pagina) =>
                        Math.min(
                          totalPaginas,
                          pagina + 1
                        )
                    )
                  }
                >
                  Siguiente ›
                </button>

              </div>

            </div>

          )}

        </section>


        {/* =================================================
            PROVEEDORES
        ================================================= */}

        <section
          className="seccion"
          id="seccionProveedores"
        >

          <div className="seccion-head">

            <div>

              <h2>

                <i className="fas fa-truck"></i>
                {" "}Proveedores

              </h2>

              <p>
                Consulta, edita y elimina los
                proveedores registrados para
                tus insumos.
              </p>

            </div>


            <button
              className="btn-primario"
              onClick={abrirNuevoProveedor}
            >

              <i className="fas fa-plus"></i>
              {" "}Nuevo proveedor

            </button>

          </div>


          {proveedores.length > 0 ? (

            <div className="tabla-wrap">

              <table className="tabla-insumos">

                <thead>

                  <tr>

                    <th>Nombre</th>

                    <th>Correo</th>

                    <th>Teléfono</th>

                    <th>Descripción</th>

                    <th>Acciones</th>

                  </tr>

                </thead>


                <tbody>

                  {proveedores.map(
                    (proveedor) => (

                      <tr
                        key={
                          proveedor.id
                        }
                      >

                        <td>

                          <div className="ins-nombre-cell">

                            <div className="avatar-ins">

                              <i className="fas fa-truck"></i>

                            </div>

                            {proveedor.nombre}

                          </div>

                        </td>


                        <td>
                          {proveedor.correo ||
                            "—"}
                        </td>


                        <td>
                          {proveedor.telefono ||
                            "—"}
                        </td>


                        <td>
                          {proveedor.descripcion ||
                            "—"}
                        </td>


                        <td>

                          <div className="acciones-fila">

                            <button
                              className="btn-icon btn-editar"
                              title="Editar"
                              onClick={() =>
                                abrirEditarProveedor(
                                  proveedor
                                )
                              }
                            >

                              <i className="fas fa-pen"></i>

                            </button>


                            <button
                              className="btn-icon btn-eliminar"
                              title="Eliminar"
                              onClick={() =>
                                pedirEliminarProveedor(
                                  proveedor
                                )
                              }
                            >

                              <i className="fas fa-trash"></i>

                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <div
              className="vacio-estado"
              style={{
                display: "flex",
              }}
            >

              <i className="fas fa-truck"></i>

              <p>
                No tienes proveedores
                registrados todavía.
              </p>

            </div>

          )}

        </section>

      </main>


      {/* =================================================
          MODAL NUEVO / EDITAR INSUMO
      ================================================= */}

      {modalInsumo && (

        <div
          className="modal-overlay activo"
          onClick={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {
              cerrarModalInsumo();
            }

          }}
        >

          <div className="modal-box">

            <div className="modal-head">

              <h2>

                <i
                  className={
                    insumoEditando
                      ? "fas fa-pen"
                      : "fas fa-plus"
                  }
                ></i>

                {" "}

                {insumoEditando
                  ? "Editar insumo"
                  : "Nuevo insumo"}

              </h2>


              <button
                className="modal-cerrar"
                onClick={
                  cerrarModalInsumo
                }
              >

                <i className="fas fa-xmark"></i>

              </button>

            </div>


            <div className="modal-body">

              {/* NOMBRE */}

              <div className="campo">

                <label>
                  Nombre{" "}
                  <span className="req">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Ej: Aceite de oliva"
                  value={
                    formInsumo.nombre
                  }
                  onChange={(e) =>
                    setFormInsumo({
                      ...formInsumo,
                      nombre:
                        e.target.value,
                    })
                  }
                />

              </div>


              {/* CATEGORÍA */}

              <div className="campo">

                <label>
                  Categoría
                </label>

                <select
                  value={
                    formInsumo.categoria
                  }
                  onChange={(e) =>
                    setFormInsumo({
                      ...formInsumo,
                      categoria:
                        e.target.value,
                    })
                  }
                >

                  <option value="Materia prima">
                    Materia prima
                  </option>

                  <option value="Insumo químico">
                    Insumo químico
                  </option>

                  <option value="Embalaje">
                    Embalaje
                  </option>

                  <option value="Herramienta">
                    Herramienta
                  </option>

                  <option value="Otro">
                    Otro
                  </option>

                </select>

              </div>


              {/* CANTIDAD + UNIDAD */}

              <div className="campos-fila">

                <div className="campo">

                  <label>
                    Cantidad disponible{" "}
                    <span className="req">
                      *
                    </span>
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0"
                    value={
                      formInsumo.cantidad
                    }
                    onChange={(e) =>
                      setFormInsumo({
                        ...formInsumo,
                        cantidad:
                          e.target.value,
                      })
                    }
                  />

                </div>


                <div className="campo">

                  <label>
                    Unidad de medida{" "}
                    <span className="req">
                      *
                    </span>
                  </label>

                  <select
                    value={
                      formInsumo.unidad
                    }
                    onChange={(e) =>
                      setFormInsumo({
                        ...formInsumo,
                        unidad:
                          e.target.value,
                      })
                    }
                  >

                    <option value="unidad">
                      unidad
                    </option>

                    <option value="kg">
                      kg
                    </option>

                    <option value="g">
                      g
                    </option>

                    <option value="litro">
                      litro
                    </option>

                    <option value="ml">
                      ml
                    </option>

                    <option value="metro">
                      metro
                    </option>

                    <option value="cm">
                      cm
                    </option>

                    <option value="rollo">
                      rollo
                    </option>

                    <option value="caja">
                      caja
                    </option>

                    <option value="bolsa">
                      bolsa
                    </option>

                  </select>

                </div>

              </div>


              {/* PRECIO */}

              <div className="campo">

                <label>
                  Precio unitario{" "}
                  <span className="req">
                    *
                  </span>
                </label>

                <div className="input-prefix-wrap">

                  <span className="input-prefix">
                    $
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="100"
                    placeholder="0"
                    value={
                      formInsumo.precio
                    }
                    onChange={(e) =>
                      setFormInsumo({
                        ...formInsumo,
                        precio:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>


              {/* PROVEEDOR */}

              <div className="campo">

                <label>
                  Proveedor
                </label>

                <select
                  value={
                    formInsumo.proveedorId
                  }
                  onChange={(e) =>
                    setFormInsumo({
                      ...formInsumo,
                      proveedorId:
                        e.target.value,
                    })
                  }
                >

                  <option value="">
                    Sin proveedor
                  </option>

                  {proveedores.map(
                    (proveedor) => (

                      <option
                        key={
                          proveedor.id
                        }
                        value={
                          proveedor.id
                        }
                      >
                        {proveedor.nombre}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* STOCK MÍNIMO */}

              <div className="campo">

                <label>
                  Stock mínimo de alerta
                </label>

                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Ej: 5"
                  value={
                    formInsumo.stockMin
                  }
                  onChange={(e) =>
                    setFormInsumo({
                      ...formInsumo,
                      stockMin:
                        e.target.value,
                    })
                  }
                />

              </div>

            </div>


            <div className="modal-footer">

              <button
                className="btn-secundario"
                onClick={
                  cerrarModalInsumo
                }
              >
                Cancelar
              </button>


              <button
                className="btn-primario"
                onClick={
                  guardarInsumo
                }
              >

                <i className="fas fa-check"></i>
                {" "}Guardar

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          MODAL ELIMINAR INSUMO
      ================================================= */}

      {modalEliminar && (
        <div
          className="modal-overlay activo"
          onClick={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {
              cerrarModalEliminar();
            }

          }}
        >

          <div className="modal-box modal-chico">

            <div className="modal-head modal-head-danger">

              <h2>

                <i className="fas fa-triangle-exclamation"></i>

                {" "}Eliminar insumo

              </h2>


              <button
                className="modal-cerrar"
                onClick={
                  cerrarModalEliminar
                }
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
                      "{insumoEliminar?.nombre}"
                    </strong>

                    .

                  </p>

                  <p className="alerta-sub">
                    Esta acción no se puede
                    deshacer.
                  </p>

                </div>

              </div>


              {insumoEliminar &&
                insumoEliminar.proveedorId && (

                  <div
                    className="alerta-warning"
                    style={{
                      display: "flex",
                    }}
                  >

                    <i className="fas fa-circle-info"></i>

                    <p>
                      Este insumo está asociado
                      a un proveedor. Al eliminarlo,
                      también desaparecerá del
                      listado de insumos.
                    </p>

                  </div>

                )}

            </div>


            <div className="modal-footer">

              <button
                className="btn-secundario"
                onClick={
                  cerrarModalEliminar
                }
              >
                Cancelar
              </button>


              <button
                className="btn-danger"
                onClick={
                  confirmarEliminarInsumo
                }
              >

                <i className="fas fa-trash"></i>
                {" "}Sí, eliminar

              </button>

            </div>

          </div>

        </div>
      )}


      {/* =================================================
          MODAL NUEVO / EDITAR PROVEEDOR
      ================================================= */}

      {modalProveedor && (

        <div
          className="modal-overlay activo"
          onClick={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {
              cerrarModalProveedor();
            }

          }}
        >

          <div className="modal-box">

            <div className="modal-head">

              <h2>

                <i
                  className={
                    proveedorEditando
                      ? "fas fa-pen"
                      : "fas fa-plus"
                  }
                ></i>

                {" "}

                {proveedorEditando
                  ? "Editar proveedor"
                  : "Nuevo proveedor"}

              </h2>


              <button
                className="modal-cerrar"
                onClick={
                  cerrarModalProveedor
                }
              >

                <i className="fas fa-xmark"></i>

              </button>

            </div>


            <div className="modal-body">

              <div className="campo">

                <label>
                  Nombre{" "}
                  <span className="req">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Ej: Proveedor de aceites naturales"
                  value={
                    formProveedor.nombre
                  }
                  onChange={(e) =>
                    setFormProveedor({
                      ...formProveedor,
                      nombre:
                        e.target.value,
                    })
                  }
                />

              </div>


              <div className="campo">

                <label>
                  Correo{" "}
                  <span className="req">
                    *
                  </span>
                </label>

                <input
                  type="email"
                  placeholder="Ej: contacto@proveedor.com"
                  value={
                    formProveedor.correo
                  }
                  onChange={(e) =>
                    setFormProveedor({
                      ...formProveedor,
                      correo:
                        e.target.value,
                    })
                  }
                />

              </div>


              <div className="campo">

                <label>
                  Teléfono / Contacto{" "}
                  <span className="req">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Ej: 300 123 4567"
                  value={
                    formProveedor.telefono
                  }
                  onChange={(e) =>
                    setFormProveedor({
                      ...formProveedor,
                      telefono:
                        e.target.value,
                    })
                  }
                />

              </div>


              <div className="campo">

                <label>
                  Descripción
                </label>

                <textarea
                  rows="3"
                  placeholder="Ej: Proveedor de aceites y materias primas naturales."
                  value={
                    formProveedor.descripcion
                  }
                  onChange={(e) =>
                    setFormProveedor({
                      ...formProveedor,
                      descripcion:
                        e.target.value,
                    })
                  }
                ></textarea>

              </div>

            </div>


            <div className="modal-footer">

              <button
                className="btn-secundario"
                onClick={
                  cerrarModalProveedor
                }
              >
                Cancelar
              </button>


              <button
                className="btn-primario"
                onClick={
                  guardarProveedor
                }
              >

                <i className="fas fa-check"></i>
                {" "}Guardar

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          MODAL ELIMINAR PROVEEDOR
      ================================================= */}

      {modalEliminarProveedor && (

        <div
          className="modal-overlay activo"
          onClick={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {
              cerrarModalEliminarProveedor();
            }

          }}
        >

          <div className="modal-box modal-chico">

            <div className="modal-head modal-head-danger">

              <h2>

                <i className="fas fa-triangle-exclamation"></i>

                {" "}Eliminar proveedor

              </h2>


              <button
                className="modal-cerrar"
                onClick={
                  cerrarModalEliminarProveedor
                }
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
                      "{proveedorEliminar?.nombre}"
                    </strong>

                    .

                  </p>

                  <p className="alerta-sub">
                    Esta acción no se puede
                    deshacer.
                  </p>

                </div>

              </div>


              {proveedorEliminar && (

                (() => {

                  const asociados =
                    insumos.filter(
                      (insumo) =>
                        insumo.proveedorId ===
                        proveedorEliminar.id
                    );

                  if (!asociados.length) {
                    return null;
                  }

                  return (

                    <div
                      className="alerta-warning"
                      style={{
                        display: "flex",
                      }}
                    >

                      <i className="fas fa-triangle-exclamation"></i>

                      <p>

                        Este proveedor está asociado
                        a{" "}
                        <strong>
                          {asociados.length}
                        </strong>{" "}
                        insumo(s):{" "}

                        {asociados
                          .map(
                            (insumo) =>
                              insumo.nombre
                          )
                          .join(", ")}

                        . Si lo eliminas, esos
                        insumos quedarán sin
                        proveedor asignado.

                      </p>

                    </div>

                  );

                })()

              )}

            </div>


            <div className="modal-footer">

              <button
                className="btn-secundario"
                onClick={
                  cerrarModalEliminarProveedor
                }
              >
                Cancelar
              </button>


              <button
                className="btn-danger"
                onClick={
                  confirmarEliminarProveedor
                }
              >

                <i className="fas fa-trash"></i>
                {" "}Sí, eliminar

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          TOAST
      ================================================= */}

      <div
        className={`toast ${
          toast.visible
            ? "visible"
            : ""
        } ${
          toast.tipo === "error"
            ? "toast-error"
            : ""
        }`}
      >

        <i
          className={
            toast.tipo === "error"
              ? "fas fa-circle-xmark"
              : "fas fa-check-circle"
          }
        ></i>

        <span>
          {toast.mensaje}
        </span>

      </div>

    </>
  );
}