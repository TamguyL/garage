-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 01 mai 2024 à 22:32
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `garage`
--

-- --------------------------------------------------------

--
-- Structure de la table `boites`
--

CREATE TABLE `boites` (
  `id_boite` int(11) NOT NULL,
  `boite` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `boites`
--

INSERT INTO `boites` (`id_boite`, `boite`) VALUES
(1, 'automatique'),
(2, 'manuelle'),
(4, 'séquentielle');

-- --------------------------------------------------------

--
-- Structure de la table `carburants`
--

CREATE TABLE `carburants` (
  `id_carbu` int(11) NOT NULL,
  `carburant` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `carburants`
--

INSERT INTO `carburants` (`id_carbu`, `carburant`) VALUES
(1, 'diesel'),
(2, 'essence'),
(3, 'hydrogène'),
(4, 'GPL'),
(5, 'hybride');

-- --------------------------------------------------------

--
-- Structure de la table `marques`
--

CREATE TABLE `marques` (
  `id_marqu` int(11) NOT NULL,
  `marque` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `marques`
--

INSERT INTO `marques` (`id_marqu`, `marque`) VALUES
(1, 'citroen'),
(2, 'peugeot'),
(3, 'renault'),
(6, 'porche');

-- --------------------------------------------------------

--
-- Structure de la table `modeles`
--

CREATE TABLE `modeles` (
  `id_model` int(11) NOT NULL,
  `id_marqu` int(11) NOT NULL,
  `modele` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `modeles`
--

INSERT INTO `modeles` (`id_model`, `id_marqu`, `modele`) VALUES
(1, 1, 'C5'),
(2, 1, 'C4'),
(3, 1, 'C12'),
(4, 2, '5008'),
(5, 2, '2008'),
(6, 3, 'Megane'),
(7, 3, 'Scenic'),
(9, 3, 'Clio'),
(10, 2, '208'),
(12, 6, '911');

-- --------------------------------------------------------

--
-- Structure de la table `voitures`
--

CREATE TABLE `voitures` (
  `id_voitu` int(11) NOT NULL,
  `id_model` int(11) NOT NULL,
  `id_boite` int(11) NOT NULL,
  `id_carbu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `voitures`
--

INSERT INTO `voitures` (`id_voitu`, `id_model`, `id_boite`, `id_carbu`) VALUES
(1, 1, 1, 1),
(2, 1, 1, 2),
(3, 2, 2, 1),
(4, 2, 1, 2),
(5, 3, 1, 3),
(6, 4, 2, 1),
(7, 4, 2, 2),
(8, 5, 2, 1),
(9, 6, 2, 1),
(10, 7, 2, 1),
(11, 6, 2, 2),
(12, 6, 2, 4);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `boites`
--
ALTER TABLE `boites`
  ADD PRIMARY KEY (`id_boite`);

--
-- Index pour la table `carburants`
--
ALTER TABLE `carburants`
  ADD PRIMARY KEY (`id_carbu`);

--
-- Index pour la table `marques`
--
ALTER TABLE `marques`
  ADD PRIMARY KEY (`id_marqu`);

--
-- Index pour la table `modeles`
--
ALTER TABLE `modeles`
  ADD PRIMARY KEY (`id_model`);

--
-- Index pour la table `voitures`
--
ALTER TABLE `voitures`
  ADD PRIMARY KEY (`id_voitu`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `boites`
--
ALTER TABLE `boites`
  MODIFY `id_boite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `carburants`
--
ALTER TABLE `carburants`
  MODIFY `id_carbu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `marques`
--
ALTER TABLE `marques`
  MODIFY `id_marqu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `modeles`
--
ALTER TABLE `modeles`
  MODIFY `id_model` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `voitures`
--
ALTER TABLE `voitures`
  MODIFY `id_voitu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
