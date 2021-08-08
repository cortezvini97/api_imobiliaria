const db = require('../DB');

const Cidades = db.sequelize.define('imobiliaria_cidades', {
    id_user: {
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    estado_uf: {
        type: db.DataTypes.STRING(2),
        allowNull: false
    },
    cidade: {
        type: db.DataTypes.STRING(80),
        allowNull: false
    },
    cep: {
        type: db.DataTypes.STRING(20),
        allowNull: false
    }
});


module.exports = {
    createTable: async ()=>
    {
        Cidades.sync({force: true});
    },
    cidades:Cidades
}