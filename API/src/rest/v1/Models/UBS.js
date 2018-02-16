import { database } from "../../../Config/database";


export const UBS = database.sequelize.define('ubs', {
    'id': {
        'type': database.Sequelize.UUID,
        'primaryKey': true,
        'defaultValue': database.Sequelize.UUIDV4
    },
    'name': database.Sequelize.STRING,
    'address': database.Sequelize.STRING,
    'city': database.Sequelize.STRING,
    'phone': database.Sequelize.STRING,
    'geocode_lat': database.Sequelize.INTEGER,
    'geocode_lon': database.Sequelize.INTEGER,
    'score_size': database.Sequelize.ENUM(1, 2, 3),
    'score_adaptation_for_seniors': database.Sequelize.ENUM(1, 2, 3),
    'score_medical_equipment': database.Sequelize.ENUM(1, 2, 3),
    'score_medicine': database.Sequelize.ENUM(1, 2, 3)
});