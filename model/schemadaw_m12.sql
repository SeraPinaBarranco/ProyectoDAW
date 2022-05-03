-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-05-2022 a las 19:55:35
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `schemadaw_m12`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `totalesProductos` (IN `r` INT, IN `p` INT)  BEGIN
	
    set @calorias:= (select calorias from productos where productos.id_producto = p);
    set @grasas:= (select grasas from productos where productos.id_producto = p);
    set @hidratos:= (select hidratos from productos where productos.id_producto = p);
    set @proteinas:= (select proteinas from productos where productos.id_producto = p);
    
	update recetas_productos 
		set recetas_productos.total_calorias = @calorias * recetas_productos.cantidad
		, recetas_productos.total_grasas = @grasas * recetas_productos.cantidad
		, recetas_productos.total_hidratos = @hidratos * recetas_productos.cantidad
		, recetas_productos.total_proteinas = @proteinas * recetas_productos.cantidad
    where recetas_productos.id_r = r and recetas_productos.id_p = p ;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritas`
--

CREATE TABLE `favoritas` (
  `id_favorita` int(11) NOT NULL,
  `id_usu` int(11) NOT NULL,
  `id_rec` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `favoritas`
--

INSERT INTO `favoritas` (`id_favorita`, `id_usu`, `id_rec`) VALUES
(1, 23, 133),
(13, 23, 137),
(14, 24, 133),
(17, 24, 138),
(18, 23, 139);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetivos`
--

CREATE TABLE `objetivos` (
  `id_objetivo` int(11) NOT NULL,
  `id_usu` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `objCal` float NOT NULL,
  `objGra` float NOT NULL,
  `objHid` float NOT NULL,
  `objPro` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `objetivos`
--

INSERT INTO `objetivos` (`id_objetivo`, `id_usu`, `fecha`, `objCal`, `objGra`, `objHid`, `objPro`) VALUES
(1, 1, '2022-05-02', 22, 33, 55, 66),
(5, 1, '2022-05-03', 233, 2, 3, 44);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre_p` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `calorias` float NOT NULL DEFAULT '0',
  `grasas` float NOT NULL DEFAULT '0',
  `hidratos` float NOT NULL DEFAULT '0',
  `proteinas` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre_p`, `calorias`, `grasas`, `hidratos`, `proteinas`) VALUES
