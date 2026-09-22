import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/admin.css";

export default function Ventas() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  /* ===== DATOS DE EJEMPLO ===== */
  const [productosDisponibles] = useState([
    { id: 1, nombre: "Jabón Lavanda", precioVenta: 8000 },
    { id: 2, nombre: "Jabón Carbón", precioVenta: 9500 },
    { id: 3, nombre: "Shampoo Sólido", precioVenta: 12000 },
  ]);

  const [clientesDisponibles] = useState([
    { id: 1, nombre: "Laura Martinez", telefono: "3101234567" },
    { id: 2, nombre: "Carlos Rodriguez", telefono: "3152345678" },
    { id: 3, nombre: "Maria Gonzalez", telefono: "3003456789" },
    { id: 4, nombre: "Andres Gomez", telefono: "3184567890" },
    { id: 5, nombre: "Valentina Torres", telefono: "3015678901" },
    { id: 6, nombre: "Daniela Perez", telefono: "3206789012" },
  ]);

  const [ventas, setVentas] = useState([
    { id: 1, idProducto: 1, idCliente: 1, cantidad: 2, precioVenta: 8000, fecha: "2026-08-22", estado: "Completada" },
    { id: 2, idProducto: 2, idCliente: 2, cantidad: 1, precioVenta: 9500, fecha: "2026-08-22", estado: "Completada" },
    { id: 3, idProducto: 1, idCliente: 1, cantidad: 3, precioVenta: 8000, fecha: "2026-08-23", estado: "Completada" },
    { id: 4, idProducto: 3, idCliente: 3, cantidad: 1, precioVenta: 12000, fecha: "2026-08-24", estado: "Completada" },
    { id: 5, idProducto: 2, idCliente: 2, cantidad: 2, precioVenta: 9500, fecha: "2026-08-25", estado: "Pendiente" },
  ]);

  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroEstadoVal, setFiltroEstadoVal] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ventaEditandoId, setVentaEditandoId] = useState(null);

  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  const [formulario, setFormulario] = useState({
    idProducto: "",
    idCliente: "",
    cantidad: "",
    precioVenta: "",
    fecha: "",
    estado: "Completada",
  });

  /* ===== UTILIDADES ===== */
  const formatCOP = (n) =>
    "$ " + Math.round(Number(n)).toLocaleString("es-CO");

  const formatFecha = (f) => {
    const [y, m, d] = f.split("-");
    return `${d}/${m}/${y}`;
  };

  const nombreProducto = (id) =>
    productosDisponibles.find((p) => p.id === id)?.nombre || "—";

  const nombreCliente = (id) =>
    clientesDisponibles.find((c) => c.id === id)?.nombre || "—";

  const claseEstado = {
    Completada: "badge-completada",
    Pendiente: "badge-pendiente",
    Anulada: "badge-anulada",
  };

  /* ===== RESUMEN ===== */
  const completadas = ventas.filter((v) => v.estado === "Completada");
  const ingresoTotal = completadas.reduce(
    (s, v) => s + v.cantidad * v.precioVenta,
    0
  );
  const ventaProm = completadas.length ? ingresoTotal / completadas.length : 0;
  const pendientes = ventas.filter((v) => v.estado === "Pendiente").length;

  /* ===== FILTRADO ===== */
  const ventasFiltradas = ventas
    .filter((v) => {
      const texto = (
        nombreProducto(v.idProducto) +
        " " +
        nombreCliente(v.idCliente)
      ).toLowerCase();
      const pasaTexto =
        !filtroTexto || texto.includes(filtroTexto.toLowerCase());
      const pasaEstado =
        !filtroEstadoVal || v.estado === filtroEstadoVal;
      return pasaTexto && pasaEstado;
    })
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  /* ===== MODAL VENTA ===== */
  const limpiarFormulario = () => {
    setFormulario({
      idProducto: "",
      idCliente: "",
      cantidad: "",
      precioVenta: "",
      fecha: "",
      estado: "Completada",
    });
  };

  const abrirNuevaVenta = () => {
    setModoEdicion(false);
    setVentaEditandoId(null);
    limpiarFormulario();
    setFormulario((f) => ({
      ...f,
      fecha: new Date().toISOString().slice(0, 10),
    }));
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    limpiarFormulario();
  };

  const editarVenta = (id) => {
    const v = ventas.find((x) => x.id === id);
    if (!v) return;

    setModoEdicion(true);
    setVentaEditandoId(id);
    setFormulario({
      idProducto: v.idProducto,
      idCliente: v.idCliente,
      cantidad: v.cantidad,
      precioVenta: v.precioVenta,
      fecha: v.fecha,
      estado: v.estado,
    });
    setMostrarModal(true);
  };

  const precargarPrecio = () => {
    const idProd = parseInt(formulario.idProducto);
    const prod = productosDisponibles.find((p) => p.id === idProd);
    if (prod) {
      setFormulario((f) => ({ ...f, precioVenta: prod.precioVenta }));
    }
  };

  const totalVenta =
    (parseFloat(formulario.cantidad) || 0) *
    (parseFloat(formulario.precioVenta) || 0);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const guardarVenta = (e) => {
    e.preventDefault();

    const idProducto = parseInt(formulario.idProducto);
    const idCliente = parseInt(formulario.idCliente);
    const cantidad = parseFloat(formulario.cantidad);
    const precioVenta = parseFloat(formulario.precioVenta);

    if (!idProducto) { alert("Selecciona un producto."); return; }
    if (!idCliente) { alert("Selecciona un cliente."); return; }
    if (isNaN(cantidad) || cantidad <= 0) { alert("Ingresa una cantidad válida."); return; }
    if (isNaN(precioVenta) || precioVenta < 0) { alert("Ingresa un precio de venta válido."); return; }
    if (!formulario.fecha) { alert("Selecciona una fecha."); return; }

    const datos = {
      idProducto,
      idCliente,
      cantidad,
      precioVenta,
      fecha: formulario.fecha,
      estado: formulario.estado,
    };

    if (modoEdicion) {
      setVentas(
        ventas.map((v) =>
          v.id === ventaEditandoId ? { ...v, ...datos } : v
        )
      );
    } else {
      const nuevoId = ventas.length
        ? Math.max(...ventas.map((v) => v.id)) + 1
        : 1;
      setVentas([...ventas, { id: nuevoId, ...datos }]);
    }

    cerrarModal();
  };

  /* ===== ELIMINAR ===== */
  const pedirEliminar = (id) => {
    setIdAEliminar(id);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminar = () => {
    setVentas(ventas.filter((x) => x.id !== idAEliminar));
    setIdAEliminar(null);
    setMostrarModalEliminar(false);
  };

  const ventaAEliminar = ventas.find((v) => v.id === idAEliminar);

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
            <i className="fas fa-cash-register"></i>
            Gestión de Ventas
          </h1>
          <p>Registra las ventas realizadas por producto y cliente</p>
        </div>

        {/* ================= TARJETAS RESUMEN ================= */}
        <div className="tarjetas-resumen">

          <div className="tarjeta-res tarjeta-verde">
            <div className="tarjeta-icono">
              <i className="fas fa-receipt"></i>
            </div>
            <div className="tarjeta-info">
              <div className="tarjeta-valor">{ventas.length}</div>
              <div className="tarjeta-label">Ventas registradas</div>
            </div>
          </div>

          <div className="tarjeta-res tarjeta-azul">
            <div className="tarjeta-icono">
              <i className="fas fa-sack-dollar"></i>
            </div>
            <div className="tarjeta-info">
              <div className="tarjeta-valor">{formatCOP(ingresoTotal)}</div>
              <div className="tarjeta-label">Ingreso total (completadas)</div>
            </div>
          </div>

          <div className="tarjeta-res tarjeta-amarillo">
            <div className="tarjeta-icono">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="tarjeta-info">
              <div className="tarjeta-valor">{formatCOP(ventaProm)}</div>
              <div className="tarjeta-label">Venta promedio</div>
            </div>
          </div>

          <div className="tarjeta-res tarjeta-rojo">
            <div className="tarjeta-icono">
              <i className="fas fa-clock"></i>
            </div>
            <div className="tarjeta-info">
              <div className="tarjeta-valor">{pendientes}</div>
              <div className="tarjeta-label">Ventas pendientes</div>
            </div>
          </div>

        </div>

        {/* ================= LISTA DE VENTAS ================= */}
        <section className="seccion">

          <div className="seccion-head">
            <div>
              <h2>
                <i className="fas fa-list"></i>
                Ventas registradas
              </h2>
              <p>Consulta, edita o elimina las ventas del sistema</p>
            </div>
            <button className="btn-primario" onClick={abrirNuevaVenta}>
              <i className="fas fa-plus"></i>
              Nueva venta
            </button>
          </div>

          {/* Filtros */}
          <div className="filtros-bar">
            <div className="buscador-wrap">
              <i className="fas fa-search buscador-icono"></i>
              <input
                type="text"
                className="buscador-input"
                placeholder="Buscar por producto o cliente…"
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
              />
            </div>
            <select
              className="filtro-select"
              value={filtroEstadoVal}
              onChange={(e) => setFiltroEstadoVal(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="Completada">Completada</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Anulada">Anulada</option>
            </select>
          </div>

          <div className="tabla-wrap">
            <table className="tabla-ventas">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Producto</th>
                  <th>Cliente</th>
                  <th>Cantidad</th>
                  <th>Precio de venta</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventasFiltradas.map((v) => {
                  const total = v.cantidad * v.precioVenta;
                  return (
                    <tr key={v.id}>
                      <td className="celda-fecha">{formatFecha(v.fecha)}</td>
                      <td>
                        <div className="producto-cell">
                          <div className="avatar-prod">
                            <i className="fas fa-cube"></i>
                          </div>
                          <span>{nombreProducto(v.idProducto)}</span>
                        </div>
                      </td>
                      <td>{nombreCliente(v.idCliente)}</td>
                      <td className="celda-num">{v.cantidad}</td>
                      <td className="celda-num">{formatCOP(v.precioVenta)}</td>
                      <td className="celda-total">{formatCOP(total)}</td>
                      <td>
                        <span className={`badge-estado ${claseEstado[v.estado] || ""}`}>
                          {v.estado}
                        </span>
                      </td>
                      <td>
                        <div className="acciones-fila">
                          <button
                            className="btn-icon btn-editar"
                            title="Editar"
                            onClick={() => editarVenta(v.id)}
                          >
                            <i className="fas fa-pen"></i>
                          </button>
                          <button
                            className="btn-icon btn-eliminar"
                            title="Eliminar"
                            onClick={() => pedirEliminar(v.id)}
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

          {ventasFiltradas.length === 0 && (
            <div className="tabla-vacia">
              <i className="fas fa-receipt"></i>
              <p>No hay ventas registradas aún.</p>
              <span>
                Haz clic en <strong>Nueva venta</strong> para comenzar.
              </span>
            </div>
          )}

        </section>

      </main>

      {/* ================= MODAL NUEVA / EDITAR VENTA ================= */}
      {mostrarModal && (
        <div className="modal-overlay activo" onClick={cerrarModal}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <h2>
                <i className={modoEdicion ? "fas fa-pen" : "fas fa-plus"}></i>
                {modoEdicion ? " Editar venta" : " Nueva venta"}
              </h2>
              <button className="modal-cerrar" onClick={cerrarModal}>
                <i className="fas fa-xmark"></i>
              </button>
            </div>

            <form className="modal-body" onSubmit={guardarVenta}>

              <div className="campo">
                <label>
                  Producto <span className="req">*</span>
                </label>
                <select
                  name="idProducto"
                  value={formulario.idProducto}
                  onChange={(e) => {
                    handleChange(e);
                    precargarPrecio();
                  }}
                >
                  <option value="">— Selecciona un producto —</option>
                  {productosDisponibles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="campo">
                <label>
                  Cliente <span className="req">*</span>
                </label>
                <select
                  name="idCliente"
                  value={formulario.idCliente}
                  onChange={handleChange}
                >
                  <option value="">— Selecciona un cliente —</option>
                  {clientesDisponibles.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="campo-fila">
                <div className="campo">
                  <label>
                    Cantidad <span className="req">*</span>
                  </label>
                  <input
                    type="number"
                    name="cantidad"
                    min="1"
                    step="1"
                    placeholder="0"
                    value={formulario.cantidad}
                    onChange={handleChange}
                  />
                </div>
                <div className="campo">
                  <label>
                    Precio de venta (unitario) <span className="req">*</span>
                  </label>
                  <div className="input-prefix-wrap">
                    <span className="input-prefix">$</span>
                    <input
                      type="number"
                      name="precioVenta"
                      min="0"
                      step="100"
                      placeholder="0"
                      value={formulario.precioVenta}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="campo-fila">
                <div className="campo">
                  <label>
                    Fecha <span className="req">*</span>
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    value={formulario.fecha}
                    onChange={handleChange}
                  />
                </div>
                <div className="campo">
                  <label>
                    Estado <span className="req">*</span>
                  </label>
                  <select
                    name="estado"
                    value={formulario.estado}
                    onChange={handleChange}
                  >
                    <option value="Completada">Completada</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Anulada">Anulada</option>
                  </select>
                </div>
              </div>

              <div className="total-venta-wrap">
                <span>Total de la venta</span>
                <strong>{formatCOP(totalVenta)}</strong>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secundario"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primario">
                  <i className="fas fa-check"></i>
                  Guardar venta
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL CONFIRMAR ELIMINACIÓN ================= */}
      {mostrarModalEliminar && ventaAEliminar && (
        <div
          className="modal-overlay activo"
          onClick={() => setMostrarModalEliminar(false)}
        >
          <div
            className="modal-box modal-chico"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head modal-head-danger">
              <h2>
                <i className="fas fa-triangle-exclamation"></i>
                Eliminar venta
              </h2>
              <button
                className="modal-cerrar"
                onClick={() => setMostrarModalEliminar(false)}
              >
                <i className="fas fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="alerta-danger">
                <i className="fas fa-circle-exclamation"></i>
                <div>
                  <p>
                    Estás a punto de eliminar la venta de{" "}
                    <strong>{nombreProducto(ventaAEliminar.idProducto)}</strong>{" "}
                    a <strong>{nombreCliente(ventaAEliminar.idCliente)}</strong>{" "}
                    ({formatFecha(ventaAEliminar.fecha)}).
                  </p>
                  <p className="alerta-sub">Esta acción no se puede deshacer.</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secundario"
                onClick={() => setMostrarModalEliminar(false)}
              >
                Cancelar
              </button>
              <button className="btn-danger" onClick={confirmarEliminar}>
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
