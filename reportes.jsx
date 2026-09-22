import { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/admin.css";

export default function Reportes() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [periodo, setPeriodo] = useState("Mensual");

  const productos = [
    {
      id: 1,
      nombre: "Jabón de lavanda",
      unidades: 85,
      costo: 7035,
      precio: 10000,
    },
    {
      id: 2,
      nombre: "Jabón de coco",
      unidades: 72,
      costo: 7190,
      precio: 10000,
    },
    {
      id: 3,
      nombre: "Jabón de oliva",
      unidades: 58,
      costo: 7250,
      precio: 11000,
    },
    {
      id: 4,
      nombre: "Jabón de avena y miel",
      unidades: 94,
      costo: 6580,
      precio: 9500,
    },
  ];

  const formatCOP = (valor) =>
    "$ " +
    Number(valor || 0).toLocaleString("es-CO", {
      maximumFractionDigits: 0,
    });

  const totalUnidades = productos.reduce(
    (total, producto) => total + producto.unidades,
    0
  );

  const ingresos = productos.reduce(
    (total, producto) =>
      total + producto.precio * producto.unidades,
    0
  );

  const costos = productos.reduce(
    (total, producto) =>
      total + producto.costo * producto.unidades,
    0
  );

  const utilidad = ingresos - costos;

  const margen =
    ingresos > 0 ? (utilidad / ingresos) * 100 : 0;

  const generarReporte = (tipo) => {
    Swal.fire({
      icon: "success",
      title: "Reporte generado",
      text: `El reporte de ${tipo.toLowerCase()} se encuentra listo para consultar.`,
      timer: 1800,
      showConfirmButton: false,
    });
  };

  return (
    <div className="admin-panel">

      {/* NAVBAR */}
      <Navbar onToggleMenu={() => setMenuAbierto(!menuAbierto)} />

      {/* SIDEBAR */}
      <Sidebar abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />

      {/* ================= CONTENIDO ================= */}

      <main>

        <div className="header">

          <h1>
            <i className="fas fa-file-chart-column"></i>
            Reportes
          </h1>

          <p>
            Genera y consulta reportes sobre la producción,
            costos y rentabilidad de tus jabones artesanales
          </p>

        </div>

        {/* ================= RESUMEN ================= */}

        <div className="resumen-reportes">

          <div className="tarjeta-reporte">

            <div className="icono-reporte verde">
              <i className="fas fa-boxes-stacked"></i>
            </div>

            <div>
              <span>Unidades producidas</span>
              <strong>{totalUnidades}</strong>
              <small>Productos registrados</small>
            </div>

          </div>

          <div className="tarjeta-reporte">

            <div className="icono-reporte azul">
              <i className="fas fa-money-bill-trend-up"></i>
            </div>

            <div>
              <span>Ingresos</span>
              <strong>{formatCOP(ingresos)}</strong>
              <small>Ventas estimadas</small>
            </div>

          </div>

          <div className="tarjeta-reporte">

            <div className="icono-reporte rojo">
              <i className="fas fa-money-bill-wave"></i>
            </div>

            <div>
              <span>Costos</span>
              <strong>{formatCOP(costos)}</strong>
              <small>Costo de fabricación</small>
            </div>

          </div>

          <div className="tarjeta-reporte">

            <div className="icono-reporte amarillo">
              <i className="fas fa-chart-line"></i>
            </div>

            <div>
              <span>Utilidad</span>
              <strong>{formatCOP(utilidad)}</strong>
              <small>Margen {margen.toFixed(1)}%</small>
            </div>

          </div>

        </div>

        {/* ================= GENERAR REPORTES ================= */}

        <section className="seccion">

          <div className="seccion-head">

            <div>

              <h2>
                <i className="fas fa-folder-open"></i>
                Generar reportes
              </h2>

              <p>
                Selecciona el tipo de información que deseas
                consultar
              </p>

            </div>

            <select
              className="selector-reporte"
              value={periodo}
              onChange={(e) =>
                setPeriodo(e.target.value)
              }
            >

              <option value="Diario">Diario</option>
              <option value="Semanal">Semanal</option>
              <option value="Mensual">Mensual</option>
              <option value="Anual">Anual</option>

            </select>

          </div>

          <div className="tarjetas-reportes">

            <div className="tipo-reporte">

              <div className="tipo-reporte-icono">
                <i className="fas fa-box"></i>
              </div>

              <div className="tipo-reporte-info">

                <h3>Reporte de insumos</h3>

                <p>
                  Consulta existencias, precios, categorías
                  y valor del inventario.
                </p>

              </div>

              <button
                className="btn-reporte"
                onClick={() =>
                  generarReporte("Insumos")
                }
              >
                <i className="fas fa-file-arrow-down"></i>
                Generar
              </button>

            </div>

            <div className="tipo-reporte">

              <div className="tipo-reporte-icono">
                <i className="fas fa-soap"></i>
              </div>

              <div className="tipo-reporte-info">

                <h3>Reporte de productos</h3>

                <p>
                  Consulta los jabones registrados y sus
                  precios de venta.
                </p>

              </div>

              <button
                className="btn-reporte"
                onClick={() =>
                  generarReporte("Productos")
                }
              >
                <i className="fas fa-file-arrow-down"></i>
                Generar
              </button>

            </div>

            <div className="tipo-reporte">

              <div className="tipo-reporte-icono">
                <i className="fas fa-calculator"></i>
              </div>

              <div className="tipo-reporte-info">

                <h3>Reporte de costos</h3>

                <p>
                  Detalla costos directos, indirectos y
                  costo total de fabricación.
                </p>

              </div>

              <button
                className="btn-reporte"
                onClick={() =>
                  generarReporte("Costos")
                }
              >
                <i className="fas fa-file-arrow-down"></i>
                Generar
              </button>

            </div>

            <div className="tipo-reporte">

              <div className="tipo-reporte-icono">
                <i className="fas fa-chart-pie"></i>
              </div>

              <div className="tipo-reporte-info">

                <h3>Reporte de rentabilidad</h3>

                <p>
                  Analiza ganancias, márgenes y productos
                  con mayor rentabilidad.
                </p>

              </div>

              <button
                className="btn-reporte"
                onClick={() =>
                  generarReporte("Rentabilidad")
                }
              >
                <i className="fas fa-file-arrow-down"></i>
                Generar
              </button>

            </div>

          </div>

        </section>

        {/* ================= REPORTE FINANCIERO ================= */}

        <section className="seccion">

          <div className="seccion-head">

            <div>

              <h2>
                <i className="fas fa-chart-column"></i>
                Resumen financiero
              </h2>

              <p>
                Información correspondiente al periodo{" "}
                <strong>{periodo}</strong>
              </p>

            </div>

            <button
              className="btn-primario"
              onClick={() =>
                generarReporte(
                  `Resumen financiero ${periodo}`
                )
              }
            >
              <i className="fas fa-file-pdf"></i>
              Generar reporte
            </button>

          </div>

          <div className="resumen-financiero">

            <div className="dato-financiero">

              <span>Ingresos por ventas</span>

              <strong>
                {formatCOP(ingresos)}
              </strong>

              <small>
                Total estimado
              </small>

            </div>

            <div className="dato-financiero">

              <span>Costo de producción</span>

              <strong>
                {formatCOP(costos)}
              </strong>

              <small>
                Insumos y fabricación
              </small>

            </div>

            <div className="dato-financiero destacado">

              <span>Utilidad estimada</span>

              <strong>
                {formatCOP(utilidad)}
              </strong>

              <small>
                Margen {margen.toFixed(1)}%
              </small>

            </div>

          </div>

        </section>

        {/* ================= PRODUCTOS ================= */}

        <section className="seccion">

          <div className="seccion-head">

            <div>

              <h2>
                <i className="fas fa-ranking-star"></i>
                Resumen por producto
              </h2>

              <p>
                Rendimiento de los jabones registrados
              </p>

            </div>

          </div>

          <div className="tabla-reportes-wrap">

            <table className="tabla-reportes">

              <thead>

                <tr>
                  <th>Producto</th>
                  <th>Unidades</th>
                  <th>Costo unitario</th>
                  <th>Precio venta</th>
                  <th>Ingresos</th>
                  <th>Utilidad</th>
                </tr>

              </thead>

              <tbody>

                {productos.map((producto) => {

                  const ingresosProducto =
                    producto.precio *
                    producto.unidades;

                  const utilidadProducto =
                    (producto.precio -
                      producto.costo) *
                    producto.unidades;

                  return (
                    <tr key={producto.id}>

                      <td>

                        <div className="producto-reporte">

                          <div className="producto-reporte-icono">
                            <i className="fas fa-soap"></i>
                          </div>

                          <strong>
                            {producto.nombre}
                          </strong>

                        </div>

                      </td>

                      <td>
                        <span className="cantidad-reporte">
                          {producto.unidades}
                        </span>
                      </td>

                      <td>
                        {formatCOP(producto.costo)}
                      </td>

                      <td className="precio-reporte">
                        {formatCOP(producto.precio)}
                      </td>

                      <td>
                        {formatCOP(ingresosProducto)}
                      </td>

                      <td className="utilidad-reporte">
                        {formatCOP(utilidadProducto)}
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </section>

        {/* ================= INFORMACIÓN ================= */}

        <div className="info-reporte">

          <i className="fas fa-circle-info"></i>

          <div>

            <strong>Información del reporte</strong>

            <p>
              Los valores mostrados corresponden a datos de
              demostración del sistema CostPro. Cuando el
              sistema esté conectado a la base de datos,
              estos reportes podrán generarse utilizando la
              información real registrada.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}