(1, 'ACEDÃAS FRITAS', 256, 16, 17, 12),
(2, 'ACEITE GIRASOL', 899, 100, 0, 0),
(3, 'ACEITE MAIZ', 899, 100, 0, 0),
(4, 'ACEITE OLIVA', 899, 100, 0, 0),
(5, 'ACEITE SODA', 899, 100, 0, 0),
(6, 'ACEITE UVA, PEPITA', 899, 100, 0, 0),
(7, 'ACEITUNAS SALMUERA', 103, 11, 1, 0),
(8, 'ACELGAS', 13, 0, 2, 1),
(9, 'ACEROLAS', 31, 0, 0, 8),
(10, 'AGUA MANANTIAL', 0, 0, 0, 0),
(11, 'AGUACATE', 223, 22, 4, 2),
(12, 'AJO', 137, 0, 6, 28),
(13, 'ALBARICOQUE', 28, 0, 1, 7),
(14, 'ALCACHOFAS', 22, 0, 2, 3),
(15, 'ALMENDRAS', 565, 54, 17, 4),
(16, 'ANCAS RANA, DE', 68, 0, 16, 0),
(17, 'ANCHOAS ENLATADAS', 206, 13, 22, 0),
(18, 'ANGUILA', 168, 11, 17, 0),
(19, 'ANGULAS', 205, 16, 16, 0),
(20, 'ANISETE', 297, 0, 0, 2),
(21, 'APIO', 8, 0, 1, 1),
(22, 'ARENQUE AHUMADO', 205, 11, 26, 0),
(23, 'ARROZ INTEGRAL', 357, 2, 7, 77),
(24, 'Nuez', 12, 434, 434, 55),
(25, 'ARROZ PULIDO, BLANCO', 361, 1, 6, 87),
(26, 'AT?N CONSERVA', 289, 22, 23, 0),
(27, 'AT?N FRESCO', 242, 16, 22, 0),
(28, 'AVELLANAS', 380, 36, 8, 7),
(29, 'AZÃšCAR BLANCA', 394, 0, 0, 100),
(30, 'Garbanzo', 22, 23, 1, 2),
(32, 'BACALAO SALAZ?N', 138, 1, 32, 0),
(33, 'BACÃ“N', 427, 41, 14, 0),
(34, 'BATATA', 91, 0, 1, 22),
(35, 'BATIDO CHOCOLATE', 366, 6, 6, 77),
(36, 'BERBERECHOS COCIDOS', 48, 0, 11, 0),
(37, 'BERENJENAS', 14, 0, 1, 3),
(38, 'BERROS', 14, 0, 3, 1),
(39, 'BIGAROS COCIDOS', 135, 1, 26, 5),
(40, 'BISCOTES TRIGO', 366, 4, 9, 73),
(41, 'BOLLOS-PASTAS MEDIA', 387, 20, 5, 49),
(42, 'BOMBONES MEDIA', 458, 21, 5, 66),
(43, 'BRECA', 74, 1, 15, 1),
(44, 'BRÃ‰COL', 23, 0, 3, 2),
(45, 'BUTIFARRA', 243, 20, 15, 0),
(46, 'CABALLA', 223, 16, 19, 0),
(47, 'CABALLO CARNE', 113, 3, 21, 0),
(48, 'CABRITO CARNE', 161, 8, 20, 0),
(49, 'CACAHUETES TOSTADOS', 570, 49, 24, 9),
(50, 'CACAO POLVO', 357, 24, 20, 11),
(51, 'CAF? EXTRACTO, POLVO', 82, 0, 11, 8),
(52, 'CAF? INFUSI?N', 2, 0, 0, 0),
(53, 'CAF? INSTANT?NEO', 100, 0, 15, 11),
(54, 'CAF? TORREFACTO', 183, 13, 13, 2),
(55, 'CALABAC?N', 16, 0, 1, 4),
(56, 'CALABAZA', 15, 0, 1, 3),
(57, 'CALAMAR', 79, 1, 16, 0),
(58, 'CALLOS V?SCERAS', 60, 2, 9, 0),
(59, 'CAMARONES COCIDOS', 117, 2, 24, 0),
(60, 'CANGREJO COCIDO', 127, 5, 20, 0),
(61, 'CARACOL TERRESTRE', 80, 1, 16, 0),
(62, 'CARDO', 21, 0, 1, 4),
(63, 'CARNE CABALLO', 113, 3, 21, 0),
(64, 'CARNE CABRITO', 161, 8, 20, 0),
(65, 'CARNE CERDO, GRASA', 329, 30, 16, 0),
(66, 'CARNE CERDO, MAGRA', 147, 7, 21, 0),
(67, 'CARNE CONEJO', 124, 4, 22, 0),
(68, 'CARNE CORDERO, CHULETA', 386, 36, 15, 0),
(69, 'CARNE CORDERO, MAGRA', 122, 3, 20, 0),
(70, 'CARNE CORDERO, PALETILLA', 314, 28, 16, 0),
(71, 'CARNE CORDERO, PIERNA', 240, 19, 18, 0),
(72, 'CARNE OVEJA', 235, 17, 18, 0),
(73, 'CARNE TERNERA, MAGRA', 109, 3, 21, 0),
(74, 'CARNE VACA, CHULETA', 290, 25, 16, 0),
(75, 'CARNE VACA, FILETE', 197, 14, 19, 0),
(76, 'CARNE VACA, GUISAR', 176, 11, 20, 0),
(77, 'CARNE VACA, MAGRA', 123, 5, 20, 0),
(78, 'CARNE VACA, SOLOMILLO', 272, 23, 17, 0),
(79, 'CASTA?AS', 170, 3, 2, 37),
(80, 'CAVIAR RUSO', 262, 16, 26, 0),
(81, 'CEBADA', 360, 2, 8, 84),
(82, 'CEBOLLA', 23, 0, 1, 5),
(83, 'CENTOLLO', 127, 5, 20, 0),
(84, 'CEREALES CORNFLAKES', 368, 2, 9, 85),
(85, 'CEREALES MUESLI', 368, 8, 13, 66),
(86, 'CEREALES WEETABIX', 340, 3, 11, 70),
(87, 'CEREZAS', 47, 0, 0, 12),
(88, 'CERVEZA LAGER', 29, 0, 0, 2),
(89, 'CERVEZA NEGRA', 28, 0, 0, 3),
(90, 'CHAMP?N', 84, 0, 0, 3),
(91, 'CHAMPI??N', 13, 1, 2, 0),
(92, 'CHANQUETES', 79, 3, 11, 2),
(93, 'CHEESE, BURGUER ? McDONALD', 307, 14, 15, 30),
(94, 'CHEETOS QUESO, GOLOSINA', 158, 10, 2, 15),
(95, 'CHICHARRO', 127, 7, 16, 1),
(96, 'CHICHARRONES', 540, 51, 20, 1),
(97, 'CHICLE', 310, 0, 0, 95),
(98, 'CHIRIMOYA', 178, 11, 19, 0),
(99, 'COL', 20, 0, 2, 4),
(100, 'COLES BRUSELAS', 26, 0, 4, 3),
(101, 'COLIFLOR', 13, 0, 2, 2),
(102, 'CONEJO', 124, 4, 22, 0),
(103, 'CONGUITOS', 153, 9, 5, 13),
(104, 'CORAZ?N CORDERO', 119, 6, 17, 0),
(105, 'CORAZ?N VACUNO', 108, 4, 19, 0),
(106, 'CORDERO CARNE, MAGRA', 122, 3, 20, 0),
(107, 'CORDERO PALETILLA', 314, 28, 16, 0),
(108, 'CORDERO PIERNA', 240, 19, 18, 0),
(109, 'CORNFLAKES', 368, 2, 9, 85),
(110, 'CO?AC', 232, 0, 0, 0),
(111, 'CREMA CHAMPI??N, DE', 62, 4, 1, 5),
(112, 'CREMA LECHE, CHANTILLY', 331, 31, 2, 10),
(113, 'CREMA LECHE, PASTERIZADA                    ', 316, 33, 2, 2),
(114, 'CREMA PASTELERA', 168, 6, 6, 24),
(115, 'CROISSANT', 47, 2, 40, 6),
(116, 'CRUNCH CHOCOLATE ,NESTLE', 160, 8, 2, 19),
(117, 'CUAJADA', 90, 5, 5, 6),
(118, 'CUBITOS SOPA', 154, 3, 23, 8),
(119, 'D?TILES SECOS, DESHUESADOS', 248, 0, 2, 64),
(120, 'DIET-COKE', 1, 0, 0, 0),
(121, 'EMPERADOR', 127, 4, 19, 0),
(122, 'ENDIBIAS', 11, 0, 2, 1),
(123, 'ESP?RRAGOS COCIDOS', 18, 0, 3, 1),
(124, 'ESP?RRAGOS ENLATADOS', 14, 0, 2, 1),
(125, 'ESPINACAS', 15, 0, 2, 1),
(126, 'ESPINACAS COCIDAS', 30, 0, 5, 1),
(127, 'EXTRACTO CARNE', 174, 1, 38, 3),
(128, 'FAIS?N', 160, 6, 24, 0),
(129, 'FANECA', 74, 1, 15, 1),
(130, 'FILETE VACA', 197, 14, 19, 0),
(131, 'FLAN HUEVO, DE', 132, 2, 5, 22),
(132, 'FOIE- GRAS', 462, 46, 14, 0),
(133, 'FRAMBUESAS', 25, 0, 1, 6),
(134, 'FRESAS', 26, 0, 1, 6),
(135, 'GALLETAS MANTEQUILLA', 435, 11, 8, 75),
(136, 'GALLETAS MEDIA', 436, 14, 7, 74),
(137, 'GALLETAS SALADAS', 448, 12, 9, 76),
(138, 'GALLO', 81, 1, 17, 0),
(139, 'GAMBAS COCIDAS', 107, 2, 23, 0),
(140, 'GARBANZOS', 314, 3, 20, 49),
(141, 'GATORADE', 39, 0, 0, 10),
(142, 'GERMEN TRIGO', 301, 9, 27, 24),
(143, 'GINEBRA', 222, 0, 0, 0),
(144, 'GOFIO MILLO', 377, 5, 6, 83),
(145, 'GOFIO TRIGO', 371, 2, 11, 82),
(146, 'GRANADA', 75, 1, 1, 17),
(147, 'GRELOS', 11, 0, 3, 0),
(148, 'GUISANTES ENLATADOS', 54, 0, 4, 9),
(149, 'GUISANTES FRESCOS', 67, 0, 6, 11),
(150, 'HAMBURGUESA BURGER- KING', 290, 13, 15, 29),
(151, 'HAMBURGUESAS VACUNO', 265, 20, 15, 5),
(152, 'HARINA AVENA', 401, 9, 12, 73),
(153, 'HARINA CENTENO', 303, 1, 7, 68),
(154, 'HARINA MAIZ', 354, 1, 0, 92),
(155, 'HARINA SOJA', 447, 24, 37, 24),
(156, 'HARINA TRIGO, INTEGRAL', 318, 2, 13, 66),
(157, 'HARINA TRIGO, PANIFICADA', 337, 1, 11, 75),
(158, 'HELADO', 209, 12, 4, 21),
(159, 'HELADO FRUTA', 140, 2, 2, 29),
(160, 'H?GADO CERDO', 154, 7, 21, 2),
(161, 'H?GADO POLLO', 135, 6, 19, 1),
(162, 'H?GADO TERNERA', 153, 7, 20, 2),
(163, 'HIGOS SECOS', 213, 0, 4, 53),
(164, 'HIGOS VERDES', 41, 0, 1, 10),
(165, 'HUEVO', 147, 11, 12, 1),
(166, 'HUEVO DURO', 153, 11, 12, 1),
(167, 'HUEVO YEMA, LIQUIDA', 377, 32, 16, 0),
(168, 'JAM?N COCIDO', 352, 29, 22, 1),
(169, 'JAM?N SERRANO', 185, 7, 31, 0),
(170, 'JEREZ SECO', 116, 0, 0, 1),
(171, 'JUD?AS BLANCAS, SECAS', 271, 2, 21, 46),
(172, 'JUD?AS-VERDES FRESCAS', 7, 0, 2, 5),
(173, 'JUREL', 127, 7, 16, 1),
(174, 'KETCHUP', 98, 0, 2, 24),
(175, 'KIWI', 52, 1, 1, 11),
(176, 'LANGOSTA COCIDA', 119, 3, 22, 0),
(177, 'LECHE CABRA', 66, 4, 3, 5),
(178, 'LECHE DESNATADA, POLVO', 374, 1, 35, 53),
(179, 'LECHE ENTERA, POLVO', 500, 26, 25, 37),
(180, 'LECHE DE MUJER', 69, 4, 1, 7),
(181, 'LECHE DE VACA', 36, 0, 4, 5),
(182, 'LECHE VACA, ENTERA', 60, 3, 3, 5),
(183, 'LECHE VACA, EST?RIL', 60, 3, 3, 5),
(184, 'LECHE VACA, SEMIDESNATADA', 49, 2, 3, 5),
(185, 'LECHE VACA, U.H.T.', 60, 3, 3, 5),
(186, 'LECHE, CONDENSADA AZUCARADA', 325, 9, 8, 52),
(187, 'LECHE, CONDENSADA M.G. 7,50 %', 137, 8, 6, 10),
(188, 'LECHUGA', 12, 0, 1, 1),
(189, 'LENGUADO', 81, 1, 17, 0),
(190, 'LENTEJAS', 304, 1, 24, 53),
(191, 'LEVADURA CERVEZA, SECA', 219, 4, 48, 0),
(192, 'LIM?N', 15, 0, 1, 3),
(193, 'LIMONADA ENVASADA', 21, 0, 0, 6),
(194, 'LOMBARDA', 21, 0, 2, 4),
(195, 'LOMO, CERDO EMBUCHADO', 386, 21, 50, 0),
(196, 'MACARRONES', 370, 2, 14, 79),
(197, 'MAGDALENA', 397, 23, 6, 42),
(198, 'MA?Z, DULCE MAZORCA', 123, 2, 4, 23),
(199, 'MANDARINAS', 34, 0, 1, 8),
(200, 'MANHATTAN COCKTAIL', 164, 0, 0, 8),
(201, 'MANTECA CERDO', 891, 99, 0, 0),
(202, 'MANTEQUILLA', 740, 82, 0, 0),
(203, 'MANZANA', 46, 0, 0, 12),
(204, 'MARGARINA INDUSTRIAL', 746, 80, 0, 0),
(205, 'MARGARINA VEGETAL', 746, 80, 0, 0),
(206, 'MARTINI', 140, 0, 0, 0),
(207, 'MAYONESA', 718, 79, 2, 0),
(208, 'MAZAP?N', 443, 25, 9, 49),
(209, 'MEJILLONES', 66, 2, 12, 0),
(210, 'MELOCOT?N', 37, 0, 1, 9),
(211, 'MEL?N', 24, 0, 1, 5),
(212, 'MEMBRILLO', 236, 0, 0, 59),
(213, 'MERLUZA', 46, 0, 0, 11),
(214, 'NUECES', 525, 52, 11, 5),
(215, 'NUEZ BRASIL', 617, 62, 12, 4),
(216, 'OSTRAS', 70, 1, 9, 5),
(217, 'PALMITOS ENLATADOS', 45, 0, 3, 8),
(218, 'PALOMA', 106, 2, 22, 0),
(219, 'PALOMITAS MAIZ', 54, 1, 2, 11),
(220, 'PAN BLANCO', 233, 2, 8, 50),
(221, 'PAN CON CHOCOLATE', 419, 21, 7, 51),
(222, 'PAN INTEGRAL', 216, 3, 9, 42),
(223, 'PAN TOSTADO, BLANCO', 297, 2, 10, 65),
(224, 'PASTA', 373, 2, 13, 82),
(225, 'PASTAS AL HUEVO', 378, 1, 14, 84),
(226, 'PATATAS', 533, 36, 6, 49),
(228, 'PATATAS CRUDAS', 87, 0, 2, 21),
(229, 'PATATAS FRITAS', 253, 11, 4, 37),
(230, 'PATO', 326, 29, 16, 0),
(231, 'PAVO', 107, 2, 22, 0),
(232, 'PEPINO', 10, 0, 1, 2),
(233, 'PERAS', 41, 0, 0, 11),
(234, 'PERCEBES', 59, 0, 14, 0),
(235, 'PERDIZ', 106, 2, 23, 0),
(236, 'PEREJIL', 21, 0, 5, 0),
(237, 'PERRITO-CALIENTE CON MOSTAZA', 308, 14, 11, 33),
(238, 'PESCADILLA', 92, 0, 21, 0),
(239, 'PETIT-SUISSE QUESO, TIPO', 173, 14, 8, 4),
(240, 'PICH?N', 182, 10, 21, 0),
(241, 'PIMIENTO', 15, 0, 1, 2),
(242, 'PIPAS GIRASOL', 597, 50, 22, 14),
(243, 'PISTACHOS', 602, 52, 21, 13),
(244, 'PIZZA QUESO, TOMATE', 234, 12, 9, 25),
(245, 'PI?A', 46, 0, 0, 12),
(246, 'PI?A ALMIBAR, EN', 83, 0, 0, 20),
(247, 'PL?TANO', 79, 0, 1, 19),
(248, 'POLLO', 121, 4, 20, 0),
(249, 'POLLO, FRITO KENTUCKY', 155, 9, 13, 5),
(250, 'POLLO, PECHUGAS KENTUCKY', 436, 22, 25, 34),
(251, 'POMELO', 22, 0, 0, 5),
(252, 'PUERRO', 31, 0, 2, 6),
(253, 'PULPO', 57, 1, 11, 2),
(254, 'QUESO AZUL', 355, 29, 23, 0),
(255, 'QUESO BABIBEL, TIPO', 314, 25, 23, 0),
(256, 'QUESO BRIE', 361, 28, 23, 1),
(257, 'QUESO BURGOS', 167, 11, 11, 3),
(258, 'QUESO CABRA', 250, 18, 17, 2),
(259, 'QUESO CAMEMBERT', 300, 23, 23, 0),
(260, 'QUESO CHEDAR', 406, 34, 26, 0),
(261, 'QUESO EMMENTAL', 377, 29, 29, 0),
(262, 'QUESO GOUDA', 346, 27, 25, 0),
(263, 'QUESO GRUYERE', 406, 34, 26, 0),
(264, 'QUESO MOZZARELLA', 236, 16, 20, 0),
(265, 'QUESO PARMESANO', 408, 30, 35, 0),
(266, 'QUESO PIRINEOS', 355, 30, 22, 0),
(267, 'QUESO PORCIONES', 283, 23, 18, 1),
(268, 'QUESO QUARK', 167, 11, 11, 3),
(269, 'QUESO ROQUEFORT', 355, 29, 23, 0),
(270, 'QUESO, BLANCO DESNATADO', 68, 2, 10, 3),
(271, 'QUESO, FRESCO MG. 20 %', 79, 3, 8, 4),
(272, 'QUESO, MANCHEGO CURADO', 420, 32, 32, 1),
(273, 'QUESO, MANCHEGO FRESCO', 333, 25, 26, 0),
(274, 'QUESO, MANCHEGO SEMICURADO', 390, 29, 29, 0),
(275, 'QUICHE LORRAINE BAC?N-QUESO', 391, 28, 15, 21),
(276, 'R?BANO', 15, 0, 1, 3),
(277, 'RABO VACUNO', 171, 10, 20, 0),
(278, 'RAVIOLIS TOMATE, SALSA', 106, 4, 5, 13),
(279, 'REFRESCO LIGTH', 1, 0, 0, 0),
(280, 'REMOLACHA COCIDA', 44, 0, 2, 10),
(281, 'REPOLLO', 29, 0, 3, 3),
(282, 'REQUES?N', 102, 5, 12, 0),
(283, 'RI??N CORDERO', 90, 3, 16, 0),
(284, 'RI??N VACUNO', 86, 3, 16, 0),
(285, 'RODABALLO', 102, 4, 16, 1),
(286, 'RON', 222, 0, 0, 0),
(287, 'SAL', 0, 0, 0, 0),
(288, 'SALAMI', 491, 45, 19, 2),
(289, 'SALCHICHAS CERDO', 367, 32, 11, 10),
(290, 'SALCHICHAS ENLATADAS', 243, 20, 13, 0),
(291, 'SALCHICHAS FRANCFORT', 274, 25, 10, 3),
(292, 'SALCHICH?N', 454, 38, 26, 2),
(293, 'SALM?N', 182, 12, 18, 0),
(294, 'SALMONETE', 97, 4, 14, 2),
(295, 'SALSA BOLO?ESA', 139, 11, 8, 2),
(296, 'SALSA KETCHUP', 98, 0, 2, 24),
(297, 'SALSA QUESO', 198, 15, 8, 9),
(298, 'SALVADO TRIGO', 206, 6, 14, 27),
(299, 'SANDIA', 37, 0, 1, 8),
(300, 'SANGRE VACUNO', 81, 1, 18, 0),
(301, 'SARDINAS', 135, 5, 19, 0),
(302, 'SARDINAS EN ACEITE', 217, 14, 24, 0),
(303, 'SARDINAS CON TOMATE, LATA', 177, 12, 18, 0),
(304, 'SEPIA', 79, 1, 16, 0),
(305, 'S?SAMO', 566, 50, 19, 10),
(306, 'SESOS CERDO', 132, 9, 11, 0),
(307, 'SESOS CORDERO', 110, 8, 10, 0),
(308, 'SESOS TERNERA', 110, 8, 10, 0),
(309, 'SETAS BOLETUS, EDULIS', 16, 0, 3, 0),
(310, 'SETAS CANTHARELLUS', 11, 0, 2, 0),
(311, 'SETAS COLMENILLA', 9, 0, 2, 0),
(312, 'SEVEN-UP', 144, 0, 0, 36),
(313, 'SIDRA', 36, 0, 0, 3),
(314, 'SOJA BROTES', 9, 0, 2, 1),
(315, 'SOPA DE CEBOLLA', 54, 4, 2, 2),
(316, 'SOPA MINESTRONE', 35, 1, 2, 5),
(317, 'SPEISEQUARK TIPO QUESO', 101, 5, 10, 3),
(318, 'TAPIOCA', 359, 0, 0, 95),
(319, 'TARTA MANZANA CASERA', 282, 12, 2, 43),
(320, 'TE INFUSI?N', 0, 0, 0, 0),
(321, 'TOCINO', 427, 41, 14, 0),
(322, 'TOMATE', 14, 0, 0, 3),
(323, 'TOMATE FRITO', 69, 6, 1, 3),
(324, 'T?NICA AGUA', 42, 0, 0, 10),
(325, 'TRUCHA', 89, 3, 16, 0),
(326, 'TRUFAS', 25, 0, 6, 0),
(327, 'TURR?N MEDIA', 470, 24, 10, 57),
(328, 'UVAS', 61, 0, 0, 16),
(329, 'UVAS PASAS', 243, 0, 2, 63),
(330, 'VERMOUTH SECO', 118, 0, 0, 6),
(331, 'VIEIRAS', 70, 0, 16, 0),
(332, 'VINAGRE DE VINO', 4, 0, 0, 1),
(333, 'VINO BLANCO', 75, 0, 0, 3),
(334, 'VINO OPORTO', 157, 0, 0, 12),
(335, 'VINO ROSADO', 71, 0, 0, 2),
(336, 'VINOTINTO', 68, 0, 0, 0),
(337, 'WEETABIX CEREALES', 340, 3, 11, 70),
(338, 'WHISKY', 222, 0, 0, 0),
(339, 'WHOPPER, HAMBURGUESA BURGER- KING', 630, 36, 26, 50),
(340, 'WHOPPER,  QUESO BURGER- KING', 740, 45, 32, 52),
(341, 'YEMA HUEVO LIQUIDA', 377, 32, 16, 0),
(342, 'YOGUR DESNATADO', 52, 1, 5, 6),
(343, 'YOGUR FRUTAS', 102, 2, 4, 19),
(344, 'YOGUR LIQUIDO', 78, 2, 3, 11),
(345, 'YOGUR CON NATA', 60, 4, 4, 4),
(346, 'YOGUR NATURAL', 75, 4, 5, 6),
(347, 'YOGUR SABORES', 88, 2, 4, 14),
(348, 'YOGUR, FRUTAS SEMIDESNATADO', 95, 1, 5, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas`
--

CREATE TABLE `recetas` (
  `id_recetas` int(11) NOT NULL,
  `nombre_receta` varchar(45) COLLATE utf8_spanish2_ci NOT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `recetas`
--

INSERT INTO `recetas` (`id_recetas`, `nombre_receta`, `fecha_creacion`, `id_usuario`) VALUES
(133, 'eee', NULL, 1),
(137, 'Arroz Rebe', NULL, 24),
(138, 'Pure', NULL, 23),
(139, 'Risotto R', NULL, 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas_productos`
--

CREATE TABLE `recetas_productos` (
  `id_p` int(11) DEFAULT NULL,
  `id_r` int(11) DEFAULT NULL,
  `cantidad` float DEFAULT NULL,
  `total_calorias` float DEFAULT NULL,
  `total_grasas` float DEFAULT NULL,
  `total_hidratos` float DEFAULT NULL,
  `total_proteinas` float DEFAULT NULL,
  `id_detalle` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `recetas_productos`
--

INSERT INTO `recetas_productos` (`id_p`, `id_r`, `cantidad`, `total_calorias`, `total_grasas`, `total_hidratos`, `total_proteinas`, `id_detalle`) VALUES
(12, 137, 50, 6850, 0, 300, 1400, 1),
(25, 137, 12, 4332, 12, 72, 1044, 2),
(21, 138, 123, 984, 0, 123, 123, 3),
(56, 138, 34, 510, 0, 34, 102, 4),
(265, 139, 50, 20400, 1500, 1750, 0, 5),
(309, 139, 200, 3200, 0, 600, 0, 6),
(23, 139, 123, 43911, 246, 861, 9471, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sumaobjetivos`
--

CREATE TABLE `sumaobjetivos` (
  `id_obj_detalle` int(11) NOT NULL,
  `ib_obj` int(11) NOT NULL,
  `id_usu` int(11) NOT NULL,
  `sumaCal` float NOT NULL,
  `sumaGra` float NOT NULL,
  `sumaHid` float NOT NULL,
  `sumaPro` float NOT NULL,
  `receta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `sumaobjetivos`
--

INSERT INTO `sumaobjetivos` (`id_obj_detalle`, `ib_obj`, `id_usu`, `sumaCal`, `sumaGra`, `sumaHid`, `sumaPro`, `receta`) VALUES
(1, 1, 1, 2000, 1233, 33, 444, 137),
(2, 1, 1, 3, 44, 66, 90, 138);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuarios` int(11) NOT NULL,
  `tipo_usuario` int(11) NOT NULL,
  `nombre` varchar(25) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `apellidos` varchar(25) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `nick` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `pass` varchar(70) COLLATE utf8_spanish2_ci NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `peso` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuarios`, `tipo_usuario`, `nombre`, `apellidos`, `nick`, `email`, `pass`, `fecha_nacimiento`, `peso`) VALUES
(1, 0, 'Paco', 'Perez', '', '', '', NULL, 68),
(23, 3, 'sera', 'piÃ±a', 'sera', 'sera@ww.com', '$2y$10$pqrl3pXvSiuJaWkbHmX6OO8wOGAsog4JvUXIu.vdKB4kmISeHAt9.', NULL, NULL),
(24, 3, 'Rebeca', 'Cespo Gayoso', 'rebe', 'rebe@eee.com', '$2y$10$33fRPn.ZA36qv/MwbR3.6OSi.cI9F03Y4OL1175qKld9aeKw0HeyG', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `favoritas`
--
ALTER TABLE `favoritas`
  ADD PRIMARY KEY (`id_favorita`),
  ADD KEY `fk_favoritos_usuarios` (`id_usu`),
  ADD KEY `fk_favoritos_recetas` (`id_rec`);

--
-- Indices de la tabla `objetivos`
--
ALTER TABLE `objetivos`
  ADD PRIMARY KEY (`id_objetivo`),
  ADD UNIQUE KEY `fecha` (`fecha`),
  ADD KEY `fk_obj_usuarios` (`id_usu`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD UNIQUE KEY `nombre_p` (`nombre_p`);

--
-- Indices de la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD UNIQUE KEY `id_recetas_UNIQUE` (`id_recetas`),
  ADD UNIQUE KEY `id_recetas` (`id_recetas`),
  ADD UNIQUE KEY `nombre_receta` (`nombre_receta`),
  ADD KEY `fk_usuario_receta` (`id_usuario`);

--
-- Indices de la tabla `recetas_productos`
--
ALTER TABLE `recetas_productos`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `fk_productos_detalle` (`id_p`),
  ADD KEY `fk_recetas_detalle` (`id_r`);

--
-- Indices de la tabla `sumaobjetivos`
--
ALTER TABLE `sumaobjetivos`
  ADD PRIMARY KEY (`id_obj_detalle`),
  ADD KEY `fk_objetivos_usuario` (`id_usu`),
  ADD KEY `fk_sumaObj_Obj` (`ib_obj`),
  ADD KEY `fk_sumaObj_recetas` (`receta`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuarios`),
  ADD UNIQUE KEY `nick` (`nick`),
  ADD UNIQUE KEY `pass` (`pass`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `favoritas`
--
ALTER TABLE `favoritas`
  MODIFY `id_favorita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `objetivos`
--
ALTER TABLE `objetivos`
  MODIFY `id_objetivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=349;

--
-- AUTO_INCREMENT de la tabla `recetas`
--
ALTER TABLE `recetas`
  MODIFY `id_recetas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT de la tabla `recetas_productos`
--
ALTER TABLE `recetas_productos`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `sumaobjetivos`
--
ALTER TABLE `sumaobjetivos`
  MODIFY `id_obj_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `favoritas`
--
ALTER TABLE `favoritas`
  ADD CONSTRAINT `fk_favoritos_recetas` FOREIGN KEY (`id_rec`) REFERENCES `recetas` (`id_recetas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_favoritos_usuarios` FOREIGN KEY (`id_usu`) REFERENCES `usuarios` (`id_usuarios`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `objetivos`
--
ALTER TABLE `objetivos`
  ADD CONSTRAINT `fk_obj_usuarios` FOREIGN KEY (`id_usu`) REFERENCES `usuarios` (`id_usuarios`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `fk_usuario_receta` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuarios`);

--
-- Filtros para la tabla `recetas_productos`
--
ALTER TABLE `recetas_productos`
  ADD CONSTRAINT `fk_productos_detalle` FOREIGN KEY (`id_p`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_recetas_detalle` FOREIGN KEY (`id_r`) REFERENCES `recetas` (`id_recetas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sumaobjetivos`
--
ALTER TABLE `sumaobjetivos`
  ADD CONSTRAINT `fk_objetivos_usuario` FOREIGN KEY (`id_usu`) REFERENCES `objetivos` (`id_usu`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sumaObj_Obj` FOREIGN KEY (`ib_obj`) REFERENCES `objetivos` (`id_objetivo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sumaObj_recetas` FOREIGN KEY (`receta`) REFERENCES `recetas` (`id_recetas`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
