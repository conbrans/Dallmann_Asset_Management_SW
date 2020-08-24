CREATE  SCHEMA assetmanagement;
USE assetmanagement;
CREATE TABLE `Rights` (
                          `role` varchar(100) NOT NULL,
                          `booking_device` tinyint(1) DEFAULT NULL,
                          `edit_device` tinyint(1) DEFAULT NULL,
                          `add_device` tinyint(1) DEFAULT NULL,
                          `view_device` tinyint(1) DEFAULT NULL,
                          `delete_device` tinyint(1) DEFAULT NULL,
                          `add_user` tinyint(1) DEFAULT NULL,
                          `delete_user` tinyint(1) DEFAULT NULL,
                          `edit_user` tinyint(1) DEFAULT NULL,
                          `delete_booking` tinyint(1) DEFAULT NULL,
                          `edit_booking` tinyint(1) DEFAULT NULL,
                          `picking` tinyint(1) DEFAULT NULL,
                          PRIMARY KEY (`role`)
);
/*DROP TABLE worker CASCADE;*/
CREATE TABLE `Worker` (
                          `worker_id` int(11) NOT NULL AUTO_INCREMENT,
                          `password` varchar(255) DEFAULT NULL,
                          `e_mail` varchar(255) DEFAULT NULL,
                          `user_identification` varchar(255) DEFAULT NULL,
                          `name` varchar(255) DEFAULT NULL,
                          `surname` varchar(255) DEFAULT NULL,
                          `role` varchar(100) DEFAULT NULL,
                          PRIMARY KEY (`worker_id`),
                          KEY `role` (`role`),
                          CONSTRAINT `Worker_ibfk_1` FOREIGN KEY (`role`) REFERENCES `Rights` (`role`) ON UPDATE CASCADE
);




CREATE TABLE `Project` (
                           `project_id` int(11) NOT NULL AUTO_INCREMENT,
                           `name` varchar(255) DEFAULT NULL,
                           `street` varchar(255) DEFAULT NULL,
                           `postcode` varchar(255) DEFAULT NULL,
                           `city` varchar(255) DEFAULT NULL,
                           PRIMARY KEY (`project_id`)
)

CREATE TABLE `LOGS` (
                        `log_id` int(11) NOT NULL AUTO_INCREMENT,
                        `level` varchar(255) DEFAULT NULL,
                        `message` longtext,
                        PRIMARY KEY (`log_id`)
);

CREATE TABLE `Location` (
                            `time` time NOT NULL DEFAULT '00:00:00',
                            `date` date DEFAULT NULL,
                            `gps` varchar(255) DEFAULT NULL,
                            `device_doc_number` varchar(255) DEFAULT NULL,
                            PRIMARY KEY (`time`)
);
CREATE TABLE `Device` (
                          `inventory_number` int(11) NOT NULL,
                          `status` tinyint(1) DEFAULT NULL,
                          `designation` varchar(255) DEFAULT NULL,
                          `serial_number` varchar(255) DEFAULT NULL,
                          `gurantee` date DEFAULT NULL,
                          `category` enum('Rüttelplatten','Stampfer','Motorflex','Rohrgreifer','Kettensägen','Motorhammer','Leiter','Exoten') DEFAULT NULL,
                          `note` text,
                          `reservation_status` tinyint(1) DEFAULT NULL,
                          PRIMARY KEY (`inventory_number`)
);
CREATE TABLE `Device_documentation` (
                                        `device_doc_number` int(11) NOT NULL AUTO_INCREMENT,
                                        `inventory_number` int(11) DEFAULT NULL,
                                        PRIMARY KEY (`device_doc_number`),
                                        KEY `inventory_number` (`inventory_number`),
                                        CONSTRAINT `Device_documentation_ibfk_1` FOREIGN KEY (`inventory_number`) REFERENCES `Device` (`inventory_number`) ON UPDATE CASCADE
);

CREATE TABLE `Repair` (
                          `time` time NOT NULL DEFAULT '00:00:00',
                          `date` date DEFAULT NULL,
                          `comment` varchar(255) DEFAULT NULL,
                          `device_doc_number` int(11) DEFAULT NULL,
                          PRIMARY KEY (`time`),
                          KEY `device_doc_number` (`device_doc_number`),
                          CONSTRAINT `Repair_ibfk_1` FOREIGN KEY (`device_doc_number`) REFERENCES `Device_documentation` (`device_doc_number`) ON UPDATE CASCADE
);

CREATE TABLE `Uvv` (
                       `time` time NOT NULL DEFAULT '00:00:00',
                       `date` date DEFAULT NULL,
                       `status` tinyint(1) DEFAULT NULL,
                       `device_doc_number` int(11) DEFAULT NULL,
                       PRIMARY KEY (`time`),
                       KEY `device_doc_number` (`device_doc_number`),
                       CONSTRAINT `Uvv_ibfk_1` FOREIGN KEY (`device_doc_number`) REFERENCES `Device_documentation` (`device_doc_number`) ON UPDATE CASCADE
);


CREATE TABLE `Tuev` (
                        `time` time NOT NULL DEFAULT '00:00:00',
                        `date` date DEFAULT NULL,
                        `status` tinyint(1) DEFAULT NULL,
                        `device_doc_number` int(11) DEFAULT NULL,
                        PRIMARY KEY (`time`),
                        KEY `device_doc_number` (`device_doc_number`),
                        CONSTRAINT `Tuev_ibfk_1` FOREIGN KEY (`device_doc_number`) REFERENCES `Device_documentation` (`device_doc_number`) ON UPDATE CASCADE
);


CREATE TABLE `Borrows` (
                           `loan_day` date NOT NULL DEFAULT '0000-00-00',
                           `loan_end` date DEFAULT NULL,
                           `loan_period` date DEFAULT NULL,
                           `worker_id` int(11) DEFAULT NULL,
                           `inventory_number` int(11) DEFAULT NULL,
                           `project_id` int(11) DEFAULT NULL,
                           PRIMARY KEY (`loan_day`),
                           KEY `inventory_number` (`inventory_number`),
                           KEY `project_id` (`project_id`),
                           CONSTRAINT `Borrows_ibfk_2` FOREIGN KEY (`inventory_number`) REFERENCES `Device` (`inventory_number`) ON UPDATE CASCADE,
                           CONSTRAINT `Borrows_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `Project` (`project_id`) ON UPDATE CASCADE
);