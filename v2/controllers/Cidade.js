const { Op } = require("sequelize");
const auth = require('../services/auth-service');
const Cidades = require('../models/Cidades');
module.exports = {
    listAll: async (req, res)=>
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        var data = auth.decodeToken(token);

        await Cidades.cidades.findAll({where :{
            [Op.and]:  [
                {id_user: data.id}, 
                {estado_uf: req.params.estado}
            ]
        }, attributes: {exclude:[
            'createdAt', 'updatedAt'
        ]}}).then((cidades)=>{
            res.status(200).json(cidades)
        }).catch((error)=>res.status(500).json(error));
    }
}