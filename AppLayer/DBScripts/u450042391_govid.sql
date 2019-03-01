-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 01, 2019 at 06:48 PM
-- Server version: 10.2.17-MariaDB
-- PHP Version: 7.2.10

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
  `joining_as` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `updates_approval` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `community`
--

INSERT INTO `community` (`community_join_id`, `email_id_community_joiner`, `joining_as`, `updates_approval`) VALUES
(5, 'mulaniimran27@gmail.com', 'Inverster Producer ', 0),
(6, 'shelarpratik@icloud.com', 'Inverster ', 0),
(7, 'satkhachane@gmail.com', 'User ', 0),
(8, 'ni_80@rediffmail.com', 'User ', 0),
(9, 'ni_80@rediffmail.com', 'User ', 0),
(10, 'pravinshelar123@gmail.com', 'Inverster User ', 0),
(11, 'ajitnetwork@gmail.com', 'Advertiser ', 0),
(12, 'ajitnetwork@gmail.com', 'Advertiser ', 0),
(13, 'Donoso6780@hotmail.com', '', 0),
(14, 'Comparoni19465@hotmail.com', '', 0),
(15, 'prateek.nikhare21@gmail.com', 'User ', 0),
(16, 'prateek.nikhare21@gmail.com', 'User ', 0),
(17, 'prateek.nikhare21@gmail.com', 'Investor ', 0),
(18, 'Pravinshelar123@Gmail.con', '', 0),
(19, 'Pravinshelar123@Gmail.con', 'Investor User ', 0),
(20, 'Pravinshelar123@Gmail.con', 'Investor User ', 0),
(21, 'Pravinshelar123@Gmail.con', 'Investor User ', 0),
(22, 'SteinhoffRita@gmx.com', 'User ', 0),
(23, 'sneha19.singh@gmail.com', 'User ', 0),
(24, 'as@bluesapphirefilms.com', 'Producer ', 0),
(25, 'Delhoyo71585@yahoo.com', '', 0),
(26, '51135Finizio@hotmail.com', '', 0),
(27, '47919Searle@hotmail.com', '', 0),
(32, 'mulaniimran97@gmail.com', 'Viewer ', 0),
(33, 'mulaniimran97@gmail.com', '', 1),
(34, 'rachel@drop.studio', '', 1),
(35, '', '', 0),
(36, 'SarthakKolage@gmail.com', '', 1),
(37, '', '', 0),
(38, 'pankajthodsare@gmail.com', '', 1),
(39, 'pankajthodsare78@gmail.com', '', 1),
(40, 'prakashkumar76@gmail.com', '', 0),
(41, 'irina.georgieva@drop.studio', '', 1),
(42, '', '', 0),
(43, 'massimo.guasti@yahoo.it', '', 1),
(44, 'abhishekbhrt56@gmail.com', '', 1),
(45, 'saurabhpatilsam@gmail.com', '', 1),
(46, 'sonnemukesh@gmail.com', '', 1),
(47, 'sidvb13@gmail.com', '', 0),
(48, 'jindalharshal@gmail.com', '', 1),
(49, 'vijaydhabekar@hotmail.com', '', 0),
(50, 'vijaydhabekar@hotmail.com', '', 0),
(51, 'vijaydhabekar@hotmail.com', '', 0),
(52, 'mohanish58@gmail.com', '', 0),
(53, 'srajanpatel.9575@gmail.com', '', 1),
(54, 'bhuvan@latlontechnologies.com', '', 0),
(55, 'pankajthodsare78@gmail.com', '', 1),
(56, 'pankajthodsare78@gmail.com', '', 1),
(57, 'mailto.arahim@gmail.com', '', 0),
(58, 'agarwalakansh7@gmail.com', '', 1),
(59, 'skmknk09@gmail.com', '', 1),
(60, 'skmknk09@gmail.com', '', 1),
(61, 'hemantarole@gmail.com', '', 1),
(62, 'dipago6@gmail.com', '', 1),
(63, 'saketrk@gmail.com', '', 1),
(64, 'mayur.pathak1545@gmail.com', '', 1),
(65, 'mayur.pathak1545@gmail.com', '', 1),
(66, 'manishgo3366@gmail.com', '', 1),
(67, 'chsubbu33@gmail.com', '', 1),
(68, 'swapniljadhav720@gmail.com', '', 1);

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
  `eosio_account_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `phone_no` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birth_date` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `country` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
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

