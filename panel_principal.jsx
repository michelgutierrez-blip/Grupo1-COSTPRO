import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../styles/admin.css";


export default function PanelPrincipal() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const productos = [
    {
      nombre: "Jabón de Karité",
      mp: 3200,
      mo: 1100,
      cif: 700,
      pv: 8900,
      cf: 1800000,
    },
    {
      nombre: "Jabón de Lavanda",
      mp: 2800,
      mo: 1000,
      cif: 600,
      pv: 7500,
      cf: 1200000,
    },
    {
      nombre: "Jabón de Aloe Vera",
      mp: 3000,
      mo: 1000,
      cif: 650,
      pv: 8200,
      cf: 1500000,
    },
    {
      nombre: "Jabón de Avena y Miel",
      mp: 2600,
      mo: 950,
      cif: 550,
      pv: 7400,
      cf: 1100000,
    },
    {
      nombre: "Jabón de Carbón Activado",
      mp: 3500,
      mo: 1200,
      cif: 750,
      pv: 9900,
      cf: 1600000,
    },
    {
      nombre: "Jabón de Rosa Mosqueta",
      mp: 3900,
      mo: 1300,
      cif: 800,
      pv: 10500,
      cf: 1400000,
    },
    {
      nombre: "Jabón Exfoliante de Café",
      mp: 3100,
      mo: 1100,
      cif: 700,
      pv: 8800,
      cf: 1300000,
    },
  ];

  const insumos = [
    {
      nombre: "Aceite de Oliva",
      unidad: "lt",
      stock: 12,
      minimo: 20,
    },
    {
      nombre: "Aceite de Coco",
      unidad: "lt",
      stock: 8,
      minimo: 15,
    },
    {
      nombre: "Manteca de Karité",
      unidad: "kg",
      stock: 4,
      minimo: 10,
    },
    {
      nombre: "Sosa Cáustica",
      unidad: "kg",
      stock: 3,
      minimo: 8,
    },
    {
      nombre: "Aceite Esencial de Lavanda",
      unidad: "lt",
      stock: 2,
      minimo: 5,
    },
    {
      nombre: "Colorantes Naturales",
      unidad: "und",
      stock: 18,
      minimo: 15,
    },
    {
      nombre: "Moldes de Silicona",
      unidad: "und",
      stock: 24,
      minimo: 30,
    },
    {
      nombre: "Envolturas de Papel",
      unidad: "und",
      stock: 120,
      minimo: 200,
    },
  ];

  const actividad = [
    {
      iniciales: "AD",
      clase: "av-azul",
      texto: "Administrador actualizó el costo del Jabón de Karité",
      modulo: "Costos",
      tiempo: "Hace 12 min",
    },
    {
      iniciales: "MR",
      clase: "av-rosa",
      texto: "María R. registró una nueva partida de sosa cáustica",
      modulo: "Insumos",
      tiempo: "Hace 38 min",
    },
    {
      iniciales: "JP",
      clase: "av-verde",
      texto: "Juan P. exportó un reporte de costos de producción",
      modulo: "Reportes",
      tiempo: "Hace 1 h",
    },
    {
      iniciales: "AD",
      clase: "av-azul",
      texto: "Administrador creó el producto Jabón de Carbón Activado",
      modulo: "Productos",
      tiempo: "Hace 2 h",
    },
    {
      iniciales: "LC",
      clase: "av-morado",
      texto: "Laura C. configuró los umbrales de stock de aceites",
      modulo: "Insumos",
      tiempo: "Ayer 4:30 pm",
    },
  ];

  const [fecha, setFecha] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFecha(new Date());
    }, 30000);

    return () => clearInterval(intervalo);
  }, []);

  const calcularProducto = (producto) => {
    const costo = producto.mp + producto.mo + producto.cif;
    const margen = producto.pv - costo;

    return {
      ...producto,
      costo,
      margen,
      porcentaje: producto.pv > 0 ? (margen / producto.pv) * 100 : 0,
    };
  };

  const productosCalculados = productos.map(calcularProducto);

  const costoTotal = productosCalculados.reduce(
    (total, producto) => total + producto.costo,
    0
  );

  const ingresos = productosCalculados.reduce(
    (total, producto) => total + producto.pv,
    0
  );

  const ganancia = ingresos - costoTotal;

  const alertas = insumos.filter((insumo) => insumo.stock < insumo.minimo);

  const formatearDinero = (valor) => {
    return "$" + Math.round(valor).toLocaleString("es-CO");
  };

  const formatearFecha = () => {
    const dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    return (
      <>
        <strong>{dias[fecha.getDay()]}</strong>
        <br />
        {fecha.getDate()} de {meses[fecha.getMonth()]} de {fecha.getFullYear()}
        <br />
        {fecha.toLocaleTimeString("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </>
    );
  };

  return (
    <div className="admin-panel">

      {/* NAVBAR (componente) */}
      <Navbar onToggleMenu={() => setMenuAbierto(!menuAbierto)} />

      {/* SIDEBAR (componente) */}
      <Sidebar abierto={menuAbierto} />

      {/* CONTENIDO */}
      <main className="dashboard">

        {/* BIENVENIDA */}
        <section className="bienvenida">
          <div className="bienvenida-texto">
            <h1>¡Bienvenido, Administrador! 👋</h1>

            <p>
              Aquí tienes el resumen financiero de tu taller de jabones
              artesanales, actualizado en tiempo real.
            </p>

            <div className="badge-live">
              <span className="dot"></span>
              Dashboard activo
            </div>
          </div>

          <div className="bienvenida-fecha">{formatearFecha()}</div>
        </section>

        {/* ACCESOS RÁPIDOS */}
        <div className="seccion-titulo">
          <i className="fas fa-bolt"></i>
          Accesos rápidos
        </div>

        <div className="accesos-grid">
          <Link to="/insumos" className="acceso">
            <div className="acceso-icono ac-verde">
              <i className="fas fa-plus"></i>
            </div>
            <span>Nuevo insumo</span>
          </Link>

          <Link to="/productos" className="acceso">
            <div className="acceso-icono ac-azul">
              <i className="fas fa-cube"></i>
            </div>
            <span>Nuevo producto</span>
          </Link>

          <Link to="/costos" className="acceso">
            <div className="acceso-icono ac-amarillo">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <span>Registrar costo</span>
          </Link>

          <Link to="/equilibrio" className="acceso">
            <div className="acceso-icono ac-teal">
              <i className="fas fa-scale-balanced"></i>
            </div>
            <span>P. Equilibrio</span>
          </Link>

          <Link to="/reportes" className="acceso">
            <div className="acceso-icono ac-morado">
              <i className="fas fa-file-alt"></i>
            </div>
            <span>Ver reportes</span>
          </Link>

          <Link to="/analisis" className="acceso">
            <div className="acceso-icono ac-naranja">
              <i className="fas fa-chart-pie"></i>
            </div>
            <span>Análisis</span>
          </Link>

          <Link to="/auditoria" className="acceso">
            <div className="acceso-icono ac-rojo">
              <i className="fas fa-clipboard-list"></i>
            </div>
            <span>Auditoría</span>
          </Link>

          <Link to="/usuarios" className="acceso">
            <div className="acceso-icono ac-gris">
              <i className="fas fa-users"></i>
            </div>
            <span>Usuarios</span>
          </Link>
        </div>

        {/* TARJETAS KPI */}
        <div className="tarjetas-kpi">
          <div className="tarjeta-kpi kpi-azul">
            <div className="kpi-cabeza">
              <div>
                <div className="kpi-label">Costo total producción</div>
                <div className="kpi-valor">{formatearDinero(costoTotal)}</div>
              </div>
              <div className="kpi-icono">
                <i className="fas fa-industry"></i>
              </div>
            </div>
            <div className="kpi-sub neutro">
              <i className="fas fa-cube"></i>
              {productos.length} jabones registrados
            </div>
          </div>

          <div className="tarjeta-kpi kpi-verde">
            <div className="kpi-cabeza">
              <div>
                <div className="kpi-label">Ingresos estimados</div>
                <div className="kpi-valor">{formatearDinero(ingresos)}</div>
              </div>
              <div className="kpi-icono">
                <i className="fas fa-sack-dollar"></i>
              </div>
            </div>
            <div className="kpi-sub positivo">
              <i className="fas fa-arrow-trend-up"></i>
              Suma de precios de venta
            </div>
          </div>

          <div className="tarjeta-kpi kpi-verde">
            <div className="kpi-cabeza">
              <div>
                <div className="kpi-label">Ganancia bruta</div>
                <div className="kpi-valor">{formatearDinero(ganancia)}</div>
              </div>
              <div className="kpi-icono">
                <i className="fas fa-chart-line"></i>
              </div>
            </div>
            <div className="kpi-sub positivo">
              <i className="fas fa-circle-check"></i>
              Ingresos sobre costos
            </div>
          </div>

          <div className="tarjeta-kpi kpi-rojo">
            <div className="kpi-cabeza">
              <div>
                <div className="kpi-label">Alertas de stock</div>
                <div className="kpi-valor">{alertas.length}</div>
              </div>
              <div className="kpi-icono">
                <i className="fas fa-bell"></i>
              </div>
            </div>
            <div className="kpi-sub negativo">
              <i className="fas fa-triangle-exclamation"></i>
              Insumos bajo el umbral
            </div>
          </div>
        </div>

        {/* CALENDARIO */}
        <section className="panel calendario-panel">
          <div className="panel-cabeza calendario-cabeza">
            <div>
              <div className="panel-titulo titulo-blanco">
                <i className="fas fa-calendar-days"></i>
                Calendario de recordatorios
              </div>
              <div className="panel-sub subtitulo-blanco">
                Curado de lotes, revisión de costos y stock
              </div>
            </div>
            <button className="btn-sec btn-evento">
              <i className="fas fa-plus"></i>
              Agregar evento
            </button>
          </div>

          <div className="calendario-contenido">
            <div className="panel-body calendario-izquierda">
              <div className="cal-nav">
                <button className="cal-btn">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span className="cal-mes">Septiembre 2026</span>
                <button className="cal-btn">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>

              <div className="cal-grid">
                <div className="cal-dia-label">Do</div>
                <div className="cal-dia-label">Lu</div>
                <div className="cal-dia-label">Ma</div>
                <div className="cal-dia-label">Mi</div>
                <div className="cal-dia-label">Ju</div>
                <div className="cal-dia-label">Vi</div>
                <div className="cal-dia-label">Sá</div>

                {Array.from({ length: 30 }, (_, i) => (
                  <div
                    key={i}
                    className={`cal-dia ${i + 1 === fecha.getDate() ? "hoy" : ""}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-body">
              <div className="eventos-titulo">Eventos del mes</div>
              <div className="cal-eventos">
                <div className="cal-evento ev-auditoria">
                  <span className="ev-icono">
                    <i className="fas fa-clipboard-list"></i>
                  </span>
                  <span className="ev-texto">Auditoría mensual de costos</span>
                  <span className="ev-fecha">Día 5</span>
                </div>

                <div className="cal-evento ev-stock">
                  <span className="ev-icono">
                    <i className="fas fa-box"></i>
                  </span>
                  <span className="ev-texto">Revisión de stock de aceites</span>
                  <span className="ev-fecha">Día 12</span>
                </div>

                <div className="cal-evento ev-costo">
                  <span className="ev-icono">
                    <i className="fas fa-dollar-sign"></i>
                  </span>
                  <span className="ev-texto">
                    Actualizar precios de materia prima
                  </span>
                  <span className="ev-fecha">Día 18</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GRÁFICOS */}
        <div className="dashboard-fila">
          <section className="panel">
            <div className="panel-cabeza">
              <div>
                <div className="panel-titulo">
                  <i className="fas fa-chart-bar"></i>
                  Costo total por jabón
                </div>
                <div className="panel-sub">Ordenado de mayor a menor</div>
              </div>
            </div>

            <div className="panel-body">
              <div className="barras-grupo">
                {[...productosCalculados]
                  .sort((a, b) => b.costo - a.costo)
                  .map((producto, index) => {
                    const maximo = Math.max(
                      ...productosCalculados.map((p) => p.costo)
                    );

                    return (
                      <div className="barra-fila" key={index}>
                        <span className="barra-nombre">{producto.nombre}</span>
                        <div className="barra-track">
                          <div
                            className="barra-fill b-azul"
                            style={{
                              width: `${(producto.costo / maximo) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="barra-val">
                          {formatearDinero(producto.costo)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-cabeza">
              <div>
                <div className="panel-titulo">
                  <i className="fas fa-chart-pie"></i>
                  Distribución de costos
                </div>
                <div className="panel-sub">MP · MO · CIF global</div>
              </div>
            </div>

            <div className="panel-body">
              <div className="distribucion">
                <div className="distribucion-circulo">
                  <i className="fas fa-chart-pie"></i>
                </div>

                <div className="dona-leyenda">
                  <div className="leyenda-item">
                    <span className="ley-dot verde"></span>
                    <span className="ley-label">Materia Prima</span>
                    <span className="ley-val">
                      {formatearDinero(productos.reduce((a, p) => a + p.mp, 0))}
                    </span>
                  </div>

                  <div className="leyenda-item">
                    <span className="ley-dot naranja"></span>
                    <span className="ley-label">Mano de Obra</span>
                    <span className="ley-val">
                      {formatearDinero(productos.reduce((a, p) => a + p.mo, 0))}
                    </span>
                  </div>

                  <div className="leyenda-item">
                    <span className="ley-dot morado"></span>
                    <span className="ley-label">CIF</span>
                    <span className="ley-val">
                      {formatearDinero(productos.reduce((a, p) => a + p.cif, 0))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RENTABILIDAD + ACTIVIDAD */}
        <div className="dashboard-fila fila-inferior">
          <section className="panel">
            <div className="panel-cabeza">
              <div>
                <div className="panel-titulo">
                  <i className="fas fa-table"></i>
                  Rentabilidad por jabón
                </div>
                <div className="panel-sub">Margen y punto de equilibrio</div>
              </div>
            </div>

            <div className="tabla-wrap">
              <table className="t-panel">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Costo</th>
                    <th>Venta</th>
                    <th>Margen</th>
                    <th>Equilibrio</th>
                  </tr>
                </thead>
                <tbody>
                  {productosCalculados.map((producto, index) => (
                    <tr key={index}>
                      <td>
                        <div className="prod-cell">
                          <div className="prod-ic">
                            <i className="fas fa-cube"></i>
                          </div>
                          {producto.nombre}
                        </div>
                      </td>
                      <td>{formatearDinero(producto.costo)}</td>
                      <td>{formatearDinero(producto.pv)}</td>
                      <td className={producto.porcentaje >= 0 ? "positivo" : "negativo"}>
                        {producto.porcentaje.toFixed(1)}%
                      </td>
                      <td>
                        <span className="badge-eq">
                          {Math.ceil(
                            producto.cf /
                              Math.max(producto.pv - producto.mp - producto.mo, 1)
                          ).toLocaleString("es-CO")}{" "}
                          und
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel">
            <div className="panel-cabeza">
              <div>
                <div className="panel-titulo">
                  <i className="fas fa-clock-rotate-left"></i>
                  Actividad reciente
                </div>
                <div className="panel-sub">Últimos cambios en el sistema</div>
              </div>
            </div>

            <div className="panel-body">
              <div className="actividad-lista">
                {actividad.map((item, index) => (
                  <div className="act-item" key={index}>
                    <div className={`act-avatar ${item.clase}`}>
                      {item.iniciales}
                    </div>
                    <div className="act-info">
                      <div className="act-desc">
                        {item.texto}
                        <span className="badge-mod">{item.modulo}</span>
                      </div>
                      <div className="act-tiempo">
                        <i className="fas fa-clock"></i>
                        {item.tiempo}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

      </main>

    </div>
  );
}
