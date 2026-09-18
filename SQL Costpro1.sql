Create database costpro;
-- Le dice a MySQL que a partir de aquí trabajemos DENTRO de costpro
use costpro;
-- Crea la base de datos donde vivirán todas las tablas
CREATE TABLE USUARIO (
    id_usuario     INT AUTO_INCREMENT PRIMARY KEY,
    usuario        VARCHAR(50)  NOT NULL UNIQUE,
    nombre         VARCHAR(50)  NOT NULL,
    apellido       VARCHAR(50)  NOT NULL,
    correo         VARCHAR(100) NOT NULL UNIQUE,
    contrasena     VARCHAR(255) NOT NULL,
    rol            VARCHAR(20)  NOT NULL,
    estado         VARCHAR(20)  NOT NULL
) ENGINE=InnoDB;

-- Crea las tablas
CREATE TABLE CATEGORIA (
    id_categoria     INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(50) NOT NULL UNIQUE
); 

CREATE TABLE PROVEEDOR (
    id_proveedor  INT AUTO_INCREMENT PRIMARY KEY,
    nombre        VARCHAR(100) NOT NULL,
    direccion     VARCHAR(150),
    telefono      VARCHAR(20)  NOT NULL,
    correo        VARCHAR(150),
    observacion   VARCHAR(250),
    estado        VARCHAR(20)  NOT NULL
);

CREATE TABLE CLIENTE (
    id_cliente  INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    telefono    VARCHAR(20)
);

-- ALTER TABLE Y ADD para alterar una tabla y añadir una columna 
ALTER TABLE CLIENTE
ADD COLUMN correo VARCHAR(100);

-- UPDATE para modificar datos que ya existen en una tabla 
-- SET: dice qué columna cambia y por cuál valor nuevo 
-- WHERE: dice en cuál fila EXACTA aplicar el cambio

UPDATE CLIENTE
SET correo = 'laura.martinez@gmail.com'
WHERE id_cliente = 1;

UPDATE CLIENTE
SET correo = 'carlos.rodriguez@gmail.com'
WHERE id_cliente = 2;

UPDATE CLIENTE
SET correo = 'maria.gonzalez@gmail.com'
WHERE id_cliente = 3;

UPDATE CLIENTE
SET correo = 'andres.gomez@gmail.com'
WHERE id_cliente = 4;

UPDATE CLIENTE
SET correo = 'valentina.torres@gmail.com'
WHERE id_cliente = 5;

UPDATE CLIENTE
SET correo = 'daniela.perez@gmail.com'
WHERE id_cliente = 6;

CREATE TABLE PRODUCTO (
    id_producto             INT AUTO_INCREMENT PRIMARY KEY,
    nombre                  VARCHAR(100)  NOT NULL,
    descripcion             VARCHAR(255),
    unidad_medida           VARCHAR(20)   NOT NULL,
    costo_mano_obra_unidad  DECIMAL(10,2) NOT NULL,
    precio_venta            DECIMAL(10,2) NOT NULL,
    estado                  VARCHAR(20)   NOT NULL,
    id_categoria            INT           NOT NULL,
    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria)
);
 
CREATE TABLE INSUMO (
    id_insumo           INT AUTO_INCREMENT PRIMARY KEY,
    nombre              VARCHAR(100)  NOT NULL,
    cantidad            DECIMAL(10,2) NOT NULL,
    unidad_medida       VARCHAR(20)   NOT NULL,
    precio_unitario     DECIMAL(10,2) NOT NULL,
    fecha_vencimiento   DATE,
    inventario_minimo   DECIMAL(10,2) NOT NULL,
    estado              VARCHAR(20)   NOT NULL,
    id_proveedor        INT           NOT NULL,
    CONSTRAINT fk_insumo_proveedor
        FOREIGN KEY (id_proveedor) REFERENCES PROVEEDOR(id_proveedor)
); 
 
 
CREATE TABLE PRODUCTO_INSUMO (
    id_producto         INT           NOT NULL,
    id_insumo           INT           NOT NULL,
    cantidad_por_unidad DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_producto, id_insumo),
    CONSTRAINT fk_prodinsumo_producto
        FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto),
    CONSTRAINT fk_prodinsumo_insumo
        FOREIGN KEY (id_insumo) REFERENCES INSUMO(id_insumo)
);
 
