import { useState } from "react";
import NavbarEmpleado from "../../components/empleado/NavbarEmpleado";
import SidebarEmpleado from "../../components/empleado/SidebarEmpleado";
import "../../styles/empleado.css";

export default function ReportesEmpleado() {
  const [filtroProducto, setFiltroProducto] = useState("");
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [toastMensaje, setToastMensaje] = useState("");

  // =====================================================
  // DATOS DE PRODUCTOS
  // =====================================================

  const productosCosto = [
    {
      id: 1,
      producto: "Jabón de Lavanda",
      materiaPrima: 3200,
      manoObra: 1100,
      cif: 700,
      precioVenta: 8900,
    },

    {
      id: 2,
      producto: "Jabón de Miel",
      materiaPrima: 3500,
      manoObra: 1200,
      cif: 750,
      precioVenta: 9500,
    },

    {
      id: 3,
      producto: "Jabón de Avena",
      materiaPrima: 3000,
      manoObra: 1050,
      cif: 650,
      precioVenta: 8500,
    },

    {
      id: 4,
      producto: "Jabón de Aloe Vera",
      materiaPrima: 3800,
      manoObra: 1300,
      cif: 800,
      precioVenta: 10500,
    },

    {
      id: 5,
      producto: "Jabón de Café",
      materiaPrima: 3400,
      manoObra: 1150,
      cif: 700,
      precioVenta: 9200,
    },
  ];

  // =====================================================
  // FORMATO DE MONEDA
  // =====================================================

  const formatCOP = (valor) => {
    return "$" + Math.round(valor).toLocaleString("es-CO");
  };

  // =====================================================
  // CÁLCULO DE MÉTRICAS
  // =====================================================

  const calcularMetricas = (producto) => {
    const costoVariable =
      producto.materiaPrima + producto.manoObra;

    const costoTotal =
      costoVariable + producto.cif;

    const margenContribucion =
      producto.precioVenta - costoVariable;

    const alertaPrecio =
      producto.precioVenta <= costoVariable;

    const margenGananciaPct =
      producto.precioVenta > 0
        ? ((producto.precioVenta - costoTotal) /
            producto.precioVenta) *
          100
        : 0;

    return {
      ...producto,
      costoVariable,
      costoTotal,
      margenContribucion,
      alertaPrecio,
      margenGananciaPct,
    };
  };

  // =====================================================
  // PRODUCTOS CALCULADOS
  // =====================================================

  const productosCalculados = productosCosto
    .map(calcularMetricas)
    .filter(
      (producto) =>
        !filtroProducto ||
        producto.producto === filtroProducto
    )
    .sort((a, b) =>
      a.producto.localeCompare(b.producto)
    );

  // =====================================================
  // TOTALES
  // =====================================================

  const totalCosto = productosCalculados.reduce(
    (total, producto) =>
      total + producto.costoTotal,
    0
  );

  const productosConAlerta =
    productosCalculados.filter(
      (producto) => producto.alertaPrecio
    ).length;

  // =====================================================
  // TOAST
  // =====================================================

  const mostrarToast = (mensaje) => {
    setToastMensaje(mensaje);

    setTimeout(() => {
      setToastMensaje("");
    }, 3200);
  };

  // =====================================================
  // DETALLE
  // =====================================================

  const verDetalle = (producto) => {
    setProductoDetalle(producto);
  };

  const cerrarDetalle = () => {
    setProductoDetalle(null);
  };

  // =====================================================
  // LIMPIAR FILTRO
  // =====================================================

  const limpiarFiltro = () => {
    setFiltroProducto("");

    mostrarToast(
      "Mostrando el resumen general de todos los productos."
    );
  };

  // =====================================================
  // EXPORTAR PDF
  // =====================================================

  const exportarPDF = () => {
    mostrarToast(
      "La exportación PDF se conectará cuando integremos la librería."
    );
  };

  // =====================================================
  // EXPORTAR EXCEL
  // =====================================================

  const exportarExcel = () => {
    mostrarToast(
      "La exportación Excel se conectará cuando integremos la librería."
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="empleado-page">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <NavbarEmpleado />

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <SidebarEmpleado />

      {/* =================================================
          CONTENIDO PRINCIPAL
      ================================================= */}

      <main className="main-content">

        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <div className="cabecera-top">

          <div className="cabecera-titulo">

            <h1>
              Reportes — Costos por producto
            </h1>

            <p>
              Costo de materia prima, mano de obra,
              CIF y costo total por producto
            </p>

            <div className="marca-tiempo">

              <i className="fas fa-clock"></i>

              <span>
                Datos actualizados al momento de generar
                el reporte
              </span>

            </div>

          </div>

          {/* BOTONES DE EXPORTACIÓN */}

          <div className="acciones-cabecera">

            <button
              type="button"
              className="btn-pdf"
              onClick={exportarPDF}
            >
              <i className="fa-regular fa-file-pdf"></i>
              Exportar PDF
            </button>

            <button
              type="button"
              className="btn-excel"
              onClick={exportarExcel}
            >
              <i className="fas fa-file-excel"></i>
              Exportar Excel
            </button>

          </div>

        </div>

        {/* =================================================
            TARJETAS DE RESUMEN
        ================================================= */}

        <div className="tarjetas-resumen tarjetas-resumen-3">

          {/* PRODUCTOS */}

          <div className="tarjeta-res tarjeta-azul">

            <div className="tarjeta-icono">

              <i className="fas fa-cube"></i>

            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">
                {productosCalculados.length}
              </div>

              <div className="tarjeta-label">
                Productos en el reporte
              </div>

            </div>

          </div>

          {/* COSTO TOTAL */}

          <div className="tarjeta-res tarjeta-verde">

            <div className="tarjeta-icono">

              <i className="fas fa-sack-dollar"></i>

            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">
                {formatCOP(totalCosto)}
              </div>

              <div className="tarjeta-label">
                Costo total acumulado
              </div>

            </div>

          </div>

          {/* ALERTAS */}

          <div className="tarjeta-res tarjeta-rojo">

            <div className="tarjeta-icono">

              <i className="fas fa-triangle-exclamation"></i>

            </div>

            <div className="tarjeta-info">

              <div className="tarjeta-valor">
                {productosConAlerta}
              </div>

              <div className="tarjeta-label">
                Productos con precio insuficiente
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            PANEL PRINCIPAL
        ================================================= */}

        <section className="panel">

          {/* FILTROS */}

          <div className="filtros-bar">

            <div className="filtro-grupo">

              <label className="filtro-label">
                Producto
              </label>

              <select
                className="filtro-pill"
                value={filtroProducto}
                onChange={(e) =>
                  setFiltroProducto(e.target.value)
                }
              >

                <option value="">
                  Todos los productos (resumen general)
                </option>

                {productosCosto
                  .map(
                    (producto) =>
                      producto.producto
                  )
                  .sort()
                  .map((nombre) => (

                    <option
                      key={nombre}
                      value={nombre}
                    >
                      {nombre}
                    </option>

                  ))}

              </select>

            </div>

            {/* LIMPIAR FILTRO */}

            <button
              type="button"
              className="btn-limpiar"
              title="Ver todos los productos"
              onClick={limpiarFiltro}
            >

              <i className="fas fa-rotate-left"></i>

            </button>

            {/* CONTADOR */}

            <div className="filtro-contador">

              {filtroProducto
                ? "1 producto filtrado"
                : `${productosCalculados.length} productos · resumen general`}

            </div>

          </div>

          {/* =================================================
              TABLA
          ================================================= */}

          <div className="tabla-wrap">

            <table className="tabla-reporte">

              <thead>

                <tr>

                  <th>
                    Producto
                  </th>

                  <th>
                    Costo materia prima
                  </th>

                  <th>
                    Mano de obra
                  </th>

                  <th>
                    CIF
                  </th>

                  <th>
                    Costo total
                  </th>

                  <th>
                    Precio de venta
                  </th>

                  <th></th>

                </tr>

              </thead>

              <tbody>

                {productosCalculados.map(
                  (producto) => (

                    <tr key={producto.id}>

                      {/* PRODUCTO */}

                      <td>

                        <div className="producto-cell">

                          <div className="producto-icono">

                            <i className="fas fa-cube"></i>

                          </div>

                          <span>
                            {producto.producto}
                          </span>

                        </div>

                      </td>

                      {/* MATERIA PRIMA */}

                      <td className="celda-num">

                        {formatCOP(
                          producto.materiaPrima
                        )}

                      </td>

                      {/* MANO DE OBRA */}

                      <td className="celda-num">

                        {formatCOP(
                          producto.manoObra
                        )}

                      </td>

                      {/* CIF */}

                      <td className="celda-num">

                        {formatCOP(
                          producto.cif
                        )}

                      </td>

                      {/* COSTO TOTAL */}

                      <td className="celda-total">

                        {formatCOP(
                          producto.costoTotal
                        )}

                      </td>

                      {/* PRECIO VENTA */}

                      <td className="celda-num">

                        {formatCOP(
                          producto.precioVenta
                        )}

                      </td>

                      {/* DETALLE */}

                      <td>

                        <button
                          type="button"
                          className="btn-icon"
                          title="Ver desglose"
                          onClick={() =>
                            verDetalle(producto)
                          }
                        >

                          <i className="fas fa-eye"></i>

                        </button>

                      </td>

                    </tr>

                  )
                )}

                {/* =================================================
                    FILA DE TOTALES
                ================================================= */}

                {productosCalculados.length > 1 && (

                  <tr className="fila-totales">

                    <td>

                      <div className="producto-cell">

                        <i className="fas fa-calculator"></i>

                        <span>
                          Total / Resumen general
                        </span>

                      </div>

                    </td>

                    <td className="celda-num">

                      {formatCOP(
                        productosCalculados.reduce(
                          (total, producto) =>
                            total +
                            producto.materiaPrima,
                          0
                        )
                      )}

                    </td>

                    <td className="celda-num">

                      {formatCOP(
                        productosCalculados.reduce(
                          (total, producto) =>
                            total +
                            producto.manoObra,
                          0
                        )
                      )}

                    </td>

                    <td className="celda-num">

                      {formatCOP(
                        productosCalculados.reduce(
                          (total, producto) =>
                            total +
                            producto.cif,
                          0
                        )
                      )}

                    </td>

                    <td className="celda-total">

                      {formatCOP(totalCosto)}

                    </td>

                    <td className="celda-num">
                      —
                    </td>

                    <td></td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* =================================================
              ESTADO VACÍO
          ================================================= */}

          {productosCalculados.length === 0 && (

            <div className="vacio-estado">

              <i className="fas fa-box-open"></i>

              <p>
                No se encontraron datos de costos
                para este producto.
              </p>

            </div>

          )}

        </section>

      </main>

      {/* =====================================================
          MODAL DE DETALLE
      ===================================================== */}

      {productoDetalle && (

        <div
          className="modal-overlay activo"
          onClick={(e) => {

            if (
              e.target === e.currentTarget
            ) {
              cerrarDetalle();
            }

          }}
        >

          <div className="modal-box">

            {/* CABECERA MODAL */}

            <div className="modal-head">

              <h2>

                <i className="fas fa-chart-pie"></i>{" "}

                {productoDetalle.producto}

              </h2>

              <button
                type="button"
                className="modal-cerrar"
                onClick={cerrarDetalle}
              >

                <i className="fas fa-xmark"></i>

              </button>

            </div>

            {/* CUERPO */}

            <div className="modal-body">

              {/* MÉTRICAS */}

              <div className="detalle-grid">

                <div className="detalle-campo">

                  <span className="detalle-label">
                    Costo total por unidad
                  </span>

                  <span className="detalle-valor">

                    {formatCOP(
                      productoDetalle.costoTotal
                    )}

                  </span>

                </div>

                <div className="detalle-campo">

                  <span className="detalle-label">
                    Precio de venta
                  </span>

                  <span className="detalle-valor">

                    {formatCOP(
                      productoDetalle.precioVenta
                    )}

                  </span>

                </div>

                <div className="detalle-campo">

                  <span className="detalle-label">
                    Margen de contribución / unidad
                  </span>

                  <span className="detalle-valor">

                    {formatCOP(
                      productoDetalle.margenContribucion
                    )}

                  </span>

                </div>

                <div className="detalle-campo">

                  <span className="detalle-label">
                    Margen de ganancia sobre costo
                  </span>

                  <span className="detalle-valor">

                    {productoDetalle.margenGananciaPct.toFixed(
                      1
                    )}

                    %

                  </span>

                </div>

              </div>

              {/* =================================================
                  COMPOSICIÓN DEL COSTO
              ================================================= */}

              <p className="detalle-seccion-titulo">

                Composición del costo por unidad

              </p>

              <div className="barra-grupo">

                {/* MATERIA PRIMA */}

                <div className="barra-fila">

                  <span className="barra-nombre">
                    Materia prima
                  </span>

                  <div className="barra-track">

                    <div
                      className="barra-fill barra-materia"
                      style={{
                        width: `${
                          (productoDetalle.materiaPrima /
                            productoDetalle.costoTotal) *
                          100
                        }%`,
                      }}
                    ></div>

                  </div>

                  <span className="barra-valor">

                    {formatCOP(
                      productoDetalle.materiaPrima
                    )}

                  </span>

                </div>

                {/* MANO DE OBRA */}

                <div className="barra-fila">

                  <span className="barra-nombre">
                    Mano de obra
                  </span>

                  <div className="barra-track">

                    <div
                      className="barra-fill barra-obra"
                      style={{
                        width: `${
                          (productoDetalle.manoObra /
                            productoDetalle.costoTotal) *
                          100
                        }%`,
                      }}
                    ></div>

                  </div>

                  <span className="barra-valor">

                    {formatCOP(
                      productoDetalle.manoObra
                    )}

                  </span>

                </div>

                {/* CIF */}

                <div className="barra-fila">

                  <span className="barra-nombre">
                    CIF
                  </span>

                  <div className="barra-track">

                    <div
                      className="barra-fill barra-cif"
                      style={{
                        width: `${
                          (productoDetalle.cif /
                            productoDetalle.costoTotal) *
                          100
                        }%`,
                      }}
                    ></div>

                  </div>

                  <span className="barra-valor">

                    {formatCOP(
                      productoDetalle.cif
                    )}

                  </span>

                </div>

              </div>

              {/* =================================================
                  ALERTA
              ================================================= */}

              {productoDetalle.alertaPrecio && (

                <div className="detalle-alerta">

                  <i className="fas fa-triangle-exclamation"></i>

                  <span>

                    El precio de venta no cubre el costo
                    variable por unidad. Reporta esta
                    situación al administrador.

                  </span>

                </div>

              )}

              {/* =================================================
                  NOTA
              ================================================= */}

              <div className="detalle-nota">

                <i className="fas fa-shield-halved"></i>

                <span>

                  Estos valores se recalculan
                  automáticamente cuando cambian los
                  costos o el precio de venta registrados
                  en el sistema.

                </span>

              </div>

            </div>

            {/* PIE DEL MODAL */}

            <div className="modal-footer">

              <button
                type="button"
                className="btn-secundario"
                onClick={cerrarDetalle}
              >
                Cerrar
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toastMensaje && (

        <div className="toast visible">

          <i className="fas fa-circle-check"></i>

          <span>
            {toastMensaje}
          </span>

        </div>

      )}

    </div>
  );
}