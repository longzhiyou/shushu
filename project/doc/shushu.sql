/*
Navicat MariaDB Data Transfer

Source Server         : localhost_3306
Source Server Version : 100117
Source Host           : localhost:3306
Source Database       : shushu

Target Server Type    : MariaDB
Target Server Version : 100117
File Encoding         : 65001

Date: 2018-06-29 08:51:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT NULL,
  `lock_version` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `county` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `post_code` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of address
-- ----------------------------

-- ----------------------------
-- Table structure for ba_zi_rule
-- ----------------------------
DROP TABLE IF EXISTS `ba_zi_rule`;
CREATE TABLE `ba_zi_rule` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT NULL,
  `lock_version` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of ba_zi_rule
-- ----------------------------

-- ----------------------------
-- Table structure for contact
-- ----------------------------
DROP TABLE IF EXISTS `contact`;
CREATE TABLE `contact` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT NULL,
  `lock_version` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of contact
-- ----------------------------

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `customer_id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT NULL,
  `lock_version` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `birth` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `bazi` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('1011134492582084607', '2018-06-25 14:30:23', 'admin', '0', '0', '2018-06-25 14:30:23', 'admin', '', '', 'lzy', '甲子 丙子 丙戌 壬辰');
INSERT INTO `customer` VALUES ('1011134492582084608', '2018-06-25 14:30:23', 'admin', '0', '0', '2018-06-25 14:30:23', 'admin', null, null, 'long', '甲子 丙子 丙戌 辛卯');
INSERT INTO `customer` VALUES ('1011134492582084609', '2018-06-25 14:30:23', 'admin', '0', '0', '2018-06-25 14:30:23', 'admin', '', '', 'long1', '甲子 丙子 丙戌 庚寅');

-- ----------------------------
-- Table structure for rule
-- ----------------------------
DROP TABLE IF EXISTS `rule`;
CREATE TABLE `rule` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT NULL,
  `lock_version` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `content` varchar(2048) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `algorithm` varchar(2048) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `enable` bit(1) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of rule
-- ----------------------------
INSERT INTO `rule` VALUES ('1011153728809467904', '2018-06-25 15:46:49', 'admin', '0', '0', '2018-06-25 15:46:49', 'admin', '', '年禄', 'def matchRule(def bazi,def baZiAlgorithm) {\r\n			def mapResult = [:]\r\n       \r\n       mapResult[\"年禄测试\"]=bazi.getNianGan()\r\n			mapResult[\"baZiAlgorithm\"]=baZiAlgorithm.mapTianGanLu\r\n       \r\n       if (mapResult.size()>0) {\r\n           mapResult\r\n       }\r\n      \r\n\r\n    }', null, '\0', null, '年禄');
INSERT INTO `rule` VALUES ('1011154965567111168', '2018-06-25 15:51:44', 'admin', '0', '0', '2018-06-25 15:51:44', 'admin', '0', '天乙贵人', 'def matchRule(def bazi,def baZiAlgorithm) {\r\n			def mapResult = [:]\r\n       \r\n       mapResult[\"天乙贵人\"]=bazi.getNianGan()\r\n			mapResult[\"baZiAlgorithm\"]=baZiAlgorithm.mapTianGanLu\r\n       \r\n       if (mapResult.size()>0) {\r\n           mapResult\r\n       }\r\n      \r\n\r\n    }', null, '\0', null, '天乙贵人');
INSERT INTO `rule` VALUES ('1011155031212163072', '2018-06-25 15:52:00', 'admin', '0', '0', '2018-06-25 15:52:00', 'admin', '0', '纳音五行正印', null, null, '\0', null, '纳音五行正印');

-- ----------------------------
-- Table structure for rule_copy
-- ----------------------------
DROP TABLE IF EXISTS `rule_copy`;
CREATE TABLE `rule_copy` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT NULL,
  `lock_version` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `content` varchar(2048) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `algorithm` varchar(2048) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `enable` bit(1) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of rule_copy
-- ----------------------------
INSERT INTO `rule_copy` VALUES ('1011153728809467904', '2018-06-25 15:46:49', 'admin', '0', '0', '2018-06-25 15:46:49', 'admin', '', '年禄', 'def matchRule(def bazi,def baZiAlgorithm) {\r\n			def mapResult = [:]\r\n       \r\n       mapResult[\"年禄测试\"]=bazi.getNianGan()\r\n			mapResult[\"baZiAlgorithm\"]=baZiAlgorithm.mapTianGanLu\r\n       \r\n       if (mapResult.size()>0) {\r\n           mapResult\r\n       }\r\n      \r\n\r\n    }', null, '\0', null, '年禄');
INSERT INTO `rule_copy` VALUES ('1011154965567111168', '2018-06-25 15:51:44', 'admin', '0', '0', '2018-06-25 15:51:44', 'admin', '0', '天乙贵人', 'def matchRule(def bazi,def baZiAlgorithm) {\r\n			def mapResult = [:]\r\n       \r\n       mapResult[\"天乙贵人\"]=bazi.getNianGan()\r\n			mapResult[\"baZiAlgorithm\"]=baZiAlgorithm.mapTianGanLu\r\n       \r\n       if (mapResult.size()>0) {\r\n           mapResult\r\n       }\r\n      \r\n\r\n    }', null, '\0', null, '天乙贵人');
INSERT INTO `rule_copy` VALUES ('1011155031212163072', '2018-06-25 15:52:00', 'admin', '0', '0', '2018-06-25 15:52:00', 'admin', '0', '纳音五行正印', null, null, '\0', null, '纳音五行正印');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `delete_flag` int(11) DEFAULT NULL,
  `lock_version` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', null, null, null, null, null, null, '', '$2a$10$qeW7Nv.L53Et7.UOTJPipeIUQIvaOH8yw76FWbe2xy.qhzeRlZ0O6', 'admin');
