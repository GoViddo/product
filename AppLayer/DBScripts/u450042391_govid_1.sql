-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 14, 2018 at 08:34 AM
-- Server version: 10.2.17-MariaDB
-- PHP Version: 7.1.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u450042391_govid`
--

-- --------------------------------------------------------

--
-- Table structure for table `community`
--

CREATE TABLE `community` (
  `community_join_id` int(200) NOT NULL,
  `email_id_community_joiner` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `joining_as` varchar(500) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `community`
--

INSERT INTO `community` (`community_join_id`, `email_id_community_joiner`, `joining_as`) VALUES
(5, 'mulaniimran27@gmail.com', 'Inverster Producer '),
(6, 'shelarpratik@icloud.com', 'Inverster '),
(7, 'satkhachane@gmail.com', 'User '),
(8, 'ni_80@rediffmail.com', 'User '),
(9, 'ni_80@rediffmail.com', 'User '),
(10, 'pravinshelar123@gmail.com', 'Inverster User '),
(11, 'ajitnetwork@gmail.com', 'Advertiser '),
(12, 'ajitnetwork@gmail.com', 'Advertiser '),
(13, 'Donoso6780@hotmail.com', ''),
(14, 'Comparoni19465@hotmail.com', ''),
(15, 'prateek.nikhare21@gmail.com', 'User '),
(16, 'prateek.nikhare21@gmail.com', 'User '),
(17, 'prateek.nikhare21@gmail.com', 'Investor '),
(18, 'Pravinshelar123@Gmail.con', ''),
(19, 'Pravinshelar123@Gmail.con', 'Investor User '),
(20, 'Pravinshelar123@Gmail.con', 'Investor User '),
(21, 'Pravinshelar123@Gmail.con', 'Investor User '),
(22, 'SteinhoffRita@gmx.com', 'User '),
(23, 'sneha19.singh@gmail.com', 'User '),
(24, 'as@bluesapphirefilms.com', 'Producer '),
(25, 'Delhoyo71585@yahoo.com', ''),
(26, '51135Finizio@hotmail.com', ''),
(27, '47919Searle@hotmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `config_table`
--

CREATE TABLE `config_table` (
  `id` int(255) NOT NULL,
  `config_key` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `config_value` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `config_table`
--

INSERT INTO `config_table` (`id`, `config_key`, `config_value`) VALUES
(1, 'bannerImgCount', '10'),
(2, 'previewCount', '10'),
(3, 'popularCount', '5'),
(4, 'categories', '[{\'name\':\'Drama\', \'count\':5}, {\'name\':\'Horror\', \'count\':5}]');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `user_id` int(255) NOT NULL,
  `first_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `email_id` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `phone_no` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birth_date` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `country` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_wallet_id` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_video_choice` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_profile_picture` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `notification_token` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `register_as_advisor` tinyint(4) NOT NULL DEFAULT 0,
  `register_as_producer` tinyint(4) NOT NULL DEFAULT 0,
  `registration_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`user_id`, `first_name`, `last_name`, `email_id`, `gender`, `password`, `phone_no`, `birth_date`, `address`, `country`, `user_wallet_id`, `user_video_choice`, `user_profile_picture`, `notification_token`, `register_as_advisor`, `register_as_producer`, `registration_date`, `status`) VALUES
(3, 'Imran', 'Mulani', 'mulaniimran97@gmail.com', 'Male', 'imran', '8600955821', '18-10-1992', 'Pune', 'India', 'dvjsdbsdskfjbs', '', '', 'dsjnasds,mnasd,n', 0, 0, '2018-11-17 10:58:23', 1),
(4, 'Imran', 'Mulani', 'mulaniimran127@gmail.com', 'Male', 'imran', '8600955821', '18-10-1992', 'Pune', 'India', 'dvjsdbsdskfjbs', '', '', 'dsjnasds,mnasd,n', 0, 0, '2018-11-17 10:59:11', 1),
(7, 'imran', 'mulani', 'mulaniimran27@gmail.com', NULL, 'demo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-12-08 09:32:48', 1);

-- --------------------------------------------------------

--
-- Table structure for table `video_genere_table`
--

CREATE TABLE `video_genere_table` (
  `video_genere_id` int(255) NOT NULL,
  `video_genere_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `video_genere_table`
--

INSERT INTO `video_genere_table` (`video_genere_id`, `video_genere_name`, `status`) VALUES
(1, 'Drama', 1),
(2, 'Horror', 1);

-- --------------------------------------------------------

--
-- Table structure for table `video_table`
--

CREATE TABLE `video_table` (
  `video_id` int(255) NOT NULL,
  `show_name` text COLLATE utf8_unicode_ci NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `director` text COLLATE utf8_unicode_ci NOT NULL,
  `duration` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `home_image` text COLLATE utf8_unicode_ci NOT NULL,
  `banner_image` text COLLATE utf8_unicode_ci NOT NULL,
  `producer` text COLLATE utf8_unicode_ci NOT NULL,
  `shorten_text` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `show_on_home_page` tinyint(4) NOT NULL,
  `slug` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `starring` text COLLATE utf8_unicode_ci NOT NULL,
  `vdo_cipher_id` text COLLATE utf8_unicode_ci NOT NULL,
  `video_tags` text COLLATE utf8_unicode_ci NOT NULL,
  `video_description` text COLLATE utf8_unicode_ci NOT NULL,
  `video_genere_type` int(255) NOT NULL,
  `video_channel_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `production_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `video_views_count` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `video_earnings` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `community`
--
ALTER TABLE `community`
  ADD PRIMARY KEY (`community_join_id`);

--
-- Indexes for table `config_table`
--
ALTER TABLE `config_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email_id` (`email_id`);

--
-- Indexes for table `video_genere_table`
--
ALTER TABLE `video_genere_table`
  ADD PRIMARY KEY (`video_genere_id`);

--
-- Indexes for table `video_table`
--
ALTER TABLE `video_table`
  ADD PRIMARY KEY (`video_id`),
  ADD KEY `video_genere_type` (`video_genere_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `community`
--
ALTER TABLE `community`
  MODIFY `community_join_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `config_table`
--
ALTER TABLE `config_table`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `user_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `video_genere_table`
--
ALTER TABLE `video_genere_table`
  MODIFY `video_genere_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `video_table`
--
ALTER TABLE `video_table`
  MODIFY `video_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `video_table`
--
ALTER TABLE `video_table`
  ADD CONSTRAINT `video_table_ibfk_1` FOREIGN KEY (`video_genere_type`) REFERENCES `video_genere_table` (`video_genere_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
