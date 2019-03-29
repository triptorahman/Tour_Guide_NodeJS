-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2019 at 07:05 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 5.6.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tourguide`
--

-- --------------------------------------------------------

--
-- Table structure for table `checklist`
--

CREATE TABLE `checklist` (
  `uid` int(100) NOT NULL,
  `placename` varchar(200) NOT NULL,
  `placecost` int(100) NOT NULL,
  `pid` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `checklist`
--

INSERT INTO `checklist` (`uid`, `placename`, `placecost`, `pid`) VALUES
(3, 'saintmartin', 6000, 16);

-- --------------------------------------------------------

--
-- Table structure for table `placetable`
--

CREATE TABLE `placetable` (
  `pid` int(100) NOT NULL,
  `pname` varchar(200) NOT NULL,
  `pcountry` varchar(200) NOT NULL,
  `pcost` int(100) NOT NULL,
  `pmedium` varchar(200) NOT NULL,
  `pcomment` varchar(500) NOT NULL,
  `pimage` varchar(500) NOT NULL,
  `uid` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `placetable`
--

INSERT INTO `placetable` (`pid`, `pname`, `pcountry`, `pcost`, `pmedium`, `pcomment`, `pimage`, `uid`) VALUES
(16, 'saintmartin', 'Bangladesh', 6000, 'Bus,Plane', 'No Comment', '62Saintmartin.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tempupload`
--

CREATE TABLE `tempupload` (
  `pid` int(100) NOT NULL,
  `pname` varchar(200) NOT NULL,
  `pcountry` varchar(200) NOT NULL,
  `pcost` int(100) NOT NULL,
  `pmedium` varchar(500) NOT NULL,
  `pimage` varchar(500) NOT NULL,
  `uid` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tempupload`
--

INSERT INTO `tempupload` (`pid`, `pname`, `pcountry`, `pcost`, `pmedium`, `pimage`, `uid`) VALUES
(18, 'raturgul', 'Bangladesh', 3000, 'Bus,Train', '285ratargul.jpg', 2),
(19, 'coxbazar', 'Bangladesh', 5000, 'Bus,Plane', '931coxsbazar.png', 2);

-- --------------------------------------------------------

--
-- Table structure for table `usertable`
--

CREATE TABLE `usertable` (
  `uid` int(100) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` int(100) NOT NULL,
  `type` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usertable`
--

INSERT INTO `usertable` (`uid`, `username`, `password`, `email`, `phone`, `type`) VALUES
(1, 'tripto', '12345678', 'triptorahman@gmail.com', 1521302122, 3),
(2, 'samiur', '12345678', 'samiur@gmail.com', 1758037522, 2),
(3, 'tripto47', '12345678', 'tripto47@gmail.com', 1758037522, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `placetable`
--
ALTER TABLE `placetable`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `tempupload`
--
ALTER TABLE `tempupload`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `usertable`
--
ALTER TABLE `usertable`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tempupload`
--
ALTER TABLE `tempupload`
  MODIFY `pid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `usertable`
--
ALTER TABLE `usertable`
  MODIFY `uid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