CREATE TABLE PRODUCCION (
    id_registro             INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora              TIMESTAMP     NOT NULL,
    cantidad_producida      DECIMAL(10,2) NOT NULL,
    observacion             VARCHAR(255),
    estado                  VARCHAR(20)   NOT NULL,
    justificacion_anulacion VARCHAR(255),
    id_producto             INT           NOT NULL,
    id_usuario              INT           NOT NULL,
    CONSTRAINT fk_produccion_producto
        FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto),
    CONSTRAINT fk_produccion_usuario
        FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);
 
CREATE TABLE VENTA (
    id_venta      INT AUTO_INCREMENT PRIMARY KEY,
    cantidad      INT           NOT NULL,
    precio_venta  DECIMAL(10,2) NOT NULL,
    fecha         TIMESTAMP     NOT NULL,
    estado        VARCHAR(20)   NOT NULL,
    id_producto   INT           NOT NULL,
    id_cliente    INT           NOT NULL,
    CONSTRAINT fk_venta_producto
        FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto),
    CONSTRAINT fk_venta_cliente
        FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente)
);
 
CREATE TABLE ALERTA (
    id_alerta   INT AUTO_INCREMENT PRIMARY KEY,
    fecha       TIMESTAMP    NOT NULL,
    mensaje     VARCHAR(255) NOT NULL,
    estado      VARCHAR(20)  NOT NULL,
    id_insumo   INT          NOT NULL,
    CONSTRAINT fk_alerta_insumo
        FOREIGN KEY (id_insumo) REFERENCES INSUMO(id_insumo)
);

-- VALORES DE LAS TABLAS 
-- -- estructura: INSERT INTO tabla (columnas) VALUES (valores);

INSERT INTO USUARIO (Usuario, nombre, apellido, correo, contrasena, rol, estado) VALUES
('sofia123', 'Sofia', 'Moreno', 'sofia123@gmail.com', 'Sofia1234', 'Administrador', 'Activo'),
('carlos22', 'Carlos', 'Rodriguez', 'carlos22@gmail.com', 'Carlos2026', 'Cliente', 'Activo'),
('laura_dev', 'Laura', 'Martinez', 'laura.dev@gmail.com', 'Laura789', 'Empleado', 'Activo'),
('andres15', 'Andres', 'Gomez', 'andres15@gmail.com', 'Andres456', 'Cliente', 'Inactivo'),
('maria_01', 'Maria', 'Torres', 'maria01@gmail.com', 'Maria321', 'Cliente', 'Activo');

INSERT INTO CATEGORIA (nombre_categoria) VALUES
('Jabones faciales'),
('Jabones corporales'),
('Jabones exfoliantes'),
('Jabones artesanales'),
('Kits de cuidado');

INSERT INTO PROVEEDOR 
(nombre, direccion, telefono, correo, observacion, estado) VALUES
('Aromas Naturales SAS', 'Carrera 15 # 82-30, Bogotá', '3104567890', 'ventas@aromasnaturales.com', 'Proveedor de aceites esenciales', 'Activo'),
('Quimicos y Esencias Ltda', 'Calle 45 # 20-15, Bogotá', '3157894561', 'contacto@quimicosyesencias.com', 'Proveedor de esencias y colorantes', 'Activo'),
('Empaques Colombia', 'Carrera 68 # 17-45, Bogotá', '3006543210', 'ventas@empaquescolombia.com', 'Proveedor de empaques', 'Activo'),
('Naturaleza Viva', 'Calle 72 # 10-25, Bogotá', '3189876543', 'info@naturalezaviva.com', 'Proveedor de ingredientes naturales', 'Activo'),
('Distribuciones La 30', 'Carrera 30 # 50-18, Bogotá', '3012345678', 'distribuciones30@gmail.com', 'Proveedor ocasional', 'Inactivo');