INSERT INTO `user_table` (`user_id`, `first_name`, `last_name`, `email_id`, `eosio_account_name`, `gender`, `password`, `phone_no`, `birth_date`, `address`, `country`, `user_video_choice`, `user_profile_picture`, `notification_token`, `register_as_advisor`, `register_as_producer`, `registration_date`, `status`) VALUES
(73, 'Imran', 'Mulani', 'imran9@gmail.com', 'mulaniimran1', NULL, 'sfsdfsd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2019-03-01 18:14:20', 1),
(74, 'Imran', 'Mulani', 'imran10@gmail.com', 'mulaniimran3', NULL, 'sfsdfsd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2019-03-01 18:35:23', 1);

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
-- Dumping data for table `video_table`
--

INSERT INTO `video_table` (`video_id`, `show_name`, `created_date`, `director`, `duration`, `home_image`, `banner_image`, `producer`, `shorten_text`, `show_on_home_page`, `slug`, `starring`, `vdo_cipher_id`, `video_tags`, `video_description`, `video_genere_type`, `video_channel_name`, `production_name`, `video_views_count`, `video_earnings`, `status`) VALUES
(1, 'Test1', '2019-02-28 18:34:44', 'Test1', '100', 'https://goviddo.com/app/images/go.png', 'https://goviddo.com/app/images/go.png', 'test', 'test', 1, 'test', 'test', 'jhjbbkbkkh', 'hbjb', 'jb . knjk', 1, 'kbkb', 'hbhd', '1000', '300', 1),
(2, 'Test1', '2019-02-28 18:34:44', 'Test1', '100', 'https://goviddo.com/app/images/go.png', 'https://goviddo.com/app/images/go.png', 'test', 'test', 1, 'test', 'test', 'jhjbbkbkkh', 'hbjb', 'jb . knjk', 2, 'kbkb', 'hbhd', '1000', '300', 1),
(3, 'Test1', '2019-02-28 18:34:44', 'Test1', '100', 'https://goviddo.com/app/images/go.png', 'https://goviddo.com/app/images/go.png', 'test', 'test', 1, 'test', 'test', 'jhjbbkbkkh', 'hbjb', 'jb . knjk', 2, 'kbkb', 'hbhd', '1000', '300', 1),
(4, 'Test1', '2019-02-28 18:34:44', 'Test1', '100', 'https://goviddo.com/app/images/go.png', 'https://goviddo.com/app/images/go.png', 'test', 'test', 1, 'test', 'test', 'jhjbbkbkkh', 'hbjb', 'jb . knjk', 2, 'kbkb', 'hbhd', '1000', '300', 1),
(5, 'Test1', '2019-02-28 18:34:44', 'Test1', '100', 'https://goviddo.com/app/images/go.png', 'https://goviddo.com/app/images/go.png', 'test', 'test', 1, 'test', 'test', 'jhjbbkbkkh', 'hbjb', 'jb . knjk', 1, 'kbkb', 'hbhd', '1000', '300', 1),
(6, 'Test1', '2019-02-28 18:34:44', 'Test1', '100', 'https://goviddo.com/app/images/go.png', 'https://goviddo.com/app/images/go.png', 'test', 'test', 1, 'test', 'test', 'jhjbbkbkkh', 'hbjb', 'jb . knjk', 2, 'kbkb', 'hbhd', '1000', '300', 1);

-- --------------------------------------------------------

--
-- Table structure for table `video_views_table`
--

CREATE TABLE `video_views_table` (
  `view_id` int(255) NOT NULL,
  `view_time` datetime NOT NULL DEFAULT current_timestamp(),
  `view_user` int(255) NOT NULL,
  `video_id` int(255) NOT NULL,
  `total_video_played_time` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `view_from` tinyint(4) NOT NULL COMMENT '0 - Android App, 1 - Website, 2 - iOS App',
  `earnings_after_view` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `earning_added_account_status` tinyint(4) NOT NULL,
  `view_status` tinyint(4) NOT NULL
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
-- Indexes for table `video_views_table`
--
ALTER TABLE `video_views_table`
  ADD PRIMARY KEY (`view_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `community`
--
ALTER TABLE `community`
  MODIFY `community_join_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `config_table`
--
ALTER TABLE `config_table`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `user_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `video_genere_table`
--
ALTER TABLE `video_genere_table`
  MODIFY `video_genere_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `video_table`
--
ALTER TABLE `video_table`
  MODIFY `video_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `video_views_table`
--
ALTER TABLE `video_views_table`
  MODIFY `view_id` int(255) NOT NULL AUTO_INCREMENT;

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
