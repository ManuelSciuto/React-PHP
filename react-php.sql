-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Set 26, 2024 alle 22:33
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react-php`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `body_parts`
--

CREATE TABLE `body_parts` (
  `bd_id` int(11) NOT NULL,
  `bd_name` varchar(100) NOT NULL,
  `bd_description` varchar(10000) NOT NULL,
  `bid_provider` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `color` varchar(20) NOT NULL,
  `vehicle_model` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `body_parts`
--

INSERT INTO `body_parts` (`bd_id`, `bd_name`, `bd_description`, `bid_provider`, `year`, `color`, `vehicle_model`) VALUES
(109, 'Parafango Anteriore', 'Parafango anteriore in plastica resistente.', 17, 2022, 'Nero', 'Honda CRF450R'),
(110, 'Cupolino', 'Cupolino aerodinamico in fibra di carbonio.', 18, 2023, 'Rosso', 'Yamaha YZ450F'),
(111, 'Parafango Posteriore', 'Parafango posteriore in alluminio.', 19, 2022, 'Blu', 'Kawasaki KX450'),
(112, 'Sottocarena', 'Sottocarena robusto per condizioni estreme.', 17, 2021, 'Giallo', 'Suzuki RM-Z450'),
(113, 'Serbatoio', 'Serbatoio carburante ad alta capacità.', 18, 2023, 'Verde', 'Husqvarna FC450'),
(114, 'Carter Motore', 'Carter motore in alluminio rinforzato.', 19, 2022, 'Nero Opaco', 'Beta 480 RR'),
(115, 'Cofano', 'Cofano in plastica leggera.', 17, 2021, 'Bianco', 'KTM 450 SX-F'),
(116, 'Portatarga', 'Portatarga universale in metallo.', 18, 2022, 'Argento', 'Honda CRF250R'),
(117, 'Coprivolano', 'Coprivolano in materiale resistente.', 19, 2023, 'Rosso', 'Yamaha WR450F'),
(118, 'Paraolii', 'Paraolii di alta qualità.', 17, 2021, 'Blu', 'Kawasaki KLX450R'),
(119, 'Sella', 'Sella ergonomica e confortevole.', 18, 2022, 'Grigio', 'Suzuki RMX450Z'),
(120, 'Coprimanubrio', 'Coprimanubrio in materiale resistente.', 19, 2023, 'Nero', 'Husqvarna FE501'),
(121, 'Faro Anteriore', 'Faro anteriore potente e durevole.', 17, 2021, 'Argento', 'Beta 300 RR'),
(122, 'Fanale Posteriore', 'Fanale posteriore ad alta visibilità.', 18, 2022, 'Nero', 'Kawasaki KLR650'),
(123, 'Radiatore', 'Radiatore ad alta efficienza per motori.', 19, 2023, 'Verde', 'Yamaha MT-07'),
(124, 'Scudo Anteriore', 'Scudo anteriore in materiale rinforzato.', 17, 2022, 'Blu', 'Suzuki V-Strom 650'),
(125, 'Coperchio Motore', 'Coperchio motore in metallo robusto.', 18, 2023, 'Nero Opaco', 'KTM 250 SX'),
(126, 'Griglia Radiatore', 'Griglia radiatore resistente alle alte temperature.', 19, 2021, 'Rosso', 'Honda CRF250L'),
(127, 'Carter Frizione', 'Carter frizione rinforzato.', 17, 2022, 'Grigio', 'Husqvarna TE300'),
(128, 'Coprimotore', 'Coprimotore in plastica leggera e resistente.', 18, 2023, 'Nero', 'Beta RR300'),
(129, 'Copertura Laterale', 'Copertura laterale per protezione aggiuntiva.', 19, 2022, 'Blu', 'Kawasaki ZX-10R'),
(130, 'Piastra Inferiore', 'Piastra inferiore per montaggio motore.', 17, 2021, 'Verde', 'Yamaha WR250F'),
(131, 'Parafango', 'Parafango posteriore in plastica alta resistenza.', 18, 2023, 'Giallo', 'Suzuki GSX-R1000'),
(132, 'Sella', 'Sella ergonomica con imbottitura extra.', 19, 2022, 'Nero', 'Kawasaki Z900'),
(133, 'Carter Motore', 'Carter motore con rivestimento anti-corrosione.', 17, 2021, 'Grigio', 'Honda CRF150R'),
(134, 'Parabrezza', 'Parabrezza in plastica resistente agli urti.', 18, 2022, 'Trasparente', 'Yamaha XSR900'),
(135, 'Copriserbatoio', 'Copriserbatoio in plastica rinforzata.', 19, 2023, 'Nero', 'Beta RR250'),
(136, 'Sottocarenatura', 'Sottocarenatura per protezione motore.', 17, 2021, 'Rosso', 'KTM EXC-F 250'),
(137, 'Parafango Anteriore', 'Parafango anteriore in fibra di vetro.', 18, 2022, 'Blu', 'Suzuki GSX-S1000'),
(138, 'Cupolino', 'Cupolino aerodinamico per moto sportive.', 19, 2023, 'Verde', 'Kawasaki Ninja ZX-10R'),
(139, 'Parafango Posteriore', 'Parafango posteriore in metallo.', 17, 2021, 'Grigio', 'Yamaha MT-03'),
(140, 'Carter Motore', 'Carter motore in lega di alluminio.', 18, 2022, 'Nero', 'Suzuki V-Strom 1050'),
(141, 'Sottocarena', 'Sottocarena in plastica resistente.', 19, 2023, 'Rosso', 'Kawasaki Z125 Pro'),
(142, 'Carter Frizione', 'Carter frizione rinforzato con guarnizioni.', 17, 2021, 'Nero', 'Yamaha TTR230'),
(165, 'Parafango Anteriore', 'Parafango anteriore in plastica rinforzata.', 17, 2021, 'Rosso', 'KTM 250 SX'),
(166, 'Serbatoio Carburante', 'Serbatoio carburante in alluminio per moto da enduro.', 18, 2022, 'Blu', 'Yamaha WR250F'),
(167, 'Coda Moto', 'Coda moto con supporto per luci e indicatori.', 19, 2020, 'Nero', 'Honda CRF450R'),
(168, 'Paraurti Posteriore', 'Para indipendente in plastica per protezione posteriore.', 17, 2022, 'Verde', 'Kawasaki KX450F'),
(169, 'Copri Carburatore', 'Copertura del carburatore in plastica resistente al calore.', 18, 2021, 'Arancione', 'Husqvarna TE300'),
(170, 'Fianchetto Laterale', 'Fianchetto laterale in plastica per migliorare l\'aerodinamica.', 19, 2022, 'Giallo', 'Suzuki RM-Z450'),
(171, 'Mascherina Faro', 'Mascherina del faro anteriore con protezione aggiuntiva.', 17, 2021, 'Nero', 'KTM 350 EXC-F'),
(172, 'Cupolino', 'Cupolino aerodinamico per migliorare la velocità.', 18, 2020, 'Grigio', 'Yamaha YZF-R1'),
(173, 'Serbatoio Olio', 'Serbatoio dell\'olio per moto da corsa.', 19, 2022, 'Rosso', 'Ducati Panigale V4'),
(174, 'Sella Moto', 'Sella in gel per massimo comfort.', 17, 2021, 'Blu', 'Kawasaki KX250F'),
(175, 'Parafango Posteriore', 'Parafango posteriore in plastica leggera.', 18, 2022, 'Verde', 'Husqvarna TE150'),
(176, 'Mascherina Parabrezza', 'Mascherina per parabrezza con protezione UV.', 19, 2021, 'Nero', 'BMW S1000RR'),
(177, 'Parafango Laterale', 'Parafango laterale in fibra di carbonio.', 18, 2022, 'Grigio', 'Suzuki GSX-R1000'),
(178, 'Copertura Catena', 'Copertura della catena in plastica rinforzata.', 19, 2021, 'Nero', 'Ducati Monster 821'),
(179, 'Coperchio Motore', 'Coperchio del motore in alluminio anodizzato.', 17, 2022, 'Rosso', 'Yamaha YZF-R6'),
(180, 'Parafango Anteriore', 'Parafango anteriore in fibra di carbonio.', 18, 2021, 'Blu', 'Triumph Tiger 900'),
(181, 'Coda Moto', 'Coda moto in plastica resistente e leggera.', 19, 2022, 'Nero', 'Honda CB500X'),
(182, 'Copertura Specchietti', 'Copertura degli specchietti in plastica nera.', 18, 2022, 'Nero', 'MV Augusta F3 800'),
(183, 'Serbatoio Carburante', 'Serbatoio carburante in fibra di carbonio per massima leggerezza.', 17, 2021, 'Verde', 'BMW R1250GS'),
(184, 'Sella Moto', 'Sella ergonomica per una guida confortevole.', 18, 2020, 'Grigio', 'Harley Davidson Sportster'),
(185, 'Cupolino', 'Cupolino in plastica rinforzata con protezione UV.', 19, 2022, 'Nero', 'Kawasaki Z900'),
(186, 'Parafango Posteriore', 'Parafango posteriore in plastica resistente agli urti.', 17, 2021, 'Blu', 'Yamaha MT-07'),
(187, 'Serbatoio Olio', 'Serbatoio olio con alta capacità e resistenza.', 18, 2022, 'Nero', 'Honda CBR1000RR');

-- --------------------------------------------------------

--
-- Struttura della tabella `clients`
--

CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL,
  `vat_number` varchar(50) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `client_since` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `clients`
--

INSERT INTO `clients` (`client_id`, `vat_number`, `company_name`, `client_since`) VALUES
(6, 'aaa', '', '2024-05-19');

-- --------------------------------------------------------

--
-- Struttura della tabella `data`
--

CREATE TABLE `data` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone_num` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `data`
--