INSERT INTO CLIENTE (nombre, telefono) VALUES
('Laura Martinez', '3101234567'),
('Carlos Rodriguez', '3152345678'),
('Maria Gonzalez', '3003456789'),
('Andres Gomez', '3184567890'),
('Valentina Torres', '3015678901'),
('Daniela Perez', '3206789012');

INSERT INTO PRODUCTO 
(nombre, descripcion, unidad_medida, costo_mano_obra_unidad, precio_venta, estado, id_categoria) VALUES
('Jabon de Avena', 'Jabon artesanal de avena para piel sensible', 'Unidad', 2500.00, 9000.00, 'Activo', 2),
('Jabon de Lavanda', 'Jabon artesanal con esencia de lavanda', 'Unidad', 2800.00, 10000.00, 'Activo', 4),
('Jabon de Cafe', 'Jabon exfoliante elaborado con cafe molido', 'Unidad', 3000.00, 12000.00, 'Activo', 3),
('Jabon de Miel', 'Jabon artesanal con miel natural', 'Unidad', 2700.00, 9500.00, 'Activo', 4),
('Jabon Facial de Arcilla', 'Jabon facial con arcilla natural', 'Unidad', 3200.00, 13000.00, 'Activo', 1),
('Kit Spa Natural', 'Kit con tres jabones artesanales', 'Kit', 6000.00, 28000.00, 'Activo', 5);

INSERT INTO INSUMO
(nombre, cantidad, unidad_medida, precio_unitario, fecha_vencimiento, inventario_minimo, estado, id_proveedor) VALUES
('Base de glicerina', 25.00, 'Kg', 18000.00, '2027-08-15', 5.00, 'Disponible', 1),
('Aceite de coco', 10.00, 'Litro', 22000.00, '2027-06-20', 2.00, 'Disponible', 4),
('Esencia de lavanda', 5.00, 'Litro', 35000.00, '2027-05-10', 1.00, 'Disponible', 2),
('Cafe molido', 8.00, 'Kg', 15000.00, '2027-12-01', 2.00, 'Disponible', 4),
('Miel natural', 6.00, 'Kg', 25000.00, '2027-09-18', 1.00, 'Disponible', 4),
('Arcilla blanca', 7.00, 'Kg', 17000.00, '2028-01-15', 2.00, 'Disponible', 1),
('Colorante natural', 2.00, 'Litro', 28000.00, '2027-04-30', 0.50, 'Disponible', 2),
('Aceite esencial de vainilla', 3.00, 'Litro', 40000.00, '2027-07-25', 0.50, 'Disponible', 1);

INSERT INTO PRODUCTO_INSUMO
(id_producto, id_insumo, cantidad_por_unidad) VALUES
(1, 1, 0.10),
(1, 2, 0.02),
(2, 1, 0.10),
(2, 3, 0.01),
(3, 1, 0.10),
(3, 4, 0.03),
(4, 1, 0.10),
(4, 5, 0.02),
(5, 1, 0.10),
(5, 6, 0.03),
(5, 2, 0.02),
(6, 1, 0.30),
(6, 3, 0.02),
(6, 4, 0.05),
(6, 5, 0.03);

INSERT INTO PRODUCCION
(fecha_hora, cantidad_producida, observacion, estado, justificacion_anulacion, id_producto, id_usuario) VALUES
('2026-08-20 09:00:00', 25.00, 'Produccion semanal de jabones de avena', 'Completada', NULL, 1, 1),
('2026-08-21 10:30:00', 20.00, 'Produccion de jabones de lavanda', 'Completada', NULL, 2, 1),
('2026-08-22 08:45:00', 15.00, 'Produccion de jabones exfoliantes de cafe', 'Completada', NULL, 3, 3),
('2026-08-23 11:00:00', 18.00, 'Produccion de jabones de miel', 'Completada', NULL, 4, 1),
('2026-08-24 09:15:00', 12.00, 'Produccion de jabones faciales', 'Completada', NULL, 5, 3),
('2026-08-25 14:00:00', 10.00, 'Produccion de kits de cuidado', 'Completada', NULL, 6, 1);

