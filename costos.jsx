import { useState } from "react";
import NavbarEmpleado from "../../components/empleado/NavbarEmpleado";
import SidebarEmpleado from "../../components/empleado/SidebarEmpleado";
import "../../styles/empleado.css";

export default function CostosEmpleado() {

  // =====================================================
  // DATOS DE PRODUCTOS
  // =====================================================

  const [productos] = useState([
    {
      id: 1,
      nombre: "Jabón Artesanal de Lavanda",
      unidad: "barra",
      manoObra: 2500,

      insumos: [
        {
          nombre: "Aceite de Oliva",
          cantidad: 0.08,
          costoUnitario: 18000,
        },
        {
          nombre: "Aceite de Coco",
          cantidad: 0.04,
          costoUnitario: 22000,
        },
        {
          nombre: "Esencia de Lavanda",
          cantidad: 0.005,
          costoUnitario: 25000,
        },
      ],
    },

    {
      id: 2,
      nombre: "Jabón Artesanal de Miel",
      unidad: "barra",
      manoObra: 2500,

      insumos: [
        {
          nombre: "Aceite de Oliva",
          cantidad: 0.08,
          costoUnitario: 18000,
        },
        {
          nombre: "Manteca de Karité",
          cantidad: 0.03,
          costoUnitario: 28000,
        },
        {
          nombre: "Miel",
          cantidad: 0.015,
          costoUnitario: 18000,
        },
      ],
    },

    {
      id: 3,
      nombre: "Jabón Artesanal de Avena",
      unidad: "barra",
      manoObra: 2300,

      insumos: [
        {
          nombre: "Aceite de Coco",
          cantidad: 0.05,
          costoUnitario: 22000,
        },
        {
          nombre: "Aceite de Oliva",
          cantidad: 0.07,
          costoUnitario: 18000,
        },
        {
          nombre: "Avena en Polvo",
          cantidad: 0.015,
          costoUnitario: 15000,
        },
      ],
    },
  ]);


  // =====================================================
  // PRODUCCIÓN MENSUAL ESTIMADA
  // =====================================================

  const unidadesMensuales = {
    1: 40,
    2: 35,
    3: 50,
  };


  // =====================================================
  // COSTOS INDIRECTOS DE FABRICACIÓN
  // =====================================================

  const cifItems = [
    {
      id: 1,
      concepto: "Arriendo del taller",
      categoria: "Infraestructura",
      valor: 1800000,
    },

    {
      id: 2,
      concepto: "Energía eléctrica",
      categoria: "Servicios públicos",
      valor: 350000,
    },

    {
      id: 3,
      concepto: "Agua y alcantarillado",
      categoria: "Servicios públicos",
      valor: 120000,
    },

    {
      id: 4,
      concepto: "Mantenimiento de equipos",
      categoria: "Mantenimiento",
      valor: 250000,
    },

    {
      id: 5,
      concepto: "Seguro del taller",
      categoria: "Seguros",
      valor: 180000,
    },
  ];


  // =====================================================
  // ESTADOS
  // =====================================================

  const [busqueda, setBusqueda] = useState("");

  const [insumosAbiertos, setInsumosAbiertos] =
    useState({});


  // =====================================================
  // CÁLCULOS
  // =====================================================

  const totalCIF = () => {

    return cifItems.reduce(
      (total, item) =>
        total + item.valor,
      0
    );

  };


  const totalUnidadesMensuales = () => {

    return Object.values(
      unidadesMensuales
    ).reduce(
      (total, cantidad) =>
        total + cantidad,
      0
    );

  };


  const cifPorUnidad = (productoId) => {

    const total = totalCIF();

    const totalUnidades =
      totalUnidadesMensuales();


    if (!totalUnidades) {
      return 0;
    }


    const unidadesProducto =
      unidadesMensuales[productoId] || 0;


    const proporcion =
      unidadesProducto /
      totalUnidades;


    return (
      (total * proporcion) /
      (unidadesProducto || 1)
    );

  };


  const costoMateriaPrima = (producto) => {

    return producto.insumos.reduce(
      (total, insumo) =>
        total +
        insumo.cantidad *
          insumo.costoUnitario,
      0
    );

  };


  const costoTotal = (producto) => {

    return (
      costoMateriaPrima(producto) +
      producto.manoObra +
      cifPorUnidad(producto.id)
    );

  };


  // =====================================================
  // UTILIDADES
  // =====================================================

  const formatCOP = (numero) => {

    return (
      "$ " +
      Math.round(numero).toLocaleString(
        "es-CO"
      )
    );

  };


  const porcentaje = (parte, total) => {

    return total
      ? Math.round(
          (parte / total) * 100
        )
      : 0;

  };


  const categoriaIconos = {

    Infraestructura:
      "fa-building",

    "Servicios públicos":
      "fa-bolt",

    Mantenimiento:
      "fa-wrench",

    Seguros:
      "fa-shield-halved",

    Administrativo:
      "fa-briefcase",

    Otro:
      "fa-tag",

  };


  // =====================================================
  // PRODUCTOS FILTRADOS
  // =====================================================

  const productosFiltrados =
    productos.filter((producto) =>
      producto.nombre
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
    );


  // =====================================================
  // MOSTRAR / OCULTAR INSUMOS
  // =====================================================

  const toggleInsumos = (productoId) => {

    setInsumosAbiertos(
      (anteriores) => ({
        ...anteriores,
        [productoId]:
          !anteriores[productoId],
      })
    );

  };


  // =====================================================
  // RESUMEN
  // =====================================================

  const totalCif = totalCIF();

  const promedioCosto =
    productos.length
      ? productos.reduce(
          (total, producto) =>
            total +
            costoTotal(producto),
          0
        ) / productos.length
      : 0;


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>

      {/* NAVBAR */}

      <NavbarEmpleado />


      {/* SIDEBAR / MENU */}

      <SidebarEmpleado />


      <main>

        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <div className="header">

          <h1>

            <i className="fas fa-dollar-sign"></i>

            {" "}Costos de producción

          </h1>

          <p>
            Visualiza el desglose de costos por
            producto: materia prima, mano de obra
            y CIF
          </p>

        </div>


        {/* =================================================
            TARJETAS RESUMEN
        ================================================= */}

        <div className="tarjetas-resumen">


          {/* PRODUCTOS */}

          <div className="tarjeta-res tarjeta-verde">

            <div className="tarjeta-icono">

              <i className="fas fa-cube"></i>

            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">
                {productos.length}
              </div>

              <div className="tarjeta-label">
                Productos activos
              </div>

            </div>

          </div>


          {/* CIF */}

          <div className="tarjeta-res tarjeta-amarillo">

            <div className="tarjeta-icono">

              <i className="fas fa-building"></i>

            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">
                {formatCOP(totalCif)}
              </div>

              <div className="tarjeta-label">
                CIF mensual total
              </div>

            </div>

          </div>


          {/* UNIDADES */}

          <div className="tarjeta-res tarjeta-azul">

            <div className="tarjeta-icono">

              <i className="fas fa-boxes-stacked"></i>

            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">

                {totalUnidadesMensuales()} u.

              </div>

              <div className="tarjeta-label">
                Unidades/mes estimadas
              </div>

            </div>

          </div>


          {/* COSTO PROMEDIO */}

          <div className="tarjeta-res tarjeta-rojo">

            <div className="tarjeta-icono">

              <i className="fas fa-calculator"></i>

            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">
                {formatCOP(promedioCosto)}
              </div>

              <div className="tarjeta-label">
                Costo promedio/unidad
              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            DESGLOSE POR PRODUCTO
        ================================================= */}

        <section className="seccion">

          <div className="seccion-head">

            <div>

              <h2>

                <i className="fas fa-chart-pie"></i>

                {" "}Desglose de costos por producto

              </h2>

              <p>
                Participación de cada componente en
                el costo total por unidad
              </p>

            </div>


            {/* BUSCADOR */}

            <div className="filtro-wrap">

              <i className="fas fa-search filtro-icono"></i>

              <input
                type="text"
                className="filtro-input"
                placeholder="Buscar producto…"
                value={busqueda}
                onChange={(e) =>
                  setBusqueda(
                    e.target.value
                  )
                }
              />

            </div>

          </div>


          {/* LISTADO */}

          <div id="listaDesglose">

            {productosFiltrados.map(
              (producto) => {

                const mp =
                  costoMateriaPrima(
                    producto
                  );

                const mo =
                  producto.manoObra;

                const cif =
                  cifPorUnidad(
                    producto.id
                  );

                const total =
                  mp + mo + cif;


                const pctMp =
                  porcentaje(
                    mp,
                    total
                  );

                const pctMo =
                  porcentaje(
                    mo,
                    total
                  );

                const pctCif =
                  porcentaje(
                    cif,
                    total
                  );


                const abierto =
                  insumosAbiertos[
                    producto.id
                  ];


                return (

                  <div
                    className="desglose-card"
                    key={producto.id}
                  >

                    {/* CABECERA */}

                    <div className="desglose-header">

                      <div className="desglose-prod-info">

                        <div className="avatar-prod">

                          <i className="fas fa-cube"></i>

                        </div>


                        <div>

                          <div className="desglose-prod-nombre">

                            {producto.nombre}

                          </div>


                          <div className="desglose-prod-unidad">

                            por {producto.unidad}

                          </div>

                        </div>

                      </div>


                      <div className="desglose-total-wrap">

                        <div className="desglose-total-label">

                          Costo total / unidad

                        </div>


                        <div className="desglose-total-valor">

                          {formatCOP(total)}

                        </div>

                      </div>

                    </div>


                    {/* BARRA APILADA */}

                    <div className="barra-apilada-wrap">

                      <div className="barra-apilada">

                        <div
                          className="barra-seg seg-mp"
                          style={{
                            width:
                              `${pctMp}%`,
                          }}
                        ></div>


                        <div
                          className="barra-seg seg-mo"
                          style={{
                            width:
                              `${pctMo}%`,
                          }}
                        ></div>


                        <div
                          className="barra-seg seg-cif"
                          style={{
                            width:
                              `${pctCif}%`,
                          }}
                        ></div>

                      </div>

                    </div>


                    {/* COMPONENTES */}

                    <div className="componentes-fila">


                      {/* MATERIA PRIMA */}

                      <div className="componente comp-mp">

                        <div className="comp-dot dot-mp"></div>

                        <div className="comp-detalle">

                          <div className="comp-label">
                            Materia prima
                          </div>

                          <div className="comp-valor">
                            {formatCOP(mp)}
                          </div>

                          <div className="comp-pct">
                            {pctMp}%
                          </div>

                        </div>

                      </div>


                      {/* MANO DE OBRA */}

                      <div className="componente comp-mo">

                        <div className="comp-dot dot-mo"></div>

                        <div className="comp-detalle">

                          <div className="comp-label">
                            Mano de obra
                          </div>

                          <div className="comp-valor">
                            {formatCOP(mo)}
                          </div>

                          <div className="comp-pct">
                            {pctMo}%
                          </div>

                        </div>

                      </div>


                      {/* CIF */}

                      <div className="componente comp-cif">

                        <div className="comp-dot dot-cif"></div>

                        <div className="comp-detalle">

                          <div className="comp-label">
                            CIF / unidad
                          </div>

                          <div className="comp-valor">
                            {formatCOP(cif)}
                          </div>

                          <div className="comp-pct">
                            {pctCif}%
                          </div>

                        </div>

                      </div>

                    </div>


                    {/* VER INSUMOS */}

                    <button
                      type="button"
                      className="insumos-toggle"
                      onClick={() =>
                        toggleInsumos(
                          producto.id
                        )
                      }
                    >

                      <i
                        className="fas fa-chevron-down toggle-ico"
                        style={{
                          transform:
                            abierto
                              ? "rotate(180deg)"
                              : "",
                        }}
                      ></i>

                      {" "}

                      Ver insumos (
                      {producto.insumos.length}
                      )

                    </button>


                    {/* DETALLE INSUMOS */}

                    <div
                      className="insumos-detalle"
                      style={{
                        display:
                          abierto
                            ? "block"
                            : "none",
                      }}
                    >

                      {producto.insumos.map(
                        (insumo, index) => (

                          <div
                            className="ins-fila"
                            key={index}
                          >

                            <span className="ins-nombre">

                              <i className="fas fa-box ins-ico"></i>

                              {insumo.nombre}

                            </span>


                            <span className="ins-cant">

                              {insumo.cantidad} u.

                            </span>


                            <span className="ins-precio">

                              {formatCOP(
                                insumo.costoUnitario
                              )}{" "}
                              / u.

                            </span>


                            <span className="ins-subtotal">

                              {formatCOP(
                                insumo.cantidad *
                                  insumo.costoUnitario
                              )}

                            </span>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                );

              }
            )}

          </div>


          {/* ESTADO VACÍO */}

          {productosFiltrados.length ===
            0 && (

            <div
              className="vacio-estado"
              style={{
                display: "flex",
              }}
            >

              <i className="fas fa-box-open"></i>

              <p>
                No se encontraron productos.
              </p>

            </div>

          )}

        </section>


        {/* =================================================
            CIF
        ================================================= */}

        <section className="seccion">

          <div className="seccion-head">

            <div>

              <h2>

                <i className="fas fa-building"></i>

                {" "}Costos Indirectos de Fabricación
                (CIF)

              </h2>

              <p>
                Gastos indirectos mensuales
                registrados por el administrador
              </p>

            </div>

          </div>


          {/* TABLA CIF */}

          <div className="tabla-wrap">

            <table className="tabla-cif">

              <thead>

                <tr>

                  <th>
                    Concepto
                  </th>

                  <th>
                    Categoría
                  </th>

                  <th>
                    Valor mensual
                  </th>

                </tr>

              </thead>


              <tbody>

                {cifItems.map(
                  (item) => {

                    const icono =
                      categoriaIconos[
                        item.categoria
                      ] ||
                      "fa-tag";


                    return (

                      <tr
                        key={item.id}
                      >

                        <td>

                          <div className="cif-concepto">

                            <div className="avatar-cif">

                              <i
                                className={`fas ${icono}`}
                              ></i>

                            </div>

                            {item.concepto}

                          </div>

                        </td>


                        <td>

                          <span className="badge-categoria">

                            {item.categoria}

                          </span>

                        </td>


                        <td className="celda-valor">

                          {formatCOP(
                            item.valor
                          )}

                        </td>

                      </tr>

                    );

                  }
                )}

              </tbody>

            </table>

          </div>


          {/* TOTAL CIF */}

          <div className="cif-total-wrap">

            <div className="cif-total-label">

              <i className="fas fa-sigma"></i>

              {" "}Total CIF mensual

            </div>


            <div className="cif-total-valor">

              {formatCOP(totalCif)}

            </div>

          </div>

        </section>

      </main>

    </>
  );
}