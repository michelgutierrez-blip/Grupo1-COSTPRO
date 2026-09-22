import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarEmpleado from "../../components/empleado/NavbarEmpleado";
import SidebarEmpleado from "../../components/empleado/SidebarEmpleado";
import "../../styles/empleado.css";

export default function PanelEmpleado() {

  // =========================================================
  // ESTADOS
  // =========================================================

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [fechaActual, setFechaActual] = useState(new Date());

  const [alertasResueltas, setAlertasResueltas] = useState(new Set());

  const [modalAlertas, setModalAlertas] = useState(false);
  const [modalUmbrales, setModalUmbrales] = useState(false);
  const [modalEvento, setModalEvento] = useState(false);

  const [eventoFecha, setEventoFecha] = useState("");
  const [eventoDesc, setEventoDesc] = useState("");

  const [toast, setToast] = useState({
    visible: false,
    mensaje: ""
  });

  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());

  // =========================================================
  // DATOS DE PRODUCTOS
  // =========================================================

  const [productos] = useState([
    {
      id: 1,
      nombre: "Jabón de Avena",
      insumos: [1, 2, 5]
    },
    {
      id: 2,
      nombre: "Jabón de Lavanda",
      insumos: [2, 3, 6]
    },
    {
      id: 3,
      nombre: "Jabón de Miel",
      insumos: [1, 4, 7]
    },
    {
      id: 4,
      nombre: "Jabón de Aloe Vera",
      insumos: [1, 3, 5]
    },
    {
      id: 5,
      nombre: "Jabón de Coco",
      insumos: [2, 4, 8]
    },
    {
      id: 6,
      nombre: "Jabón de Caléndula",
      insumos: [1, 4, 6]
    }
  ]);

  // =========================================================
  // DATOS DE INSUMOS
  // Adaptados al proyecto de jabones artesanales
  // =========================================================

  const [insumos, setInsumos] = useState([
    {
      id: 1,
      nombre: "Aceite de Oliva",
      u: "L",
      s: 6,
      m: 10
    },
    {
      id: 2,
      nombre: "Aceite de Coco",
      u: "L",
      s: 9,
      m: 8
    },
    {
      id: 3,
      nombre: "Aceite de Lavanda",
      u: "ml",
      s: 350,
      m: 500
    },
    {
      id: 4,
      nombre: "Manteca de Karité",
      u: "kg",
      s: 7,
      m: 10
    },
    {
      id: 5,
      nombre: "Avena en Polvo",
      u: "kg",
      s: 5,
      m: 6
    },
    {
      id: 6,
      nombre: "Caléndula",
      u: "kg",
      s: 3,
      m: 5
    },
    {
      id: 7,
      nombre: "Miel",
      u: "kg",
      s: 4,
      m: 5
    },
    {
      id: 8,
      nombre: "Esencia de Coco",
      u: "ml",
      s: 420,
      m: 400
    }
  ]);

  // =========================================================
  // RECORDATORIOS
  // =========================================================

  const [eventos, setEventos] = useState([]);

  // =========================================================
  // TOAST
  // =========================================================

  const mostrarToast = (mensaje) => {
    setToast({
      visible: true,
      mensaje
    });

    setTimeout(() => {
      setToast({
        visible: false,
        mensaje: ""
      });
    }, 3000);
  };

  // =========================================================
  // FECHA
  // =========================================================

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaActual(new Date());
    }, 30000);

    return () => clearInterval(intervalo);
  }, []);

  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
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
    "diciembre"
  ];

  const fechaTexto = (
    <>
      <strong>{dias[fechaActual.getDay()]}</strong>
      <br />
      {fechaActual.getDate()} de {meses[fechaActual.getMonth()]} de{" "}
      {fechaActual.getFullYear()}
      <br />
      {fechaActual.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit"
      })}
    </>
  );

  // =========================================================
  // ALERTAS
  // =========================================================

  const alertasActivas = insumos.filter(
    (insumo) => insumo.s < insumo.m
  );

  const alertasPendientes = alertasActivas.filter(
    (insumo) => !alertasResueltas.has(insumo.id)
  );

  const stockSaludable = insumos.filter(
    (insumo) => insumo.s >= insumo.m
  ).length;

  const resolverAlerta = (id) => {
    setAlertasResueltas((anteriores) => {
      const nuevas = new Set(anteriores);
      nuevas.add(id);
      return nuevas;
    });

    mostrarToast("Alerta marcada como resuelta.");
  };

  // =========================================================
  // UMBRALES
  // =========================================================

  const cambiarUmbral = (id, valor) => {
    setInsumos((anteriores) =>
      anteriores.map((insumo) =>
        insumo.id === id
          ? {
              ...insumo,
              m: Number(valor)
            }
          : insumo
      )
    );
  };

  const guardarUmbrales = () => {
    setAlertasResueltas(new Set());
    setModalUmbrales(false);

    mostrarToast("Umbrales actualizados correctamente.");
  };

  // =========================================================
  // RANKING DE INSUMOS
  // =========================================================

  const rankingInsumos = () => {

    const conteo = {};

    productos.forEach((producto) => {
      producto.insumos.forEach((idInsumo) => {
        conteo[idInsumo] = (conteo[idInsumo] || 0) + 1;
      });
    });

    return Object.entries(conteo)
      .map(([id, cantidad]) => {
        const insumo = insumos.find(
          (item) => item.id === Number(id)
        );

        return {
          insumo,
          cantidad
        };
      })
      .filter((item) => item.insumo)
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 8);
  };

  const ranking = rankingInsumos();

  const maxRanking = Math.max(
    ...ranking.map((item) => item.cantidad),
    1
  );

  // =========================================================
  // STOCK CRÍTICO
  // =========================================================

  const stockCritico = [...insumos]
    .sort(
      (a, b) =>
        a.s / Math.max(a.m, 1) -
        b.s / Math.max(b.m, 1)
    )
    .slice(0, 8);

  // =========================================================
  // CALENDARIO
  // =========================================================

  const diasSemana = [
    "Do",
    "Lu",
    "Ma",
    "Mi",
    "Ju",
    "Vi",
    "Sá"
  ];

  const mesesCalendario = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  const primerDia = new Date(
    calYear,
    calMonth,
    1
  ).getDay();

  const cantidadDias = new Date(
    calYear,
    calMonth + 1,
    0
  ).getDate();

  const fechaHoy = new Date();

  const cambiarMesAnterior = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(calYear - 1);
    } else {
      setCalMonth(calMonth - 1);
    }
  };

  const cambiarMesSiguiente = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(calYear + 1);
    } else {
      setCalMonth(calMonth + 1);
    }
  };

  const agregarEvento = () => {

    if (!eventoFecha || !eventoDesc.trim()) {
      mostrarToast(
        "Completa la fecha y la descripción."
      );
      return;
    }

    setEventos((anteriores) => [
      ...anteriores,
      {
        fecha: eventoFecha,
        desc: eventoDesc.trim()
      }
    ]);

    const [year, month] = eventoFecha
      .split("-")
      .map(Number);

    setCalYear(year);
    setCalMonth(month - 1);

    setEventoFecha("");
    setEventoDesc("");

    setModalEvento(false);

    mostrarToast(
      "Recordatorio agregado al calendario."
    );
  };

  const eventosMes = eventos
    .filter((evento) => {
      const prefijo = `${calYear}-${String(
        calMonth + 1
      ).padStart(2, "0")}`;

      return evento.fecha.startsWith(prefijo);
    })
    .sort((a, b) =>
      a.fecha.localeCompare(b.fecha)
    );

  const obtenerEventosDia = (dia) => {
    const fecha = `${calYear}-${String(
      calMonth + 1
    ).padStart(2, "0")}-${String(dia).padStart(
      2,
      "0"
    )}`;

    return eventos.filter(
      (evento) => evento.fecha === fecha
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div>

      {/* NAVBAR */}
      <NavbarEmpleado onToggleMenu={() => setMenuAbierto((prev) => !prev)} />

      {/* MENU */}
      <SidebarEmpleado
        abierto={menuAbierto}
        setAbierto={setMenuAbierto}
        rol="empleado"
      />

      <main>

        {/* ================================================
            BIENVENIDA
        ================================================= */}

        <div className="bienvenida">

          <div className="bienvenida-texto">

            <h1>
              ¡Bienvenido! 👋
            </h1>

            <p>
              Aquí tienes el resumen operativo
              de insumos y productos.
            </p>

            <div className="badge-live">
              <span className="dot"></span>
              Panel activo
            </div>

          </div>

          <div className="bienvenida-fecha">
            {fechaTexto}
          </div>

        </div>


        {/* ================================================
            KPI
        ================================================= */}

        <div className="tarjetas-kpi">

          {/* INSUMOS */}

          <div className="tarjeta-kpi kpi-azul">

            <div className="kpi-cabeza">

              <div>

                <div className="kpi-label">
                  Insumos registrados
                </div>

                <div className="kpi-valor">
                  {insumos.length}
                </div>

              </div>

              <div className="kpi-icono">
                <i className="fas fa-flask"></i>
              </div>

            </div>

            <div className="kpi-sub neutro">
              <i className="fas fa-box"></i>
              {" "}En el catálogo de insumos
            </div>

          </div>


          {/* PRODUCTOS */}

          <div className="tarjeta-kpi kpi-verde">

            <div className="kpi-cabeza">

              <div>

                <div className="kpi-label">
                  Productos registrados
                </div>

                <div className="kpi-valor">
                  {productos.length}
                </div>

              </div>

              <div className="kpi-icono">
                <i className="fas fa-cube"></i>
              </div>

            </div>

            <div className="kpi-sub positivo">
              <i className="fas fa-circle-check"></i>
              {" "}En el catálogo de productos
            </div>

          </div>


          {/* STOCK OK */}

          <div className="tarjeta-kpi kpi-morado">

            <div className="kpi-cabeza">

              <div>

                <div className="kpi-label">
                  Insumos con stock OK
                </div>

                <div className="kpi-valor">
                  {stockSaludable}/{insumos.length}
                </div>

              </div>

              <div className="kpi-icono">
                <i className="fas fa-warehouse"></i>
              </div>

            </div>

            <div className="kpi-sub neutro">
              <i className="fas fa-circle-info"></i>
              {" "}Por encima del umbral mínimo
            </div>

          </div>


          {/* ALERTAS */}

          <div
            className="tarjeta-kpi kpi-rojo"
            title="Ver alertas de stock"
            style={{ cursor: "pointer" }}
            onClick={() => setModalAlertas(true)}
          >

            <div className="kpi-cabeza">

              <div>

                <div className="kpi-label">
                  Alertas de stock
                </div>

                <div className="kpi-valor">
                  {alertasPendientes.length}
                </div>

              </div>

              <div className="kpi-icono">
                <i
                  className={
                    alertasPendientes.length
                      ? "fas fa-bell"
                      : "fas fa-bell-slash"
                  }
                ></i>
              </div>

            </div>

            <div className="kpi-sub negativo">
              <i className="fas fa-triangle-exclamation"></i>
              {" "}Insumos bajo el umbral
            </div>

          </div>

        </div>


        {/* ================================================
            ACCESOS RÁPIDOS
        ================================================= */}

        <div className="seccion-titulo">
          <i
            className="fas fa-bolt"
            style={{ color: "#d97706" }}
          ></i>
          {" "}Accesos rápidos
        </div>

        <div className="accesos-grid">

          <Link
            to="/empleado/insumos"
            className="acceso"
          >
            <div className="acceso-icono ac-verde">
              <i className="fas fa-plus"></i>
            </div>

            <span>
              Nuevo insumo
            </span>
          </Link>


          <Link
            to="/empleado/productos"
            className="acceso"
          >
            <div className="acceso-icono ac-azul">
              <i className="fas fa-cube"></i>
            </div>

            <span>
              Nuevo producto
            </span>
          </Link>


          <Link
            to="/empleado/costos"
            className="acceso"
          >
            <div className="acceso-icono ac-amarillo">
              <i className="fas fa-dollar-sign"></i>
            </div>

            <span>
              Ver costos
            </span>
          </Link>


          <Link
            to="/empleado/reportes"
            className="acceso"
          >
            <div className="acceso-icono ac-morado">
              <i className="fas fa-file-alt"></i>
            </div>

            <span>
              Ver reportes
            </span>
          </Link>

        </div>


        {/* ================================================
            CALENDARIO
        ================================================= */}

        <div
          className="panel"
          style={{ marginBottom: "16px" }}
        >

          <div
            className="panel-cabeza"
            style={{
              background:
                "linear-gradient(90deg,#0c5048,#1b6d4a)",
              borderRadius:
                "17px 17px 0 0"
            }}
          >

            <div>

              <div
                className="panel-titulo"
                style={{ color: "white" }}
              >
                <i className="fas fa-calendar-days"></i>
                {" "}Calendario de stock
              </div>

              <div
                className="panel-sub"
                style={{
                  color:
                    "rgba(255,255,255,.65)"
                }}
              >
                Recordatorios de reposición
                de insumos
              </div>

            </div>


            <button
              className="btn-sec"
              onClick={() => {
                setEventoFecha(
                  new Date()
                    .toISOString()
                    .slice(0, 10)
                );

                setEventoDesc("");
                setModalEvento(true);
              }}
              style={{
                fontSize: "12px",
                padding: "7px 14px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background:
                  "rgba(255,255,255,.18)",
                color: "white",
                border:
                  "1px solid rgba(255,255,255,.25)"
              }}
            >
              <i className="fas fa-plus"></i>
              Agregar recordatorio
            </button>

          </div>


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "320px 1fr",
              gap: "0"
            }}
          >

            {/* CALENDARIO */}

            <div
              className="panel-body"
              style={{
                borderRight:
                  "1px solid #eef1ec"
              }}
            >

              <div className="cal-nav">

                <button
                  className="cal-btn"
                  onClick={cambiarMesAnterior}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                <span className="cal-mes">
                  {mesesCalendario[calMonth]}{" "}
                  {calYear}
                </span>

                <button
                  className="cal-btn"
                  onClick={cambiarMesSiguiente}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>

              </div>


              <div className="cal-grid">

                {diasSemana.map((dia) => (
                  <div
                    key={dia}
                    className="cal-dia-label"
                  >
                    {dia}
                  </div>
                ))}


                {Array.from({
                  length: primerDia
                }).map((_, index) => (
                  <div
                    key={`vacio-${index}`}
                    className="cal-dia vacio"
                  ></div>
                ))}


                {Array.from({
                  length: cantidadDias
                }).map((_, index) => {

                  const dia = index + 1;

                  const esHoy =
                    fechaHoy.getFullYear() ===
                      calYear &&
                    fechaHoy.getMonth() ===
                      calMonth &&
                    fechaHoy.getDate() === dia;

                  const tieneEvento =
                    obtenerEventosDia(dia)
                      .length > 0;

                  return (
                    <div
                      key={dia}
                      className={`cal-dia ${
                        esHoy ? "hoy" : ""
                      } ${
                        tieneEvento
                          ? "tiene-evento"
                          : ""
                      }`}
                    >
                      {dia}
                    </div>
                  );

                })}

              </div>

            </div>


            {/* EVENTOS */}

            <div
              className="panel-body"
              style={{ minHeight: "220px" }}
            >

              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "800",
                  color: "#8a9690",
                  textTransform:
                    "uppercase",
                  letterSpacing: ".5px",
                  marginBottom: "12px"
                }}
              >
                Recordatorios del mes
              </div>


              <div
                className="cal-eventos"
                style={{
                  maxHeight: "220px",
                  overflowY: "auto"
                }}
              >

                {eventosMes.length === 0 ? (

                  <div
                    style={{
                      fontSize: "12px",
                      color: "#8a9690",
                      textAlign: "center",
                      padding: "10px"
                    }}
                  >
                    Sin recordatorios este mes
                  </div>

                ) : (

                  eventosMes.map((evento, index) => {

                    const dia =
                      Number(
                        evento.fecha.split("-")[2]
                      );

                    return (
                      <div
                        className="cal-evento"
                        key={`${evento.fecha}-${index}`}
                      >

                        <span className="ev-icono">
                          <i className="fas fa-box"></i>
                        </span>

                        <span className="ev-texto">
                          {evento.desc}
                        </span>

                        <span className="ev-fecha">
                          Día {dia}
                        </span>

                      </div>
                    );

                  })

                )}

              </div>

            </div>

          </div>

        </div>


        {/* ================================================
            INSUMOS MÁS USADOS + STOCK CRÍTICO
        ================================================= */}

        <div className="grid-2">

          {/* INSUMOS MÁS USADOS */}

          <div className="panel">

            <div className="panel-cabeza">

              <div>

                <div className="panel-titulo">
                  <i className="fas fa-ranking-star"></i>
                  {" "}Insumos más usados
                </div>

                <div className="panel-sub">
                  Según cantidad de productos
                  que los usan
                </div>

              </div>

            </div>


            <div className="panel-body">

              <div className="ranking-lista">

                {ranking.map((item, index) => (

                  <div
                    className="ranking-fila"
                    key={item.insumo.id}
                  >

                    <div
                      className={`ranking-pos ${
                        index === 0
                          ? "top1"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </div>


                    <span
                      className="ranking-nombre"
                      title={item.insumo.nombre}
                    >
                      {item.insumo.nombre}
                    </span>


                    <div className="ranking-track">

                      <div
                        className="ranking-fill"
                        style={{
                          width: `${
                            (
                              item.cantidad /
                              maxRanking
                            ) *
                            100
                          }%`
                        }}
                      ></div>

                    </div>


                    <span className="ranking-val">
                      {item.cantidad} producto
                      {item.cantidad === 1
                        ? ""
                        : "s"}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>


          {/* STOCK CRÍTICO */}

          <div className="panel">

            <div className="panel-cabeza">

              <div>

                <div className="panel-titulo">
                  <i className="fas fa-box-open"></i>
                  {" "}Stock más crítico
                </div>

                <div className="panel-sub">
                  Insumos a punto de agotarse
                </div>

              </div>

            </div>


            <div className="tabla-wrap">

              <table className="t-panel">

                <thead>

                  <tr>
                    <th>Insumo</th>
                    <th>Stock</th>
                  </tr>

                </thead>


                <tbody>

                  {stockCritico.map((insumo) => {

                    const porcentaje =
                      Math.min(
                        (insumo.s /
                          Math.max(
                            insumo.m,
                            1
                          )) *
                          100,
                        100
                      );

                    const critico =
                      insumo.s < insumo.m;

                    return (
                      <tr key={insumo.id}>

                        <td>

                          <div className="prod-cell">

                            <div className="prod-ic">
                              <i className="fas fa-flask"></i>
                            </div>

                            {insumo.nombre}

                          </div>

                        </td>


                        <td>

                          <div className="mini-stock-bar">

                            <div
                              className="mini-stock-fill"
                              style={{
                                width: `${porcentaje}%`
                              }}
                            ></div>

                          </div>

                          <strong>
                            {insumo.s}{" "}
                            {insumo.u}
                          </strong>{" "}

                          {critico ? (

                            <span className="badge-na">
                              bajo
                            </span>

                          ) : (

                            <span className="badge-eq">
                              ok
                            </span>

                          )}

                        </td>

                      </tr>
                    );

                  })}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>


      {/* =====================================================
          MODAL ALERTAS
      ====================================================== */}

      {modalAlertas && (

        <div
          className="modal-overlay activo"
          onClick={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              setModalAlertas(false);
            }
          }}
        >

          <div
            className="modal-box"
            style={{ maxWidth: "520px" }}
          >

            <div className="modal-head">

              <h2>

                <i
                  className="fas fa-bell"
                  style={{
                    color: "#b91c1c"
                  }}
                ></i>

                {" "}Alertas de stock{" "}

                <span className="badge-alerta-cnt">
                  {alertasPendientes.length}
                </span>

              </h2>


              <button
                className="modal-cerrar"
                onClick={() =>
                  setModalAlertas(false)
                }
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>


            <div
              className="modal-body"
              style={{ padding: "0" }}
            >

              <div
                style={{
                  padding: "14px 20px",
                  background: "#fff8f8",
                  borderBottom:
                    "1px solid #fce7e7",
                  fontSize: "12px",
                  color: "#8a9690",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  gap: "12px"
                }}
              >

                <span>
                  <i
                    className="fas fa-circle-info"
                    style={{
                      color: "#d97706",
                      marginRight: "4px"
                    }}
                  ></i>
                  Insumos bajo el umbral mínimo
                </span>


                <button
                  className="btn-sec"
                  onClick={() => {
                    setModalAlertas(false);
                    setModalUmbrales(true);
                  }}
                  style={{
                    fontSize: "12px",
                    padding: "6px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px"
                  }}
                >
                  <i className="fas fa-sliders"></i>
                  Umbrales
                </button>

              </div>


              <div>

                {alertasActivas.length === 0 ? (

                  <div className="sin-alertas">

                    <i
                      className="fas fa-circle-check"
                      style={{
                        fontSize: "28px",
                        color: "#1b6d2a"
                      }}
                    ></i>

                    Sin alertas activas

                  </div>

                ) : (

                  <div
                    className="alertas-lista"
                    style={{
                      padding: "0 20px"
                    }}
                  >

                    {alertasActivas.map(
                      (insumo) => {

                        const resuelta =
                          alertasResueltas.has(
                            insumo.id
                          );

                        const porcentaje =
                          Math.min(
                            (insumo.s /
                              Math.max(
                                insumo.m,
                                1
                              )) *
                              100,
                            100
                          );

                        const critica =
                          porcentaje < 50;

                        return (
                          <div
                            className={`alerta-item ${
                              critica
                                ? "al-critica"
                                : "al-advertencia"
                            } ${
                              resuelta
                                ? "resuelta"
                                : ""
                            }`}
                            key={insumo.id}
                          >

                            <div className="al-ic">
                              <i
                                className={`fas fa-${
                                  critica
                                    ? "triangle-exclamation"
                                    : "circle-exclamation"
                                }`}
                              ></i>
                            </div>


                            <div className="al-info">

                              <div className="al-nombre">
                                {insumo.nombre}
                              </div>

                              <div className="al-det">
                                {resuelta
                                  ? "Resuelta · "
                                  : ""}
                                Mín: {insumo.m}{" "}
                                {insumo.u}
                              </div>

                            </div>


                            <div className="al-stock">

                              <div className="al-actual">
                                {insumo.s}{" "}
                                {insumo.u}
                              </div>

                              <div className="stock-bar">

                                <div
                                  className={`stock-fill ${
                                    critica
                                      ? "sf-critica"
                                      : "sf-advertencia"
                                  }`}
                                  style={{
                                    width: `${porcentaje}%`
                                  }}
                                ></div>

                              </div>

                              <div className="al-min">
                                de {insumo.m}
                              </div>

                            </div>


                            {!resuelta ? (

                              <button
                                className="btn-res"
                                onClick={() =>
                                  resolverAlerta(
                                    insumo.id
                                  )
                                }
                                title="Marcar resuelta"
                              >
                                <i className="fas fa-check"></i>
                              </button>

                            ) : (

                              <div
                                style={{
                                  width: "30px"
                                }}
                              ></div>

                            )}

                          </div>
                        );

                      }
                    )}

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          MODAL UMBRALES
      ====================================================== */}

      {modalUmbrales && (

        <div
          className="modal-overlay activo"
          onClick={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              setModalUmbrales(false);
            }
          }}
        >

          <div className="modal-box">

            <div className="modal-head">

              <h2>
                <i className="fas fa-sliders"></i>
                {" "}Umbrales mínimos de stock
              </h2>

              <button
                className="modal-cerrar"
                onClick={() =>
                  setModalUmbrales(false)
                }
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>


            <div className="modal-body">

              <p
                style={{
                  fontSize: "13px",
                  color: "#8a9690",
                  marginBottom: "16px"
                }}
              >
                Define el stock mínimo de cada
                insumo. Cuando el stock real baje,
                aparecerá una alerta.
              </p>


              <div>

                {insumos.map((insumo) => (

                  <div
                    className="umbral-fila"
                    key={insumo.id}
                  >

                    <span className="umbral-nombre">
                      {insumo.nombre}
                    </span>

                    <input
                      type="number"
                      className="input-umbral"
                      value={insumo.m}
                      min="0"
                      onChange={(e) =>
                        cambiarUmbral(
                          insumo.id,
                          e.target.value
                        )
                      }
                    />

                    <span className="umbral-und">
                      {insumo.u}
                    </span>

                  </div>

                ))}

              </div>

            </div>


            <div className="modal-footer">

              <button
                className="btn-sec"
                onClick={() =>
                  setModalUmbrales(false)
                }
              >
                Cancelar
              </button>

              <button
                className="btn-pri"
                onClick={guardarUmbrales}
              >
                <i className="fas fa-save"></i>
                {" "}Guardar
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          MODAL NUEVO RECORDATORIO
      ====================================================== */}

      {modalEvento && (

        <div
          className="modal-overlay activo"
          onClick={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              setModalEvento(false);
            }
          }}
        >

          <div className="modal-evento-box">

            <div className="modal-head">

              <h2>
                <i className="fas fa-calendar-plus"></i>
                {" "}Agregar recordatorio de stock
              </h2>

              <button
                className="modal-cerrar"
                onClick={() =>
                  setModalEvento(false)
                }
              >
                <i className="fas fa-xmark"></i>
              </button>

            </div>


            <div className="modal-body">

              <div
                style={{
                  marginBottom: "12px"
                }}
              >

                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#5b6a62",
                    display: "block",
                    marginBottom: "6px"
                  }}
                >
                  Fecha
                </label>

                <input
                  type="date"
                  className="input-texto"
                  value={eventoFecha}
                  onChange={(e) =>
                    setEventoFecha(
                      e.target.value
                    )
                  }
                />

              </div>


              <div>

                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#5b6a62",
                    display: "block",
                    marginBottom: "6px"
                  }}
                >
                  Descripción
                </label>

                <input
                  type="text"
                  className="input-texto"
                  placeholder="Ej: Revisar stock de Aceite de Oliva"
                  value={eventoDesc}
                  onChange={(e) =>
                    setEventoDesc(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>


            <div className="modal-footer">

              <button
                className="btn-sec"
                onClick={() =>
                  setModalEvento(false)
                }
              >
                Cancelar
              </button>

              <button
                className="btn-pri"
                onClick={agregarEvento}
              >
                <i className="fas fa-check"></i>
                {" "}Agregar
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          TOAST
      ====================================================== */}

      <div
        className={`toast ${
          toast.visible ? "visible" : ""
        }`}
      >

        <i className="fas fa-circle-check"></i>

        <span>
          {toast.mensaje}
        </span>

      </div>

    </div>
  );
}