INSERT INTO VENTA
(cantidad, precio_venta, fecha, estado, id_producto, id_cliente) VALUES
(2, 9000.00, '2026-08-22 15:30:00', 'Completada', 1, 1),
(1, 10000.00, '2026-08-22 16:10:00', 'Completada', 2, 2),
(3, 12000.00, '2026-08-23 11:45:00', 'Completada', 3, 3),
(2, 9500.00, '2026-08-24 13:20:00', 'Completada', 4, 4),
(1, 13000.00, '2026-08-25 10:15:00', 'Completada', 5, 5),
(1, 28000.00, '2026-08-26 17:00:00', 'Completada', 6, 1),
(2, 10000.00, '2026-08-27 14:30:00', 'Completada', 2, 6);

INSERT INTO ALERTA
(fecha, mensaje, estado, id_insumo) VALUES
('2026-08-25 08:00:00', 'El inventario de aceite de coco esta cerca del minimo', 'Pendiente', 2),
('2026-08-26 09:30:00', 'El inventario de esencia de lavanda esta cerca del minimo', 'Pendiente', 3),
('2026-08-27 10:00:00', 'El inventario de miel natural esta cerca del minimo', 'Pendiente', 5),
('2026-08-27 11:15:00', 'Revisar fecha de vencimiento del colorante natural', 'Pendiente', 7);

-- SELECT * FROM tabla: muestra TODAS las columnas (*) y TODAS las filas de esa tabla, sin filtrar nada
SELECT * FROM CATEGORIA;
SELECT * FROM PROVEEDOR;
SELECT * FROM CLIENTE;
SELECT * FROM PRODUCTO;
SELECT * FROM INSUMO;
SELECT * FROM USUARIO;

-- CONSULTAS CON JOIN
-- INNER JOIN: junta dos tablas y muestra SOLO las filas que
-- tienen pareja en AMBAS tablas (si no hay coincidencia, no aparece)

-- PRODUCTO + CATEGORIA
SELECT
    p.id_producto,
    p.nombre AS producto,
    c.nombre_categoria AS categoria,
    p.precio_venta
FROM PRODUCTO p
INNER JOIN CATEGORIA c
    ON p.id_categoria = c.id_categoria;


-- INSUMO + PROVEEDOR    
SELECT
    i.id_insumo,
    i.nombre AS insumo,
    i.cantidad,
    i.unidad_medida,
    i.precio_unitario,
    p.nombre AS proveedor
FROM INSUMO i
INNER JOIN PROVEEDOR p
    ON i.id_proveedor = p.id_proveedor;
    
    
-- PRODUCTO + INSUMOS    
SELECT
    p.nombre AS producto,
    i.nombre AS insumo,
    pi.cantidad_por_unidad,
    i.unidad_medida,
    i.precio_unitario
FROM PRODUCTO p
INNER JOIN PRODUCTO_INSUMO pi
    ON p.id_producto = pi.id_producto
INNER JOIN INSUMO i
    ON pi.id_insumo = i.id_insumo;
    
-- PRODUCCIÓN + PRODUCTO + USUARIO    
SELECT
    pr.id_registro,
    p.nombre AS producto,
    pr.cantidad_producida,
    pr.fecha_hora,
    u.nombre,
    u.apellido,
    pr.estado
FROM PRODUCCION pr
INNER JOIN PRODUCTO p
    ON pr.id_producto = p.id_producto
INNER JOIN USUARIO u
    ON pr.id_usuario = u.id_usuario;
    
    
