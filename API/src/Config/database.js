import Sequelize from 'sequelize';

const sequelize = new Sequelize('bionexo', 'root', 'n0_n33d_f0r_s3cur1ty', {
    'host': '127.0.0.1',
    'dialect': 'mysql'
});

export const database = {
    sequelize,
    Sequelize
}