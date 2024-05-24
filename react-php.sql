-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 24, 2024 alle 14:48
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
(1, '0000-00-00', 'Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.', 6);

-- --------------------------------------------------------

--
-- Struttura della tabella `vehicle_data`
--

CREATE TABLE `vehicle_data` (
  `vehicle_id` int(11) NOT NULL,
  `model` varchar(40) DEFAULT NULL,
  `tag` varchar(10) DEFAULT NULL,
  `brand` varchar(40) DEFAULT NULL,
  `reg_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `vehicle_data`
--

INSERT INTO `vehicle_data` (`vehicle_id`, `model`, `tag`, `brand`, `reg_date`) VALUES
(1, 'Cb 125 F', 'AA111AA', 'Honda', '2024-04-29');

--
-- Indici per le tabelle scaricate
--

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
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `vehicle_data`
--
ALTER TABLE `vehicle_data`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
