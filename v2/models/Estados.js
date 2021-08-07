const db = require('../DB');

const Estados = db.sequelize.define('imobiliaria_estados', {
    id_user:{
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: db.DataTypes.STRING(60),
        allowNull: false
    },
    estado_uf: {
        type: db.DataTypes.STRING(2),
        allowNull: false
    }
});

module.exports = {
    createTable: async ()=>{
        Estados.sync({force: true})
    },
    estados: Estados
};