INSERT INTO `data` (`id`, `name`, `surname`, `address`, `phone_num`) VALUES
(1, 'Manuel', 'Sciuto', 'Via Rossi 0', '1234567890'),
(6, 'Demetrio', 'Priolo', 'aaa', '1234567890');

-- --------------------------------------------------------

--
-- Struttura della tabella `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `monthly_salary` varchar(5) NOT NULL,
  `tax_code` varchar(30) NOT NULL,
  `position` varchar(30) NOT NULL,
  `hiring_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `employees`
--

INSERT INTO `employees` (`employee_id`, `monthly_salary`, `tax_code`, `position`, `hiring_date`) VALUES
(1, '0', 'stcmlr03p03f158a', 'Admin', '2024-05-15');

-- --------------------------------------------------------

--
-- Struttura della tabella `jobs`
--

CREATE TABLE `jobs` (
  `job_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `mech_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `jobs`
--

INSERT INTO `jobs` (`job_id`, `vehicle_id`, `mech_id`) VALUES
(14, 13, 1),
(15, 12, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `mechanical_parts`
--

CREATE TABLE `mechanical_parts` (
  `mp_id` int(11) NOT NULL,
  `mp_name` varchar(100) NOT NULL,
  `mp_description` varchar(10000) NOT NULL,
  `year_from` int(11) NOT NULL,
  `year_to` int(11) NOT NULL,
  `mid_provider` int(11) NOT NULL,
  `builds_on` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `mechanical_parts`
--

INSERT INTO `mechanical_parts` (`mp_id`, `mp_name`, `mp_description`, `year_from`, `year_to`, `mid_provider`, `builds_on`) VALUES
(61, 'Pompa del Carburante', 'Pompa del carburante ad alta efficienza.', 2021, 2024, 18, 'Suzuki GSX-R750'),
(62, 'Sostegno', 'Sostegno robusto.', 2017, 2023, 19, 'Honda Rebel 500'),
(63, 'Sottopiede', 'Sottopiede ad alta resistenza.', 2016, 2024, 17, 'Yamaha MT-09'),
(87, 'Pompa Frizione', 'Pompa frizione con alta resistenza e prestazioni elevate.', 2018, 2023, 17, 'Kawasaki KX450F'),
(88, 'Cinghia Trasmissione', 'Cinghia di trasmissione ad alte prestazioni per moto da enduro.', 2021, 2024, 18, 'Honda CRF450L'),
(89, 'Cambio', 'Cambio per moto da strada con ingranaggi rinforzati.', 2019, 2023, 19, 'Yamaha MT-09'),
(90, 'Regolatore di Tensione', 'Regolatore di tensione per sistemi di accensione elettronica.', 2022, 2024, 19, 'BMW S1000RR'),
(91, 'Pompa Benzina', 'Pompa benzina ad alta pressione per moto sportive.', 2020, 2023, 18, 'Ducati Panigale V4'),
(92, 'Motore', 'Motore 4 tempi con alte prestazioni.', 2021, 2024, 17, 'Kawasaki ZX-10R'),
(93, 'Valvola di Scarico', 'Valvola di scarico in acciaio inox ad alte prestazioni.', 2020, 2023, 18, 'Honda CBR1000RR'),
(94, 'Sistema di Raffreddamento', 'Sistema di raffreddamento per moto da competizione.', 2019, 2024, 19, 'Suzuki GSX-R1000'),
(95, 'Pistone', 'Pistone in lega leggera per moto da cross.', 2022, 2024, 17, 'KTM SX-F 250'),
(96, 'Albero a Camme', 'Albero a camme con profilo sportivo per migliorare le prestazioni.', 2021, 2023, 18, 'Yamaha R1'),
(97, 'Cambio Rapido', 'Cambio rapido per moto da corsa con tecnologia avanzata.', 2020, 2024, 19, 'Ducati Streetfighter V4'),
(98, 'Sensore di Temperatura', 'Sensore di temperatura per motori di alta precisione.', 2022, 2024, 17, 'BMW R1250GS'),
(99, 'Ammortizzatore Posteriore', 'Ammortizzatore posteriore con regolazione elettronica.', 2021, 2023, 18, 'Kawasaki ZX-6R'),
(100, 'Filtro Aria', 'Filtro aria ad alta capacità di filtraggio per motori sportivi.', 2022, 2024, 19, 'Honda Africa Twin'),
(101, 'Pompa dell\'Olio', 'Pompa dell\'olio ad alte prestazioni per moto da corsa.', 2020, 2023, 17, 'Yamaha YZF-R6'),
(102, 'Disco Frizione', 'Disco frizione in materiale composito per migliori prestazioni.', 2021, 2024, 18, 'KTM 390 Duke'),
(103, 'Sistema di Accensione', 'Sistema di accensione con bobine ad alte prestazioni.', 2020, 2023, 19, 'BMW K1600GTL'),
(104, 'Albero Motore', 'Albero motore con bilanciamento dinamico per migliorare la fluidità.', 2022, 2024, 18, 'Kawasaki Ninja 650'),
(105, 'Sistema di Iniezione', 'Sistema di iniezione elettronica per ottimizzare il consumo.', 2021, 2024, 19, 'Ducati Hypermotard 950'),
(106, 'Carter Motore', 'Carter motore in alluminio resistente agli urti.', 2020, 2023, 17, 'Suzuki V-Strom 650'),
(107, 'Ammortizzatore Anteriore', 'Ammortizzatore anteriore con regolazione delle sospensioni.', 2021, 2023, 18, 'KTM Adventure 1290'),
(108, 'Frizione', 'Frizione con dischi rinforzati per una risposta più rapida.', 2022, 2024, 17, 'Honda CBR600RR'),
(143, 'Pompa Frizione', 'Pompa frizione con alta resistenza e prestazioni elevate.', 2018, 2023, 17, 'KV,YM'),
(144, 'Cinghia Trasmissione', 'Cinghia di trasmissione ad alte prestazioni per moto da enduro.', 2021, 2024, 18, 'HN,KV,KM'),
(145, 'Cambio', 'Cambio per moto da strada con ingranaggi rinforzati.', 2019, 2023, 19, 'YM,BW,DC'),
(146, 'Regolatore di Tensione', 'Regolatore di tensione per sistemi di accensione elettronica.', 2022, 2024, 19, 'MG,SZ'),
(147, 'Pompa Benzina', 'Pompa benzina ad alta pressione per moto sportive.', 2020, 2023, 18, 'DC,YM,KM'),
(148, 'Motore', 'Motore 4 tempi con alte prestazioni.', 2021, 2024, 17, 'KV,KM,BW'),
(149, 'Valvola di Scarico', 'Valvola di scarico in acciaio inox ad alte prestazioni.', 2020, 2023, 18, 'HN,KM,SZ'),
(150, 'Sistema di Raffreddamento', 'Sistema di raffreddamento per moto da competizione.', 2019, 2024, 19, 'YM,SZ,DC'),
(151, 'Pistone', 'Pistone in lega leggera per moto da cross.', 2022, 2024, 17, 'KM,SZ,YM'),
(152, 'Albero a Camme', 'Albero a camme con profilo sportivo per migliorare le prestazioni.', 2021, 2023, 18, 'YM,BW,DC'),
(153, 'Cambio Rapido', 'Cambio rapido per moto da corsa con tecnologia avanzata.', 2020, 2024, 19, 'DC,YM,KM'),
(154, 'Sensore di Temperatura', 'Sensore di temperatura per motori di alta precisione.', 2022, 2024, 17, 'BMW,HV,KM'),
(155, 'Ammortizzatore Posteriore', 'Ammortizzatore posteriore con regolazione elettronica.', 2021, 2023, 18, 'YZ,KM,YM'),
(156, 'Filtro Aria', 'Filtro aria ad alta capacità di filtraggio per motori sportivi.', 2022, 2024, 19, 'KM,YM,DC'),
(157, 'Pompa dell\'Olio', 'Pompa dell\'olio ad alte prestazioni per moto da corsa.', 2020, 2023, 17, 'KM,YM,DC'),
(158, 'Disco Frizione', 'Disco frizione in materiale composito per migliori prestazioni.', 2021, 2024, 18, 'KM,DC,YM'),
(159, 'Sistema di Accensione', 'Sistema di accensione con bobine ad alte prestazioni.', 2020, 2023, 19, 'YM,DC,KM'),
(160, 'Albero Motore', 'Albero motore con bilanciamento dinamico per migliorare la fluidità.', 2022, 2024, 18, 'YM,KM,DC'),
(161, 'Sistema di Iniezione', 'Sistema di iniezione elettronica per ottimizzare il consumo.', 2021, 2024, 19, 'KM,DC,YM'),
(162, 'Carter Motore', 'Carter motore in alluminio resistente agli urti.', 2020, 2023, 17, 'KM,DC,SZ'),
(163, 'Ammortizzatore Anteriore', 'Ammortizzatore anteriore con regolazione delle sospensioni.', 2021, 2023, 18, 'KM,YM,DC'),
(164, 'Frizione', 'Frizione con dischi rinforzati per una risposta più rapida.', 2022, 2024, 17, 'KM,DC,YM'),
(188, 'Pompa Frizione', 'Pompa frizione con alta resistenza e prestazioni elevate.', 2018, 2023, 17, 'KV,YM'),
(189, 'Cinghia Trasmissione', 'Cinghia di trasmissione ad alte prestazioni per moto da enduro.', 2021, 2024, 18, 'HN,KV,KM'),
(190, 'Cambio', 'Cambio per moto da strada con ingranaggi rinforzati.', 2019, 2023, 19, 'YM,BW,DC'),
(191, 'Regolatore di Tensione', 'Regolatore di tensione per sistemi di accensione elettronica.', 2022, 2024, 19, 'MG,SZ'),
(192, 'Pompa Benzina', 'Pompa benzina ad alta pressione per moto sportive.', 2020, 2023, 18, 'DC,YM,KM'),
(193, 'Motore', 'Motore 4 tempi con alte prestazioni.', 2021, 2024, 17, 'KV,KM,BW'),
(194, 'Valvola di Scarico', 'Valvola di scarico in acciaio inox ad alte prestazioni.', 2020, 2023, 18, 'HN,KM,SZ'),
(195, 'Sistema di Raffreddamento', 'Sistema di raffreddamento per moto da competizione.', 2019, 2024, 19, 'YM,SZ,DC'),
(196, 'Pistone', 'Pistone in lega leggera per moto da cross.', 2022, 2024, 17, 'KM,SZ,YM'),
(197, 'Albero a Camme', 'Albero a camme con profilo sportivo per migliorare le prestazioni.', 2021, 2023, 18, 'YM,BW,DC'),
(198, 'Cambio Rapido', 'Cambio rapido per moto da corsa con tecnologia avanzata.', 2020, 2024, 19, 'DC,YM,KM'),
(199, 'Sensore di Temperatura', 'Sensore di temperatura per motori di alta precisione.', 2022, 2024, 17, 'BMW,HV,KM'),
(200, 'Ammortizzatore Posteriore', 'Ammortizzatore posteriore con regolazione elettronica.', 2021, 2023, 18, 'YZ,KM,YM'),
(201, 'Filtro Aria', 'Filtro aria ad alta capacità di filtraggio per motori sportivi.', 2022, 2024, 19, 'KM,YM,DC'),
(202, 'Pompa dell\'Olio', 'Pompa dell\'olio ad alte prestazioni per moto da corsa.', 2020, 2023, 17, 'KM,YM,DC'),
(203, 'Rettifica Cilindro', 'Rettifica cilindro per migliorare le prestazioni del motore.', 2021, 2024, 18, 'DC,YM,SZ'),
(204, 'Carter di Copertura', 'Carter di copertura in alluminio per motori sportivi.', 2020, 2023, 19, 'KM,DC,YM'),
(205, 'Pompa Frizione', 'Pompa frizione con alta resistenza e prestazioni elevate.', 2022, 2024, 17, 'KM,YM,DC'),
(206, 'Alternatore', 'Alternatore ad alte prestazioni per moto da competizione.', 2021, 2023, 19, 'DC,YM,KM'),
(207, 'Valvola di Scarico', 'Valvola di scarico per moto ad alte prestazioni.', 2020, 2024, 18, 'KM,DC,YM'),
(208, 'Ammortizzatore Posteriore', 'Ammortizzatore posteriore con regolazione a molla.', 2021, 2023, 19, 'KM,DC,YM'),
(209, 'Sistema di Lubrificazione', 'Sistema di lubrificazione avanzato per motori sportivi.', 2020, 2023, 17, 'YM,KM,DC');

-- --------------------------------------------------------

--
-- Struttura della tabella `parts_detail`
--

CREATE TABLE `parts_detail` (
  `part_id` int(11) NOT NULL,
  `length` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `thickness` int(11) NOT NULL,
  `weight` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `parts_detail`
--

INSERT INTO `parts_detail` (`part_id`, `length`, `height`, `thickness`, `weight`) VALUES
(109, 50, 20, 5, 5),
(110, 60, 25, 6, 6),
(111, 55, 22, 6, 5),
(112, 45, 20, 5, 4),
(113, 70, 30, 7, 7),
(114, 55, 25, 6, 6),
(115, 50, 20, 5, 5),
(116, 65, 28, 6, 6),
(117, 60, 25, 6, 6),
(118, 50, 22, 5, 5),
(119, 55, 25, 6, 6),
(120, 60, 30, 7, 7),
(121, 45, 20, 5, 4),
(122, 50, 22, 5, 5),
(123, 55, 25, 6, 5),
(124, 70, 30, 7, 6),
(125, 75, 35, 8, 7),
(126, 50, 22, 5, 5),
(127, 55, 25, 6, 5),
(128, 60, 28, 7, 6),
(129, 65, 30, 8, 7),
(130, 45, 20, 5, 4),
(131, 50, 22, 5, 5),
(132, 55, 25, 6, 6),
(133, 60, 28, 7, 6),
(134, 65, 30, 8, 7),
(135, 55, 25, 6, 6),
(136, 50, 22, 5, 5),
(137, 55, 25, 6, 6),
(138, 60, 28, 7, 6),
(139, 45, 20, 5, 4),
(140, 55, 25, 6, 6),
(141, 60, 30, 7, 7),
(142, 65, 32, 8, 7),
(143, 20, 10, 2, 1),
(144, 25, 15, 3, 1),
(145, 30, 20, 4, 2),
(146, 15, 10, 3, 0),
(147, 35, 15, 4, 1),
(148, 40, 25, 5, 2),
(149, 20, 15, 3, 1),
(150, 30, 15, 4, 1),
(151, 25, 10, 3, 1),
(152, 35, 20, 5, 2),
(153, 45, 25, 6, 2),
(154, 25, 15, 3, 1),
(155, 30, 20, 4, 1),
(156, 20, 12, 2, 1),
(157, 35, 15, 4, 1),
(158, 30, 15, 4, 1),
(159, 40, 20, 5, 2),
(160, 25, 15, 4, 1),
(161, 30, 20, 5, 2),
(162, 20, 10, 3, 1),
(163, 25, 15, 4, 1),
(164, 35, 20, 5, 2),
(165, 15, 10, 2, 0),
(166, 20, 15, 3, 1),
(167, 30, 20, 4, 1),
(168, 25, 15, 3, 1),
(169, 15, 12, 2, 0),
(170, 20, 20, 4, 1),
(171, 25, 10, 3, 1),
(172, 30, 15, 4, 1),
(173, 35, 20, 5, 2),
(174, 25, 15, 3, 1),
(175, 20, 12, 2, 1),
(176, 25, 20, 4, 1),
(177, 35, 25, 5, 2),
(178, 20, 15, 3, 1),
(179, 25, 15, 3, 1),
(180, 30, 20, 4, 1),
(181, 35, 15, 4, 1),
(182, 20, 12, 2, 0),
(183, 30, 20, 5, 1),
(184, 25, 15, 3, 1),
(185, 35, 25, 4, 2),
(186, 25, 20, 4, 1),
(187, 30, 20, 5, 1),
(188, 20, 10, 2, 1),
(189, 25, 15, 3, 1),
(190, 30, 20, 4, 2),
(191, 15, 10, 3, 0),
(192, 35, 15, 4, 2),
(193, 40, 25, 5, 2),
(194, 20, 15, 3, 1),
(195, 30, 15, 4, 1),
(196, 25, 10, 3, 1),
(197, 35, 20, 5, 2),
(198, 45, 25, 6, 2),
(199, 25, 15, 3, 1),
(200, 30, 20, 4, 1),
(201, 20, 12, 2, 1),
(202, 35, 15, 4, 1),
(203, 25, 10, 3, 1),
(204, 30, 20, 4, 2),
(205, 25, 15, 3, 1),
(206, 40, 25, 5, 2),
(207, 30, 20, 4, 2),
(208, 35, 15, 4, 2),
(209, 25, 20, 4, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `providers`
--

CREATE TABLE `providers` (
  `id_provider` int(11) NOT NULL,
  `city` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `access_key` varchar(16) NOT NULL,
  `pendingRequest` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `providers`
--

INSERT INTO `providers` (`id_provider`, `city`, `name`, `address`, `email`, `access_key`, `pendingRequest`) VALUES
(17, 'Messina', 'Mock Fornitore 1', 'Via dei mille 1000', 'mockfornitore1@gmail.com', 'AoJJjaxWDLDFlWjt', 1),
(18, 'Napoli', 'Mock fornitore 2', 'Via Napoli 1', 'mockfornitore2@gmail.com', 'HVnvGqptFT8ShJ93', 1),
(19, 'Milano', 'Mock fornitore 3', 'Via del corso 1', 'mockfornitore3@gmail.com', 'A9zsCV0KMBUJX8xe', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `storage`
--

CREATE TABLE `storage` (
  `part_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `ship_time` int(11) NOT NULL,
  `availability` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `storage`
--

INSERT INTO `storage` (`part_id`, `price`, `ship_time`, `availability`) VALUES
(109, 150, 48, 80),
(110, 180, 72, 70),
(111, 170, 48, 60),
(112, 140, 24, 90),
(113, 200, 72, 50),
(114, 160, 48, 80),
(115, 150, 24, 100),
(116, 180, 48, 70),
(117, 170, 72, 60),
(118, 160, 24, 80),
(119, 175, 48, 70),
(120, 200, 72, 50),
(121, 140, 24, 90),
(122, 150, 48, 80),
(123, 160, 72, 60),
(124, 200, 24, 50),
(125, 220, 48, 40),
(126, 150, 72, 70),
(127, 165, 24, 80),
(128, 175, 48, 60),
(129, 190, 72, 50),
(130, 140, 24, 90),
(131, 150, 48, 80),
(132, 160, 72, 70),
(133, 175, 24, 60),
(134, 190, 48, 50),
(135, 165, 72, 70),
(136, 155, 24, 80),
(137, 170, 48, 70),
(138, 180, 72, 60),
(139, 140, 24, 90),
(140, 165, 48, 70),
(141, 180, 72, 50),
(142, 200, 24, 40),
(143, 50, 24, 95),
(144, 80, 48, 85),
(145, 110, 24, 75),
(146, 60, 48, 90),
(147, 95, 36, 80),
(148, 120, 48, 70),
(149, 55, 36, 85),
(150, 90, 48, 75),
(151, 70, 24, 90),
(152, 100, 36, 85),
(153, 140, 48, 70),
(154, 65, 48, 80),
(155, 85, 36, 90),
(156, 50, 24, 95),
(157, 95, 48, 85),
(158, 80, 36, 90),
(159, 100, 48, 80),
(160, 65, 36, 85),
(161, 95, 48, 80),
(162, 55, 24, 90),
(163, 70, 48, 85),
(164, 90, 36, 80),
(165, 40, 24, 90),
(166, 60, 48, 85),
(167, 80, 36, 80),
(168, 65, 48, 90),
(169, 45, 24, 95),
(170, 75, 36, 85),
(171, 50, 48, 80),
(172, 70, 36, 85),
(173, 90, 48, 75),
(174, 60, 36, 80),
(175, 50, 24, 95),
(176, 70, 36, 80),
(177, 85, 48, 75),
(178, 55, 24, 90),
(179, 60, 36, 80),
(180, 75, 36, 85),
(181, 80, 48, 80),
(182, 45, 24, 90),
(183, 80, 48, 85),
(184, 55, 36, 80),
(185, 90, 48, 75),
(186, 65, 36, 85),
(187, 75, 36, 80),
(188, 50, 24, 95),
(189, 80, 48, 85),
(190, 110, 24, 75),
(191, 60, 48, 90),
(192, 95, 36, 80),
(193, 120, 48, 70),
(194, 55, 36, 85),
(195, 90, 48, 75),
(196, 70, 24, 90),
(197, 100, 36, 85),
(198, 140, 48, 70),
(199, 65, 48, 80),
(200, 85, 36, 90),
(201, 50, 24, 95),
(202, 95, 48, 85),
(203, 60, 24, 90),
(204, 85, 36, 75),
(205, 70, 48, 80),
(206, 130, 48, 70),
(207, 85, 36, 80),
(208, 95, 48, 80),
(209, 75, 36, 85);

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'Manu393', '$2y$10$z1oV4DlAZXM3.T26r9dQk.BGLmw1aaJh.Hqc1MlnLAmJ.aoqU7Qi2'),
(6, 'Dem123', '$2y$10$jplIJ1kOdZZn7yRxYUdXD.hi.NOqGRfe7OR/iVSuy3/zlBz7nkfp.');

-- --------------------------------------------------------

--
-- Struttura della tabella `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicle_id` int(11) NOT NULL,
  `arrival_date` date NOT NULL,
  `status` text NOT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `vehicles`
--

INSERT INTO `vehicles` (`vehicle_id`, `arrival_date`, `status`, `client_id`) VALUES
(12, '0000-00-00', '', 6),
(13, '0000-00-00', '', 6),
(14, '0000-00-00', '', 6);

-- --------------------------------------------------------

--
-- Struttura della tabella `vehicle_data`
--

CREATE TABLE `vehicle_data` (
  `vehicle_id` int(11) NOT NULL,
  `model` varchar(40) DEFAULT NULL,
  `tag` varchar(10) DEFAULT NULL,
  `brand` varchar(2) DEFAULT NULL,
  `reg_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `vehicle_data`
--

INSERT INTO `vehicle_data` (`vehicle_id`, `model`, `tag`, `brand`, `reg_date`) VALUES
(12, 'RS 125 ', 'AA111AA', 'AP', '2024-09-14'),
(13, 'YZ 450', '', 'YM', '2024-09-14'),
(14, 'Duke 125', 'ss222ss', 'KM', '2024-09-14');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `body_parts`
--
ALTER TABLE `body_parts`
  ADD PRIMARY KEY (`bd_id`);

--
-- Indici per le tabelle `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Indici per le tabelle `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indici per le tabelle `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`job_id`);

--
-- Indici per le tabelle `mechanical_parts`
--
ALTER TABLE `mechanical_parts`
  ADD PRIMARY KEY (`mp_id`);

--
-- Indici per le tabelle `parts_detail`
--
ALTER TABLE `parts_detail`
  ADD PRIMARY KEY (`part_id`);

--
-- Indici per le tabelle `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id_provider`);

--
-- Indici per le tabelle `storage`
--
ALTER TABLE `storage`
  ADD PRIMARY KEY (`part_id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicle_id`);

--
-- Indici per le tabelle `vehicle_data`
--
ALTER TABLE `vehicle_data`
  ADD PRIMARY KEY (`vehicle_id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `data`
--
ALTER TABLE `data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `jobs`
--
ALTER TABLE `jobs`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT per la tabella `parts_detail`
--
ALTER TABLE `parts_detail`
  MODIFY `part_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;

--
-- AUTO_INCREMENT per la tabella `providers`
--
ALTER TABLE `providers`
  MODIFY `id_provider` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT per la tabella `vehicle_data`
--
ALTER TABLE `vehicle_data`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
