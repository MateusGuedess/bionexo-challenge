import Sequelize from 'sequelize';
import { sequelize } from "../../../Config/database";


export const UBS = sequelize.define('ubs', {
    'id': {
        'type': Sequelize.INTEGER,
        'primaryKey': true,
        'autoIncrement': true
    },
    'name': { 'type': Sequelize.STRING, 'allowNull': false },
    'address': { 'type': Sequelize.STRING, 'allowNull': false },
    'city': { 'type': Sequelize.STRING, 'allowNull': false },
    'phone': { 'type': Sequelize.STRING, 'allowNull': false },
    'geocode_lat': { 'type': Sequelize.STRING, 'allowNull': false },
    'geocode_lon': { 'type': Sequelize.STRING, 'allowNull': false },
    'score_size': { 'type': Sequelize.ENUM(1, 2, 3), 'allowNull': false },
    'score_adaptation_for_seniors': { 'type': Sequelize.ENUM(1, 2, 3), 'allowNull': false },
    'score_medical_equipment': { 'type': Sequelize.ENUM(1, 2, 3), 'allowNull': false },
    'score_medicine': { 'type': Sequelize.ENUM(1, 2, 3), 'allowNull': false }
}, {
    'createdAt': false,
    'updatedAt': false,
    'deletedAt': false
});