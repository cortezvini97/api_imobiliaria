const { Op } = require("sequelize");
const auth = require('../services/auth-service');
const Bairros = require('../models/Bairros');
module.exports = {
    listAll: async (req, res)=>{
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        var data = auth.decodeToken(token);

        await Bairros.bairros.findAll({where: {
            [Op.and]:[
                {id_user: data.id},
                {cidade: req.params.cidade}
            ]
        }, attributes:{
            exclude: ['createdAt', 'updatedAt']
        }}).then((bairros)=>{
            res.status(201).json(bairros)
        }).catch((error)=>{
            res.status(500).json(error)
        });
    }
}