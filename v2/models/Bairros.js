const db = require('../DB');

const Bairros = db.sequelize.define('imobiliaria_bairros', {
    id_user: {
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    bairro: {
        type: db.DataTypes.STRING(60),
        allowNull: false
    },
    cidade: {
        type: db.DataTypes.STRING(60),
        allowNull: false
    },
    mapa:{
        type: db.DataTypes.TEXT,
        allowNull: false
    }

});

module.exports = {
    crateTable: async ()=>
    {
        Bairros.sync({force: true})
    },
    bairros: Bairros
}