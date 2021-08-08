const db = require('../DB');

const Imovel = db.sequelize.define('imobiliaria_imoveis', {
    id_user:{
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    codigo: {
        type: db.DataTypes.STRING(60),
        allowNull: false
    },
    status: {
        type: db.DataTypes.STRING(60),
        allowNull: false
    },
    categoria: {
        type: db.DataTypes.STRING(60),
        allowNull: true
    },
    descricao: {
        type: db.DataTypes.TEXT,
        allowNull: false
    },
    valor: {
        type: db.DataTypes.DECIMAL(15,2),
        allowNull: false
    },
    tipo_imovel: {
        type: db.DataTypes.STRING(60),
        allowNull: false
    },
    Bairro:{
        type: db.DataTypes.STRING(60),
        allowNull: false
    },
    numero: {
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    rua: {
        type: db.DataTypes.STRING(80),
        allowNull: false
    },
    cidade: {
        type: db.DataTypes.STRING(80),
        allowNull: false
    },
    estado: {
        type: db.DataTypes.STRING(2),
        allowNull: false
    },
    suites:{
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    dormitorios	:{
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    garagens:{
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    banheiros: {
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    terreno: {
        type: db.DataTypes.DECIMAL(15,2),
        allowNull: false
    },
    foto_capa: {
        type: db.DataTypes.TEXT,
        allowNull: false
    },
    destaque:{
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    url: {
        type: db.DataTypes.STRING(90),
        allowNull: false
    }
});

const ImovelGalery = db.sequelize.define('imobiliaria_imoveis_galeria',{
    id_user:{
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    id_imovel:{
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    id_foto:{
        type: db.DataTypes.INTEGER,
        allowNull: false
    },
    foto:{
        type: db.DataTypes.TEXT,
        allowNull: false
    }
});


module.exports = 
{
    createTable: async ()=>{
        Imovel.sync({force: true})
        ImovelGalery.sync({force: true})
    },
    imovel: Imovel,
    galery: ImovelGalery
}