CREATE TABLE IF NOT EXISTS `bionexo`.`ubs` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `address` varchar(100) NOT NULL,
    `city` varchar(100) NOT NULL,
    `phone` varchar(20) NOT NULL,
    `geocode_lat` float NOT NULL,
    `geocode_lon` float NOT NULL,
    `score_size` int(11) NOT NULL,
    `score_adaptation_for_seniors` int(11) NOT NULL,
    `score_medical_equipment` int(11) NOT NULL,
    `score_medicine` int(11) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8982814 DEFAULT CHARSET=latin1;
