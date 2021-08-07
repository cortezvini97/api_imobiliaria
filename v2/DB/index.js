const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
const config = dotenv.config();

const {host, db, user, password} = config.parsed;

const sequelize = new Sequelize(db, user, password, {
    host: host,
    dialect: 'mysql'
});

module.exports = {
    debug: async ()=>
    {
        try
        {
            await sequelize.authenticate();
        }catch(error)
        {
            console.log(error)
        }
    },
    sequelize: sequelize,
    DataTypes: DataTypes
};