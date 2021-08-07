const Estados = require('../models/Estados.js');
const auth = require('../services/auth-service.js');


module.exports = {
    listAll: async (req, res)=>
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        var data = auth.decodeToken(token);

        await Estados.estados.findAll({where: {id_user: data.id}, attributes: {exclude: ['createdAt','updatedAt']}}).then((estados)=>
        {
            res.json(estados)
        }).catch((error)=>{

        })

    }
}