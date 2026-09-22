import { useState } from "react";
import NavbarEmpleado from "../../components/empleado/NavbarEmpleado";
import SidebarEmpleado from "../../components/empleado/SidebarEmpleado";
import "../../styles/empleado.css";

export default function ProduccionEmpleado() {

  // =====================================================
  // PRODUCTOS Y RECETA DE INSUMOS
  // =====================================================

  const productosData = [
    {
      id: 1,
      nombre: "Jabón Artesanal de Lavanda",

      insumos: [
        {
          id: 1,
          cant: 0.05,
        },
        {
          id: 2,
          cant: 0.02,
        },
        {
          id: 3,
          cant: 0.005,
        },
      ],
    },

    {
      id: 2,
      nombre: "Jabón Artesanal de Miel",

      insumos: [
        {
          id: 1,
          cant: 0.05,
        },
        {
          id: 4,
          cant: 0.015,
        },
        {
          id: 5,
          cant: 0.01,
        },
      ],
    },

    {
      id: 3,
      nombre: "Jabón Artesanal de Avena",

      insumos: [
        {
          id: 1,
          cant: 0.04,
        },
        {
          id: 2,
          cant: 0.03,
        },
        {
          id: 6,
          cant: 0.015,
        },
      ],
    },

    {
      id: 4,
      nombre: "Jabón Artesanal de Caléndula",

      insumos: [
        {
          id: 1,
          cant: 0.05,
        },
        {
          id: 2,
          cant: 0.02,
        },
        {
          id: 7,
          cant: 0.005,
        },
      ],
    },
  ];


  // =====================================================
  // STOCK DE INSUMOS
  // =====================================================

  const [insumos, setInsumos] = useState([
    {
      id: 1,
      nombre: "Aceite de Oliva",
      u: "kg",
      s: 8,
      m: 10,
    },

    {
      id: 2,
      nombre: "Aceite de Coco",
      u: "kg",
      s: 6,
      m: 8,
    },

    {
      id: 3,
      nombre: "Esencia de Lavanda",
      u: "lt",
      s: 2,
      m: 3,
    },

    {
      id: 4,
      nombre: "Miel Natural",
      u: "kg",
      s: 4,
      m: 5,
    },

    {
      id: 5,
      nombre: "Aditivo Natural de Miel",
      u: "kg",
      s: 3,
      m: 4,
    },

    {
      id: 6,
      nombre: "Avena en Polvo",
      u: "kg",
      s: 5,
      m: 6,
    },

    {
      id: 7,
      nombre: "Extracto de Caléndula",
      u: "lt",
      s: 2,
      m: 3,
    },
  ]);


  // =====================================================
  // ESTADOS DEL FORMULARIO
  // =====================================================

  const [productoId, setProductoId] =
    useState("");

  const [unidades, setUnidades] =
    useState("");

  const [fecha, setFecha] =
    useState(
      new Date().toISOString().slice(0, 10)
    );

  const [observacion, setObservacion] =
    useState("");


  // =====================================================
  // HISTORIAL
  // =====================================================

  const [historial, setHistorial] =
    useState([]);


  // =====================================================
  // FILTROS
  // =====================================================

  const [filtroProducto, setFiltroProducto] =
    useState("");

  const [filtroFecha, setFiltroFecha] =
    useState("");


  // =====================================================
  // MODAL
  // =====================================================

  const [registroDetalle, setRegistroDetalle] =
    useState(null);


  // =====================================================
  // TOAST
  // =====================================================

  const [toast, setToast] =
    useState({
      visible: false,
      mensaje: "",
      tipo: "ok",
    });


  // =====================================================
  // UTILIDADES
  // =====================================================

  const fmt = (numero) => {

    return parseFloat(
      Number(numero).toFixed(3)
    );

  };


  const mostrarToast = (
    mensaje,
    tipo = "ok"
  ) => {

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

    }, 3000);

  };


  // =====================================================
  // PRODUCTO SELECCIONADO
  // =====================================================

  const productoSeleccionado =
    productosData.find(
      (producto) =>
        producto.id ===
        parseInt(productoId)
    );


  // =====================================================
  // CONSUMO DE INSUMOS
  // =====================================================

  const obtenerConsumo = () => {

    if (
      !productoSeleccionado ||
      !unidades ||
      Number(unidades) <= 0
    ) {
      return [];
    }


    return productoSeleccionado.insumos.map(
      (receta) => {

        const insumo =
          insumos.find(
            (item) =>
              item.id === receta.id
          );


        if (!insumo) {
          return null;
        }


        const esperado = fmt(
          receta.cant *
            Number(unidades)
        );


        return {
          ...insumo,
          esperado,
        };

      }
    ).filter(Boolean);

  };


  const consumoInsumos =
    obtenerConsumo();


  // =====================================================
  // MERMAS
  // =====================================================

  const [mermas, setMermas] =
    useState({});


  const actualizarMerma = (
    insumoId,
    valor
  ) => {

    setMermas(
      (anteriores) => ({
        ...anteriores,
        [insumoId]:
          parseFloat(valor) || 0,
      })
    );

  };


  const obtenerTotalConsumo = (
    insumo
  ) => {

    const merma =
      mermas[insumo.id] || 0;


    return fmt(
      insumo.esperado + merma
    );

  };


  // =====================================================
  // RESUMEN
  // =====================================================

  const totalRegistros =
    historial.length;


  const totalUnidades =
    historial.reduce(
      (total, registro) =>
        total + registro.unidades,
      0
    );


  const productosFabricados =
    [
      ...new Set(
        historial.map(
          (registro) =>
            registro.productoId
        )
      ),
    ].length;


  const alertasStock =
    insumos.filter(
      (insumo) =>
        insumo.s < insumo.m
    ).length;


  // =====================================================
  // LIMPIAR FORMULARIO
  // =====================================================

  const limpiarForm = () => {

    setProductoId("");

    setUnidades("");

    setFecha(
      new Date()
        .toISOString()
        .slice(0, 10)
    );

    setObservacion("");

    setMermas({});

  };


  // =====================================================
  // GUARDAR PRODUCCIÓN
  // =====================================================

  const guardarProduccion = () => {

    const cantidad =
      parseFloat(unidades);


    // Validar producto

    if (!productoId) {

      mostrarToast(
        "Selecciona un producto.",
        "error"
      );

      return;
    }


    // Validar unidades

    if (
      !cantidad ||
      cantidad <= 0
    ) {

      mostrarToast(
        "Ingresa una cantidad válida.",
        "error"
      );

      return;
    }


    // Validar fecha

    if (!fecha) {

      mostrarToast(
        "Selecciona la fecha.",
        "error"
      );

      return;
    }


    const prod =
      productosData.find(
        (producto) =>
          producto.id ===
          parseInt(productoId)
      );


    // =================================================
    // CALCULAR CONSUMO
    // =================================================

    const insumosConsumidos =
      prod.insumos.map(
        (receta) => {

          const insumo =
            insumos.find(
              (item) =>
                item.id ===
                receta.id
            );


          const esperado =
            fmt(
              receta.cant *
                cantidad
            );


          const merma =
            mermas[receta.id] || 0;


          const total =
            fmt(
              esperado + merma
            );


          return {
            id: receta.id,
            nombre: insumo.nombre,
            u: insumo.u,
            esperado,
            merma,
            total,
          };

        }
      );


    // =================================================
    // COMPROBAR STOCK
    // =================================================

    const sinStock =
      insumosConsumidos.filter(
        (consumo) => {

          const insumo =
            insumos.find(
              (item) =>
                item.id ===
                consumo.id
            );


          return (
            insumo.s <
            consumo.total
          );

        }
      );


    if (sinStock.length > 0) {

      const nombres =
        sinStock
          .map(
            (item) =>
              item.nombre
          )
          .join(", ");


      mostrarToast(
        `Stock insuficiente: ${nombres}`,
        "error"
      );

      return;
    }


    // =================================================
    // DESCONTAR STOCK
    // =================================================

    setInsumos(
      (anteriores) =>
        anteriores.map(
          (insumo) => {

            const consumo =
              insumosConsumidos.find(
                (item) =>
                  item.id ===
                  insumo.id
              );


            if (!consumo) {
              return insumo;
            }


            return {
              ...insumo,

              s: fmt(
                insumo.s -
                  consumo.total
              ),
            };

          }
        )
    );


    // =================================================
    // CREAR REGISTRO
    // =================================================

    const nuevoRegistro = {

      id: Date.now(),

      productoId:
        parseInt(productoId),

      productoNombre:
        prod.nombre,

      unidades:
        cantidad,

      fecha,

      obs:
        observacion.trim(),

      insumosConsumidos,

    };


    setHistorial(
      (anteriores) => [
        nuevoRegistro,
        ...anteriores,
      ]
    );


    // =================================================
    // LIMPIAR
    // =================================================

    limpiarForm();


    mostrarToast(
      `Guardado — ${cantidad} und. de ${prod.nombre}`
    );

  };


  // =====================================================
  // HISTORIAL FILTRADO
  // =====================================================

  const historialFiltrado =
    historial.filter(
      (registro) => {

        const coincideProducto =
          !filtroProducto ||
          registro.productoNombre
            .toLowerCase()
            .includes(
              filtroProducto
                .toLowerCase()
            );


        const coincideFecha =
          !filtroFecha ||
          registro.fecha ===
            filtroFecha;


        return (
          coincideProducto &&
          coincideFecha
        );

      }
    );


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

            <i className="fas fa-industry"></i>

            {" "}Registro de Producción

          </h1>

          <p>
            Registra las unidades producidas por
            jornada. El stock de insumos se
            descuenta automáticamente.
          </p>

        </div>


        {/* =================================================
            TARJETAS RESUMEN
        ================================================= */}

        <div className="tarjetas-resumen">


          <div className="tarjeta-res tarjeta-verde">

            <div className="tarjeta-icono">

              <i className="fas fa-clipboard-list"></i>

            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">

                {totalRegistros}

              </div>

              <div className="tarjeta-label">

                Registros del día

              </div>

            </div>

          </div>


          <div className="tarjeta-res tarjeta-azul">

            <div className="tarjeta-icono">

              <i className="fas fa-cubes"></i>

            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">

                {totalUnidades}

              </div>

              <div className="tarjeta-label">

                Unidades producidas

              </div>

            </div>

          </div>


          <div className="tarjeta-res tarjeta-amarillo">

            <div className="tarjeta-icono">

              <i className="fas fa-cube"></i>

            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">

                {productosFabricados}

              </div>

              <div className="tarjeta-label">

                Productos fabricados

              </div>

            </div>

          </div>


          <div className="tarjeta-res tarjeta-rojo">

            <div className="tarjeta-icono">

              <i className="fas fa-triangle-exclamation"></i>

            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">

                {alertasStock}

              </div>

              <div className="tarjeta-label">

                Alertas de stock

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            FILA PRODUCCIÓN + HISTORIAL
        ================================================= */}

        <div className="grid-prod">


          {/* =================================================
              FORMULARIO
          ================================================= */}

          <div className="seccion">

            <div className="seccion-head">

              <div>

                <h2>

                  <i className="fas fa-plus-circle"></i>

                  {" "}Nueva jornada

                </h2>

                <p>
                  Completa los datos de producción
                  del día
                </p>

              </div>

            </div>


            <div className="form-grid">


              {/* PRODUCTO */}

              <div className="form-group full">

                <label className="form-label">

                  Producto fabricado

                </label>


                <select
                  className="form-select"
                  value={productoId}
                  onChange={(e) => {

                    setProductoId(
                      e.target.value
                    );

                    setMermas({});

                  }}
                >

                  <option value="">

                    — Selecciona un producto —

                  </option>


                  {productosData.map(
                    (producto) => (

                      <option
                        key={producto.id}
                        value={producto.id}
                      >

                        {producto.nombre}

                      </option>

                    )
                  )}

                </select>

              </div>


              {/* UNIDADES */}

              <div className="form-group">

                <label className="form-label">

                  Unidades producidas

                </label>


                <input
                  type="number"
                  className="form-input"
                  min="1"
                  placeholder="Ej: 15"
                  value={unidades}
                  onChange={(e) =>
                    setUnidades(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* FECHA */}

              <div className="form-group">

                <label className="form-label">

                  Fecha de producción

                </label>


                <input
                  type="date"
                  className="form-input"
                  value={fecha}
                  onChange={(e) =>
                    setFecha(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* OBSERVACIÓN */}

              <div className="form-group full">

                <label className="form-label">

                  Observación{" "}

                  <span
                    style={{
                      fontWeight: 400,
                      color: "#8a9690",
                    }}
                  >
                    (opcional)
                  </span>

                </label>


                <textarea
                  className="form-textarea"
                  placeholder="Ej: Faltó insumo, tiempo extra, incidencia del día..."
                  value={observacion}
                  onChange={(e) =>
                    setObservacion(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>


            {/* =================================================
                RESUMEN DE INSUMOS
            ================================================= */}

            <div className="resumen-insumos">

              <div className="resumen-titulo">

                <i className="fas fa-flask"></i>

                {" "}Insumos que se descontarán

              </div>


              {consumoInsumos.length === 0 ? (

                <div className="sin-producto">

                  Selecciona un producto y las
                  unidades para ver el consumo
                  estimado.

                </div>

              ) : (

                <>

                  <div
                    style={{
                      fontSize: "11px",
                      color: "#8a9690",
                      marginBottom: "10px",
                    }}
                  >

                    <i className="fas fa-circle-info"></i>

                    {" "}Si usaste más de lo calculado,
                    anota la merma extra.

                  </div>


                  {consumoInsumos.map(
                    (insumo) => {

                      const total =
                        obtenerTotalConsumo(
                          insumo
                        );


                      const sinStock =
                        insumo.s <
                        total;


                      return (

                        <div
                          className="insumo-fila-merma"
                          key={insumo.id}
                        >

                          <div className="insumo-fila-top">

                            <span className="insumo-nombre">

                              <div className="insumo-ic">

                                <i className="fas fa-flask"></i>

                              </div>

                              {insumo.nombre}

                            </span>


                            <span className="insumo-esperado">

                              Esperado:{" "}

                              <strong>
                                −{insumo.esperado}{" "}
                                {insumo.u}
                              </strong>


                              {sinStock && (

                                <span className="insumo-alerta">

                                  <i className="fas fa-triangle-exclamation"></i>

                                  {" "}Stock insuficiente
                                  ({insumo.s}{" "}
                                  {insumo.u})

                                </span>

                              )}

                            </span>

                          </div>


                          {/* MERMA */}

                          <div className="merma-fila">

                            <label className="merma-label">

                              <i
                                className="fas fa-exclamation-triangle"
                                style={{
                                  color: "#d97706",
                                  fontSize: "10px",
                                }}
                              ></i>

                              {" "}Merma extra (
                              {insumo.u})

                            </label>


                            <input
                              type="number"
                              className="merma-input"
                              min="0"
                              step="0.001"
                              placeholder="0"
                              value={
                                mermas[
                                  insumo.id
                                ] || ""
                              }
                              onChange={(e) =>
                                actualizarMerma(
                                  insumo.id,
                                  e.target.value
                                )
                              }
                            />


                            <span className="merma-total">

                              {insumo.s <
                              total ? (

                                <span
                                  style={{
                                    color: "#b91c1c",
                                  }}
                                >

                                  Total: −
                                  {total}{" "}
                                  {insumo.u}

                                  {" "}

                                  <i className="fas fa-triangle-exclamation"></i>

                                </span>

                              ) : (

                                <>
                                  Total: −
                                  {total}{" "}
                                  {insumo.u}
                                </>

                              )}

                            </span>

                          </div>

                        </div>

                      );

                    }
                  )}

                </>

              )}

            </div>


            {/* =================================================
                BOTONES
            ================================================= */}

            <div className="form-footer">

              <button
                type="button"
                className="btn-sec"
                onClick={limpiarForm}
              >

                <i className="fas fa-rotate-left"></i>

                {" "}Limpiar

              </button>


              <button
                type="button"
                className="btn-pri"
                onClick={guardarProduccion}
              >

                <i className="fas fa-check"></i>

                {" "}Guardar registro

              </button>

            </div>

          </div>


          {/* =================================================
              HISTORIAL
          ================================================= */}

          <div className="seccion">

            <div className="seccion-head">

              <div>

                <h2>

                  <i className="fas fa-clock-rotate-left"></i>

                  {" "}Historial de producción

                </h2>

                <p>
                  Registros guardados en esta sesión
                </p>

              </div>


              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#8a9690",
                }}
              >

                {historialFiltrado.length}{" "}

                {historialFiltrado.length === 1
                  ? "registro"
                  : "registros"}

              </span>

            </div>


            {/* FILTROS */}

            <div className="historial-filtros">

              <div
                className="filtro-wrap"
                style={{
                  flex: 1,
                }}
              >

                <i className="fas fa-search filtro-icono"></i>


                <input
                  type="text"
                  className="filtro-input"
                  placeholder="Buscar producto..."
                  value={filtroProducto}
                  onChange={(e) =>
                    setFiltroProducto(
                      e.target.value
                    )
                  }
                />

              </div>


              <input
                type="date"
                className="filtro-input"
                style={{
                  minWidth: 0,
                }}
                value={filtroFecha}
                onChange={(e) =>
                  setFiltroFecha(
                    e.target.value
                  )
                }
              />

            </div>


            {/* TABLA */}

            <div
              className="tabla-wrap"
              style={{
                paddingTop: "10px",
              }}
            >

              {historialFiltrado.length === 0 ? (

                <div
                  className="vacio-estado"
                  style={{
                    display: "flex",
                  }}
                >

                  <i className="fas fa-clipboard-list"></i>

                  <p>

                    Aún no hay registros.

                    <br />

                    Guarda tu primera jornada
                    de producción.

                  </p>

                </div>

              ) : (

                <table className="t-prod">

                  <thead>

                    <tr>

                      <th>
                        Producto
                      </th>

                      <th>
                        Unidades
                      </th>

                      <th>
                        Fecha
                      </th>

                      <th>
                        Estado
                      </th>

                      <th></th>

                    </tr>

                  </thead>


                  <tbody>

                    {historialFiltrado.map(
                      (registro) => (

                        <tr
                          key={registro.id}
                        >

                          <td>

                            <div className="prod-cell">

                              <div className="prod-ic">

                                <i className="fas fa-cube"></i>

                              </div>

                              {registro.productoNombre}

                            </div>

                          </td>


                          <td
                            style={{
                              fontWeight: 800,
                              color: "#1b6d4a",
                            }}
                          >

                            {registro.unidades}{" "}
                            und.

                          </td>


                          <td
                            style={{
                              color: "#5b6a62",
                              fontSize: "12px",
                            }}
                          >

                            {registro.fecha}

                          </td>


                          <td>

                            <span className="badge-ok">

                              <i className="fas fa-circle-check"></i>

                              {" "}Guardado

                            </span>

                          </td>


                          <td>

                            <button
                              type="button"
                              className="btn-sm"
                              onClick={() =>
                                setRegistroDetalle(
                                  registro
                                )
                              }
                            >

                              <i className="fas fa-eye"></i>

                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              )}

            </div>

          </div>

        </div>


        {/* =================================================
            STOCK ACTUAL
        ================================================= */}

        <div className="seccion">

          <div className="seccion-head">

            <div>

              <h2>

                <i className="fas fa-boxes-stacked"></i>

                {" "}Stock actual de insumos

              </h2>

              <p>
                Se actualiza automáticamente al
                guardar cada registro
              </p>

            </div>


            <button
              type="button"
              className="btn-sec"
              style={{
                fontSize: "12px",
                padding: "7px 14px",
              }}
              onClick={() =>
                setInsumos([
                  ...insumos,
                ])
              }
            >

              <i className="fas fa-rotate"></i>

              {" "}Actualizar

            </button>

          </div>


          <div className="tabla-wrap">

            <table className="t-prod">

              <thead>

                <tr>

                  <th>
                    Insumo
                  </th>

                  <th>
                    Stock actual
                  </th>

                  <th>
                    Stock mínimo
                  </th>

                  <th>
                    Estado
                  </th>

                </tr>

              </thead>


              <tbody>

                {[...insumos]
                  .sort(
                    (a, b) =>
                      a.s / a.m -
                      b.s / b.m
                  )
                  .map(
                    (insumo) => {

                      const porcentajeStock =
                        Math.min(
                          (insumo.s /
                            insumo.m) *
                            100,
                          100
                        );


                      const critico =
                        insumo.s <
                        insumo.m;


                      const porcentajeMedio =
                        porcentajeStock < 50;


                      const color =
                        critico
                          ? porcentajeMedio
                            ? "#b91c1c"
                            : "#d97706"
                          : "#1b6d4a";


                      return (

                        <tr
                          key={insumo.id}
                        >

                          <td>

                            <div className="prod-cell">

                              <div className="prod-ic">

                                <i className="fas fa-flask"></i>

                              </div>

                              {insumo.nombre}

                            </div>

                          </td>


                          <td>

                            <div
                              style={{
                                display: "flex",
                                alignItems:
                                  "center",
                                gap: "10px",
                              }}
                            >

                              <div className="mini-bar">

                                <div
                                  className="mini-fill"
                                  style={{
                                    width:
                                      `${porcentajeStock.toFixed(
                                        0
                                      )}%`,
                                    background:
                                      color,
                                  }}
                                ></div>

                              </div>


                              <strong
                                style={{
                                  color,
                                }}
                              >

                                {insumo.s}{" "}
                                {insumo.u}

                              </strong>

                            </div>

                          </td>


                          <td
                            style={{
                              color: "#8a9690",
                              fontSize: "13px",
                            }}
                          >

                            {insumo.m}{" "}
                            {insumo.u}

                          </td>


                          <td>

                            {critico ? (

                              <span className="badge-alerta">

                                <i className="fas fa-triangle-exclamation"></i>

                                {" "}Bajo mínimo

                              </span>

                            ) : (

                              <span className="badge-ok">

                                <i className="fas fa-circle-check"></i>

                                {" "}OK

                              </span>

                            )}

                          </td>

                        </tr>

                      );

                    }
                  )}

              </tbody>

            </table>

          </div>

        </div>

      </main>


      {/* =====================================================
          MODAL DETALLE
      ===================================================== */}

      {registroDetalle && (

        <div
          className="modal-overlay activo"
          onClick={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {

              setRegistroDetalle(
                null
              );

            }

          }}
        >

          <div className="modal-box">

            <div className="modal-head">

              <h2>

                <i className="fas fa-clipboard-check"></i>

                {" "}Detalle del registro

              </h2>


              <button
                type="button"
                className="modal-cerrar"
                onClick={() =>
                  setRegistroDetalle(
                    null
                  )
                }
              >

                <i className="fas fa-xmark"></i>

              </button>

            </div>


            <div className="modal-body">


              {/* PRODUCTO */}

              <div className="modal-fila">

                <div className="modal-fila-label">
                  Producto
                </div>

                <div
                  className="modal-fila-valor"
                  style={{
                    fontSize: "17px",
                  }}
                >

                  {registroDetalle.productoNombre}

                </div>

              </div>


              {/* UNIDADES + FECHA */}

              <div className="modal-grid">

                <div className="modal-fila">

                  <div className="modal-fila-label">
                    Unidades
                  </div>

                  <div
                    className="modal-fila-valor"
                    style={{
                      fontSize: "20px",
                      color: "#1b6d4a",
                    }}
                  >

                    {registroDetalle.unidades}{" "}
                    und.

                  </div>

                </div>


                <div className="modal-fila">

                  <div className="modal-fila-label">
                    Fecha
                  </div>

                  <div className="modal-fila-valor">

                    {registroDetalle.fecha}

                  </div>

                </div>

              </div>


              {/* OBSERVACIÓN */}

              {registroDetalle.obs && (

                <div className="modal-fila">

                  <div className="modal-fila-label">
                    Observación
                  </div>

                  <div className="modal-obs">

                    {registroDetalle.obs}

                  </div>

                </div>

              )}


              {/* INSUMOS */}

              <div className="modal-insumos-titulo">

                <i className="fas fa-flask"></i>

                {" "}Insumos descontados

              </div>


              {registroDetalle.insumosConsumidos.map(
                (insumo) => (

                  <div
                    className="insumo-fila"
                    key={insumo.id}
                  >

                    <span className="insumo-nombre">

                      <div className="insumo-ic">

                        <i className="fas fa-flask"></i>

                      </div>

                      {insumo.nombre}

                    </span>


                    <span
                      style={{
                        fontSize: "12px",
                        color: "#5b6a62",
                        textAlign: "right",
                      }}
                    >

                      Esperado:{" "}
                      {insumo.esperado}{" "}
                      {insumo.u}

                      <br />


                      {insumo.merma > 0 && (

                        <>
                          <span
                            style={{
                              color: "#d97706",
                            }}
                          >

                            Merma: +
                            {insumo.merma}{" "}
                            {insumo.u}

                          </span>

                          <br />

                        </>

                      )}


                      <strong
                        style={{
                          color: "#b91c1c",
                        }}
                      >

                        Total: −
                        {insumo.total}{" "}
                        {insumo.u}

                      </strong>

                    </span>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          TOAST
      ===================================================== */}

      {toast.visible && (

        <div className="toast visible">

          <i
            className={
              toast.tipo === "error"
                ? "fas fa-triangle-exclamation"
                : "fas fa-circle-check"
            }
          ></i>

          <span>
            {toast.mensaje}
          </span>

        </div>

      )}

    </>
  );
}