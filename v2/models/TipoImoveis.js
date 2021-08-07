const db = require('../DB');

const TipoImoveis = db.sequelize.define('imobiliaria_tipo_imoveis', {
    id_user: {
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    tipo_imovel: {
        type: db.DataTypes.STRING(60),
        allowNull: false
    },
    categoria: {
        type: db.DataTypes.STRING(60),
        allowNull: false
    }
});

module.exports = {
    createTable: async ()=>{
        TipoImoveis.sync({force: true})
    },
    tipoImoveis: TipoImoveis
}
