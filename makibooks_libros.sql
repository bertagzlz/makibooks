-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-06-2023 a las 17:44:11
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `makibooks`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id` int(8) NOT NULL,
  `isbn` bigint(20) NOT NULL,
  `autor` varchar(50) NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id`, `isbn`, `autor`, `titulo`, `categoria`, `descripcion`, `imagen`) VALUES
(36, 9748412765434, 'Isabella Thompson', 'Cocina saludable modif título', 'Libros de texto', 'Un libro de recetas y consejos para una alimentación saludable y equilibrada.', '/imgs/libros/libro1.jpg'),
(37, 9781432103458, 'Oliver Davis', 'Inglés para negocios', 'Libros de texto', 'Un libro de aprendizaje de inglés enfocado en habilidades empresariales y comunicación en el entorno laboral.', '/imgs/libros/libro2.jpg'),
(38, 9782490923457, 'Sophia Brown', 'Marketing digital', 'Libros de texto', 'Un libro que proporciona una guía paso a paso sobre estrategias y herramientas de marketing digital, con casos de estudio y ejemplos prácticos.', '/imgs/libros/libro3.jpg'),
(39, 9786432198762, 'William Harris', 'Estadística aplicada', 'Libros de texto', 'Un libro que introduce los conceptos básicos de la estadística y su aplicación en diferentes campos profesionales.', '/imgs/libros/libro4.jpg'),
(40, 9786465209348, 'Emma Johnson', 'Física para ingenieros', 'Libros de texto', 'Un libro de texto diseñado para estudiantes de ingeniería que cubre los fundamentos de la física y su aplicación en problemas prácticos.', '/imgs/libros/libro5.jpg'),
(41, 9788332123457, 'David Anderson', 'Manual de diseño gráfico', 'Libros de texto', 'Un recurso completo que explora los principios y técnicas del diseño gráfico, con ejemplos y ejercicios para mejorar las habilidades.', '/imgs/libros/libro6.jpg'),
(42, 9788410987601, 'Gabriel García Márquez', 'Cien años de soledad', 'Literatura', 'Una obra maestra de Gabriel García Márquez que narra la historia de la familia Buendía a lo largo de varias generaciones.', '/imgs/libros/libro7.jpg'),
(43, 9788410987654, 'Jane Doe', 'Dibujo a lápiz', 'Arte e ilustración', 'Una guía práctica para aprender a dibujar utilizando lápices.', '/imgs/libros/libro8.jpg'),
(44, 9788412309876, 'María Rodríguez', 'El universo en imágenes', 'Divulgación', 'Un libro con fotografías impresionantes del universo acompañadas de explicaciones científicas.', '/imgs/libros/libro9.jpg'),
(45, 9788412309877, 'John Smith', 'Programación en Python', 'Libros de texto', 'Un libro que ofrece una introducción completa a la programación en Python, con ejemplos y ejercicios prácticos.', '/imgs/libros/libro10.jpg'),
(46, 9788412765432, 'Daniel Martínez', 'Diccionario de sinónimos', 'Consulta y referencia', 'Un diccionario de sinónimos y antónimos para ampliar el vocabulario.', '/imgs/libros/libro11.jpg'),
(47, 9788412765433, 'Lewis Carroll', 'Alicia en el país de las maravillas', 'Infantil', 'La famosa obra de Lewis Carroll que sumerge a los lectores en un mundo imaginativo y lleno de personajes peculiares.', '/imgs/libros/libro12.jpg'),
(48, 9788412765434, 'Rudyard Kipling', 'El libro de la selva', 'Infantil', 'Una colección de historias clásicas escritas por Rudyard Kipling que siguen las aventuras de Mowgli y otros personajes en la selva.', '/imgs/libros/libro13.jpg'),
(49, 9788412987654, 'Alan Sanders', 'El misterio de los dinosaurios', 'Divulgación', 'Un viaje al pasado para descubrir la fascinante historia de los dinosaurios y su extinción.', '/imgs/libros/libro14.jpg'),
(50, 9788432103456, 'Laura González', 'Enciclopedia de historia', 'Consulta y referencia', 'Una enciclopedia exhaustiva que abarca diferentes períodos y eventos históricos.', '/imgs/libros/libro15.jpg'),
(51, 9788432103457, 'Antoine de Saint-Exupéry', 'El principito', 'Infantil', 'Un libro tierno y filosófico escrito por Antoine de Saint-Exupéry, que narra las aventuras de un pequeño príncipe en diferentes planetas.', '/imgs/libros/libro16.jpg'),
(52, 9788432123456, 'Carlos Fernández', 'La historia de la ciencia', 'Divulgación', 'Un recorrido por los hitos y descubrimientos más importantes en la historia de la ciencia.', '/imgs/libros/libro17.jpg'),
(53, 9788432156780, 'E.B. White', 'La telaraña de Carlota', 'Infantil', 'Una encantadora novela de E.B. White que narra la amistad entre una niña y una araña y cómo trabajan juntas para salvar a un cerdito.', '/imgs/libros/libro18.jpg'),
(54, 9788432156789, 'Ana Sánchez', 'Guía de gramática', 'Consulta y referencia', 'Un libro de referencia que aclara las reglas gramaticales y ofrece ejemplos prácticos.', '/imgs/libros/libro19.jpg'),
(55, 9788432198701, 'Miguel de Cervantes', 'Don Quijote de la Mancha', 'Literatura', 'La obra clásica de Miguel de Cervantes que sigue las aventuras del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza.', '/imgs/libros/libro20.jpg'),
(56, 9788432198756, 'F. Scott Fitzgerald', 'El gran Gatsby', 'Literatura', 'La icónica novela de F. Scott Fitzgerald que retrata la vida y los excesos de la alta sociedad en la década de 1920.', '/imgs/libros/libro21.jpg'),
(57, 9788432198765, 'Michael Johnson', 'Fotografía creativa', 'Arte e ilustración', 'Un libro que ofrece consejos y técnicas para tomar fotografías creativas y artísticas.', '/imgs/libros/libro22.jpg'),
(58, 9788465123401, 'George Orwell', '1984', 'Literatura', 'La famosa novela distópica de George Orwell que describe un futuro totalitario y vigilado.', '/imgs/libros/libro23.jpg'),
(59, 9788465123456, 'Robert Davis', 'Escultura en arcilla', 'Arte e ilustración', 'Un libro que muestra cómo crear esculturas utilizando arcilla y técnicas de modelado.', '/imgs/libros/libro24.jpg'),
(60, 9788465123457, 'Fyodor Dostoyevsky', 'Crimen y castigo', 'Literatura', 'La famosa novela de Fyodor Dostoyevsky que sigue la historia de Raskólnikov, un estudiante que comete un crimen y enfrenta las consecuencias morales.', '/imgs/libros/libro25.jpg'),
(61, 9788465209347, 'Pedro Gómez', 'El cuerpo humano al descubierto', 'Divulgación', 'Una exploración detallada del cuerpo humano y su funcionamiento.', '/imgs/libros/libro26.jpg'),
(62, 9788467832108, 'J.K. Rowling', 'Harry Potter y la piedra filosofal', 'Infantil', 'El primer libro de la popular serie de J.K. Rowling, que cuenta la historia de Harry Potter y su entrada al mundo de la magia.', '/imgs/libros/libro27.jpg'),
(63, 9788467832109, 'Sara López', 'Atlas geográfico', 'Consulta y referencia', 'Un atlas detallado que muestra mapas y datos geográficos de todo el mundo.', '/imgs/libros/libro28.jpg'),
(64, 9788467856345, 'John Smith', 'Pintura al óleo', 'Arte e ilustración', 'Un libro que explora técnicas y consejos para pintar al óleo.', '/imgs/libros/libro29.jpg'),
(65, 9788490923456, 'Laura Sánchez', 'El cambio climático explicado', 'Divulgación', 'Un libro que aborda el tema del cambio climático y sus impactos, presentando datos científicos y soluciones.', '/imgs/libros/libro30.jpg'),
(66, 9788490987657, 'Carlos Rodríguez', 'Manual de medicina', 'Consulta y referencia', 'Un manual de referencia médica que cubre diferentes enfermedades, síntomas y tratamientos.', '/imgs/libros/libro31.jpg'),
(67, 9788490987658, 'Roald Dahl', 'El principito', 'Infantil', 'Una historia mágica sobre la amistad y la valentía escrita por Roald Dahl.', '/imgs/libros/libro32.jpg'),
(68, 9788495678901, 'Emily Thompson', 'Ilustración digital', 'Arte e ilustración', 'Una introducción al arte de la ilustración digital con herramientas y técnicas recomendadas.', '/imgs/libros/libro33.jpg'),
(69, 9788495678902, 'Jane Austen', 'Orgullo y prejuicio', 'Literatura', 'La novela romántica de Jane Austen que explora las relaciones sociales y los prejuicios en la sociedad inglesa del siglo XIX.', '/imgs/libros/libro34.jpg'),
(70, 9748412765439, 'jrp', 'estadistica para todos', 'cientifica', '....', './imgs/libros/estadistica.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(8) NOT NULL,
  `id_usuario` int(8) NOT NULL,
  `tiempo` int(3) NOT NULL,
  `id_libro` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `apellidos` varchar(40) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `biblioteca` tinyint(1) NOT NULL DEFAULT 0,
  `faltas` int(3) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `apellidos`, `email`, `password`, `telefono`, `biblioteca`, `faltas`) VALUES
