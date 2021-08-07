const db = require('../DB');

const Clientes = db.sequelize.define('clientes', {
    nome: {
        type: db.DataTypes.STRING(60),
        allowNull: false
    },
    empresa: {
        type: db.DataTypes.STRING(60),
        allowNull: false
    },
    cnpj: {
        type: db.DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: db.DataTypes.STRING(90),
        allowNull: false
    },
    senha: {
        type: db.DataTypes.TEXT,
        allowNull: false
    },
    site:{
        type: db.DataTypes.TEXT,
        allowNull: false
    }, 
    logo: {
        type: db.DataTypes.TEXT,
        allowNull: false
    },
    estado: {
        type: db.DataTypes.STRING(2),
        allowNull: false
    },
    cidade: {
        type: db.DataTypes.STRING(70),
        allowNull: false
    },
    cep: {
        type: db.DataTypes.STRING(60),
        allowNull: false
    },
    bairro: {
        type: db.DataTypes.STRING(90),
        allowNull: false
    },
    rua: {
        type: db.DataTypes.STRING(90),
        allowNull: false
    },
    categoria:{
        type: db.DataTypes.STRING(60),
        allowNull: false
    },
    chave: {
        type: db.DataTypes.STRING(80),
        allowNull: false
    },
    palavra_secreta:{
        type: db.DataTypes.STRING(60),
        allowNull: true
    },
    api_key:{
        type: db.DataTypes.TEXT,
        allowNull: true
    },
    login: {
        type: db.DataTypes.INTEGER(11),
        allowNull: false
    }
});


module.exports = {
    createTable: async ()=>
    {
        Clientes.sync({force: true})
    },
    clientes: Clientes
}