-- VENTA + PRODUCTO + CLIENTE    
SELECT
    v.id_venta,
    p.nombre AS producto,
    v.cantidad,
    v.precio_venta,
    c.nombre AS cliente,
    v.fecha,
    v.estado
FROM VENTA v
INNER JOIN PRODUCTO p
    ON v.id_producto = p.id_producto
INNER JOIN CLIENTE c
    ON v.id_cliente = c.id_cliente;
    
-- ALERTAS + INSUMOS    
SELECT
    a.id_alerta,
    a.fecha,
    a.mensaje,
    a.estado,
    i.nombre AS insumo,
    i.cantidad AS cantidad_disponible,
    i.inventario_minimo
FROM ALERTA a
INNER JOIN INSUMO i
    ON a.id_insumo = i.id_insumo;
    

-- SUBCONSULTAS
-- Productos con precio de venta por encima del promedio
SELECT nombre, precio_venta
FROM PRODUCTO
WHERE precio_venta > (
    SELECT AVG(precio_venta) FROM PRODUCTO
);

-- Insumos que SI se usan en algun producto
SELECT nombre, unidad_medida
FROM INSUMO
WHERE id_insumo IN (
    SELECT id_insumo FROM PRODUCTO_INSUMO
);

-- Insumos que NO se usan en ningun producto
SELECT nombre, cantidad, estado
FROM INSUMO
WHERE id_insumo NOT IN (
    SELECT id_insumo FROM PRODUCTO_INSUMO
);

-- Producto con el precio de venta mas alto
SELECT nombre, precio_venta
FROM PRODUCTO
WHERE precio_venta = (
    SELECT MAX(precio_venta) FROM PRODUCTO
);

-- Total de unidades vendidas por cada producto (subconsulta correlacionada)
SELECT
    p.nombre AS producto,
    (SELECT COALESCE(SUM(v.cantidad), 0)
     FROM VENTA v
     WHERE v.id_producto = p.id_producto) AS total_vendido
FROM PRODUCTO p;

-- Productos cuyo ingreso total por ventas supera 20000 (subconsulta en el FROM)
SELECT producto, ingreso_total
FROM (
    SELECT p.nombre AS producto,
           SUM(v.cantidad * v.precio_venta) AS ingreso_total
    FROM VENTA v
    INNER JOIN PRODUCTO p ON v.id_producto = p.id_producto
    GROUP BY p.nombre
) AS ventas_por_producto
WHERE ingreso_total > 20000;

-- Clientes que compraron el producto mas caro del catalogo
SELECT DISTINCT c.nombre AS cliente
FROM CLIENTE c
INNER JOIN VENTA v ON c.id_cliente = v.id_cliente
WHERE v.id_producto = (
    SELECT id_producto
    FROM PRODUCTO
    ORDER BY precio_venta DESC
    LIMIT 1
);

-- sub consultas left join
SELECT
    i.nombre AS insumo,
    alertas.mensaje AS alerta_pendiente
FROM INSUMO i
LEFT JOIN (
    SELECT id_insumo, mensaje
    FROM ALERTA
    WHERE estado = 'Pendiente'
) AS alertas
    ON i.id_insumo = alertas.id_insumo;

SELECT
    p.nombre AS producto,
    c.nombre_categoria AS categoria,
    COALESCE(resumen.total_vendido, 0) AS total_vendido
FROM PRODUCTO p
LEFT JOIN CATEGORIA c
    ON p.id_categoria = c.id_categoria
LEFT JOIN (
    SELECT id_producto, SUM(cantidad) AS total_vendido
    FROM VENTA
    GROUP BY id_producto
) AS resumen
    ON p.id_producto = resumen.id_producto;
    
    
SELECT
    c.nombre AS cliente,
    COALESCE(resumen.total_gastado, 0) AS total_gastado
FROM CLIENTE c
LEFT JOIN (
    SELECT id_cliente, SUM(cantidad * precio_venta) AS total_gastado
    FROM VENTA
    GROUP BY id_cliente
) AS resumen
    ON c.id_cliente = resumen.id_cliente;




