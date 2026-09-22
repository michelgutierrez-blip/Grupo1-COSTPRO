import { useState } from "react";
import NavbarEmpleado from "../../components/empleado/NavbarEmpleado";
import SidebarEmpleado from "../../components/empleado/SidebarEmpleado";
import "../../styles/empleado.css";

export default function ProductosEmpleado() {
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // =====================================================
  // PRODUCTOS
  // =====================================================

  const productos = [
    {
      id: 1,
      nombre: "Jabón de Lavanda",
      descripcion:
        "Jabón artesanal elaborado con esencia natural de lavanda.",
      unidad: "unidad",
      manoObra: 2500,
      insumos: [
        {
          nombre: "Base de jabón",
          cantidad: 0.1,
          unidad: "kg",
        },
        {
          nombre: "Aceite de Lavanda",
          cantidad: 0.01,
          unidad: "lt",
        },
        {
          nombre: "Frasco de Vidrio",
          cantidad: 1,
          unidad: "unidad",
        },
      ],
    },

    {
      id: 2,
      nombre: "Jabón de Miel",
      descripcion:
        "Jabón artesanal con miel y componentes naturales.",
      unidad: "unidad",
      manoObra: 2800,
      insumos: [
        {
          nombre: "Base de jabón",
          cantidad: 0.1,
          unidad: "kg",
        },
        {
          nombre: "Miel natural",
          cantidad: 0.02,
          unidad: "kg",
        },
        {
          nombre: "Frasco de Vidrio",
          cantidad: 1,
          unidad: "unidad",
        },
      ],
    },

    {
      id: 3,
      nombre: "Jabón de Avena",
      descripcion:
        "Jabón artesanal de avena para una limpieza suave.",
      unidad: "unidad",
      manoObra: 2600,
      insumos: [
        {
          nombre: "Base de jabón",
          cantidad: 0.1,
          unidad: "kg",
        },
        {
          nombre: "Avena",
          cantidad: 0.02,
          unidad: "kg",
        },
        {
          nombre: "Aceite esencial",
          cantidad: 0.005,
          unidad: "lt",
        },
      ],
    },

    {
      id: 4,
      nombre: "Jabón de Aloe Vera",
      descripcion:
        "Jabón artesanal elaborado con gel de aloe vera.",
      unidad: "unidad",
      manoObra: 3000,
      insumos: [
        {
          nombre: "Base de jabón",
          cantidad: 0.1,
          unidad: "kg",
        },
        {
          nombre: "Aloe Vera",
          cantidad: 0.03,
          unidad: "kg",
        },
        {
          nombre: "Frasco de Vidrio",
          cantidad: 1,
          unidad: "unidad",
        },
      ],
    },
  ];

  // =====================================================
  // FORMATO DE MONEDA
  // =====================================================

  const formatCOP = (numero) => {
    return (
      "$ " +
      Number(numero).toLocaleString("es-CO", {
        minimumFractionDigits: 0,
      })
    );
  };

  // =====================================================
  // ICONOS DE UNIDAD
  // =====================================================

  const iconoUnidad = (unidad) => {
    const iconos = {
      unidad: "fa-cube",
      kg: "fa-weight-hanging",
      g: "fa-weight-hanging",
      litro: "fa-flask",
      lt: "fa-flask",
      ml: "fa-flask",
      metro: "fa-ruler",
      caja: "fa-box",
      docena: "fa-layer-group",
    };

    return iconos[unidad] || "fa-tag";
  };

  // =====================================================
  // FILTRO DE PRODUCTOS
  // =====================================================

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  // =====================================================
  // VER DETALLE
  // =====================================================

  const verDetalle = (producto) => {
    setProductoSeleccionado(producto);
  };

  // =====================================================
  // CERRAR DETALLE
  // =====================================================

  const cerrarDetalle = () => {
    setProductoSeleccionado(null);
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

        {/* ENCABEZADO */}

        <div className="header">

          <h1>
            <i className="fas fa-cube"></i>{" "}
            Productos
          </h1>

          <p>
            Consulta los productos registrados, sus insumos
            y el costo de mano de obra
          </p>

        </div>

        {/* =================================================
            PRODUCTOS REGISTRADOS
        ================================================= */}

        <section className="seccion">

          <div className="seccion-head">

            <div>

              <h2>
                <i className="fas fa-list"></i>{" "}
                Productos registrados
              </h2>

              <p>
                Visualiza el catálogo de productos del sistema
              </p>

            </div>

          </div>

          {/* =================================================
              BUSCADOR
          ================================================= */}

          <div className="buscador-wrap">

            <i className="fas fa-search buscador-icono"></i>

            <input
              type="text"
              className="buscador-input"
              placeholder="Buscar producto por nombre..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setProductoSeleccionado(null);
              }}
            />

          </div>

          {/* =================================================
              TABLA
          ================================================= */}

          <div className="tabla-wrap">

            <table className="tabla-productos">

              <thead>

                <tr>
                  <th>Producto</th>
                  <th>Unidad</th>
                  <th>Insumos</th>
                  <th>Mano de obra / u.</th>
                  <th>Costo total estimado</th>
                </tr>

              </thead>

              <tbody>

                {productosFiltrados.map((producto) => (

                  <tr
                    key={producto.id}
                    style={{ cursor: "pointer" }}
                    title="Ver insumos del producto"
                    onClick={() => verDetalle(producto)}
                  >

                    {/* PRODUCTO */}

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

                    {/* UNIDAD */}

                    <td>

                      <span className="badge-unidad">

                        <i
                          className={`fas ${iconoUnidad(
                            producto.unidad
                          )}`}
                        ></i>{" "}

                        {producto.unidad}

                      </span>

                    </td>

                    {/* INSUMOS */}

                    <td>

                      {producto.insumos.length > 0 ? (

                        <span className="badge-insumos">

                          {producto.insumos.length}{" "}

                          {producto.insumos.length > 1
                            ? "insumos"
                            : "insumo"}

                        </span>

                      ) : (

                        <span className="badge-sin-insumos">
                          Sin insumos
                        </span>

                      )}

                    </td>

                    {/* MANO DE OBRA */}

                    <td className="celda-mano">

                      {formatCOP(producto.manoObra)}

                    </td>

                    {/* COSTO TOTAL */}

                    <td className="celda-costo">

                      {formatCOP(producto.manoObra)}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* =================================================
              SIN RESULTADOS
          ================================================= */}

          {productosFiltrados.length === 0 && (

            <div className="tabla-vacia">

              <i className="fas fa-box-open"></i>

              <p>
                No se encontraron productos.
              </p>

            </div>

          )}

        </section>

        {/* =================================================
            DETALLE DE INSUMOS
        ================================================= */}

        {productoSeleccionado && (

          <section
            className="seccion"
            id="seccionDetalle"
          >

            <div className="seccion-head">

              <div>

                <h2>

                  <i className="fas fa-boxes-stacked"></i>{" "}

                  Insumos —{" "}
                  {productoSeleccionado.nombre}

                </h2>

                <p>
                  {productoSeleccionado.descripcion}
                </p>

              </div>

              <button
                type="button"
                className="btn-secundario"
                onClick={cerrarDetalle}
              >

                <i className="fas fa-xmark"></i>{" "}
                Cerrar

              </button>

            </div>

            {/* TABLA DE INSUMOS */}

            <div className="tabla-wrap">

              <table className="tabla-productos">

                <thead>

                  <tr>
                    <th>Insumo</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                  </tr>

                </thead>

                <tbody>

                  {productoSeleccionado.insumos.map(
                    (insumo, index) => (

                      <tr key={index}>

                        <td>

                          <div className="ins-nombre-cell">

                            <div className="avatar-ins">

                              <i className="fas fa-box"></i>

                            </div>

                            {insumo.nombre}

                          </div>

                        </td>

                        <td className="celda-cantidad">

                          {insumo.cantidad.toLocaleString(
                            "es-CO"
                          )}

                        </td>

                        <td>

                          <span className="badge-unidad">

                            {insumo.unidad}

                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* SIN INSUMOS */}

            {productoSeleccionado.insumos.length === 0 && (

              <div className="tabla-vacia">

                <i className="fas fa-cubes"></i>

                <p>
                  Este producto no tiene insumos registrados.
                </p>

              </div>

            )}

          </section>

        )}

      </main>

    </div>
  );
}