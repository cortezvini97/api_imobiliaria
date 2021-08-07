const { Op } = require("sequelize");
const auth = require('../services/auth-service');
const TipoImoveis = require('../models/TipoImoveis');

module.exports = {
    listAll: async(req, res)=>{
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        var data = auth.decodeToken(token);

        await TipoImoveis.tipoImoveis.findAll({where:{
            id_user: data.id
        }, attributes:{
            exclude: ['createdAt', 'updatedAt']
        }}).then((tipo_imoveis)=>{
            res.status(200).json(tipo_imoveis)
        }).catch((error)=>{

            res.json(error)
        });
    }
}