CREATE SCHEMA IF NOT EXISTS `bionexo`;

CREATE TABLE IF NOT EXISTS `bionexo`.`ubs` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `address` varchar(100) NOT NULL,
    `city` varchar(100) NOT NULL,
    `phone` varchar(80) NOT NULL,
    `geocode_lat` decimal(10, 8) NOT NULL,
    `geocode_lon` decimal(11, 8) NOT NULL,
    `score_size` int(11) NOT NULL,
    `score_adaptation_for_seniors` int(11) NOT NULL,
    `score_medical_equipment` int(11) NOT NULL,
    `score_medicine` int(11) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8982814 DEFAULT CHARSET=latin1;