(7, 'Samuel', 'Robinson', 'samuelrobinson@example.com', 'welcome', '444444444', 1, 0),
(8, 'Emily', 'Anderson', 'emilyanderson@example.com', 'p@ssw0rd', '777777777', 0, 1),
(9, 'David', 'Taylor', 'davidtaylor@example.com', 'secure123', '666666666', 1, 0),
(10, 'Julia', 'Brown', 'juliabrown@example.com', 'julia456', '555555555', 1, 0),
(11, 'Max', 'Johnson', 'maxjohnson@example.com', 'max123', '444444444', 0, 1),
(16, 'Tania-admin', '', 'tania-admin@gmail.com', '$2y$10$8Ey2PwDKWqIZTNhMsnP69eNOvOV3OZPxMjH/Zcm3MYrOCjmk.c6Q6', '0', 1, 0),
(34, 'juan', 'appp', 'juanj@gmail.com', '$2y$10$DRrF/7RRqKz0HchftRper.LNU5lcQtXtpuOMQ61p6YK8PHfdEffCm', NULL, 0, 4),
(35, 'Tania-user', 'usuario normal', 'tania-user@gmail.com', '$2y$10$deIEca/vrVaZjm57TRTJEeD1xG.r9rI0puP7ixzWeOFZSEe1RcIOq', NULL, 0, 0),
(36, 'jose', 'rodenas', 'jrodenaspua@gmail.com', '$2y$10$./pdLBXgEjRpzBxt1Z8e1eT8NA.KeCqJCmMn1iv3e9iUwqhve7ELy', NULL, 0, 0),
(37, 'jose2', 'usuario normal', 'jose2@gmail.com', '$2y$10$yoGYFR0xlliYM/sxS/4RN.Gez.M25aQmCZIHuV0DVoqMcS/608.QO', NULL, 0, 0),
(38, 'jose3', 'usuario normal', 'jose3@gmail.com', '$2y$10$aP84d/oFFhucXbJAwXkMxOcqqlO.9j8lO0qdQOo8QOdqGzRWJZmIi', NULL, 0, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `reservas_FK_2` (`id_usuario`),
  ADD KEY `reservas_libros_id_fk` (`id_libro`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_FK_2` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_libros_id_fk` FOREIGN KEY (`id_libro`) REFERENCES `libros` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
