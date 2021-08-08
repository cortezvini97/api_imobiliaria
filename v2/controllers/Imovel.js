const Imoveis = require('../models/Imoveis.js');
const auth = require('../services/auth-service.js');
const { Op } = require("sequelize");


async function getGalery (id_imovel, id_user)
{
    try{

        const galery = await Imoveis.galery.findAll();
    
        return galery;
    }catch(error)
    {
        
    }
}


module.exports = {
    listAllDestaques: async (req, res)=>
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        var data = auth.decodeToken(token);

        await Imoveis.imovel.findAll({where: {
            [Op.and]: [
                {id_user: data.id},
                {status: req.params.status},
                {destaque: 1}
            ]
        }, attributes:{
            exclude: ['createdAt', 'updatedAt']
        }}).then((imoveis)=>{
            res.status(200).json(imoveis)
        }).catch((error)=>
        {
         res.status(500).json(error)
        })
    },
    listAll: async(req, res)=>
    {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        var data = auth.decodeToken(token);

       await Imoveis.imovel.findAll({where: {
           [Op.and]: [
               {id_user: data.id},
               {status: req.params.status}
           ]
       }, attributes:{
           exclude: ['createdAt', 'updatedAt']
       }}).then((imoveis)=>{
           res.status(200).json(imoveis)
       }).catch((error)=>
       {
        res.status(500).json(error)
       })
    },
    getImovel: async (req, res)=>
    {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var data = auth.decodeToken(token);
        try
        {
            const imoveis = await Imoveis.imovel.findAll({where: {
                [Op.and]: [{id_user: data.id}, {url: req.params.url}]
            }, attributes: {exclude: ['createdAt', 'updatedAt']}});

            const dadosImovel = imoveis[0];
            const galery = await Imoveis.galery.findAll({where: {
                [Op.and]: [{id_user: data.id}, {id_imovel: dadosImovel.id}]
            }, attributes:{exclude: ['createdAt', 'updatedAt']}});
            
            dadosImovel.dataValues.galery = galery

            res.status(200).json(dadosImovel)
        }catch(error)
        {
            res.status(500).json(error)
        }
    },
    getImoveisRurais: async (req, res)=>
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var data = auth.decodeToken(token);

        await Imoveis.imovel.findAll({where: {
            [Op.and]: [{id_user: data.id}, {
                [Op.or]:[{tipo_imovel: "Chácara"}, {tipo_imovel: "Fazenda"}, {tipo_imovel: "Sítio"}]
            }]
        }, attributes:{
            exclude: ['createdAt', 'updatedAt']
        }}).then((imoveis)=>{
            res.status(200).json(imoveis)
        }).catch((error)=>
        {
         res.status(500).json(error)
        });
    },
    getImoveisCategories: async (req, res)=>{
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var data = auth.decodeToken(token);

        await Imoveis.imovel.findAll({where: {
            [Op.and]: [{id_user: data.id}, {categoria: req.params.categoria}]
        }, attributes:{
            exclude: ['createdAt', 'updatedAt']
        }}).then((imoveis)=>{
            res.status(200).json(imoveis)
        }).catch((error)=>
        {
         res.status(500).json(error)
        });
    },
    getResultadoBusca: async (req, res)=>{
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var data = auth.decodeToken(token);

        const {locacaoVendaRural, tipoImovel, estado, cidade, bairro, precomin, precomax} =  req.body.dados;

        if(locacaoVendaRural != null && tipoImovel != null && estado == null && cidade == null && bairro == null && precomin == null && precomax == null)
        {
           await Imoveis.imovel.findAll({where:{
               [Op.and]:[{id_user: data.id}, {status: locacaoVendaRural}, {tipo_imovel: tipoImovel}]
           }, attributes: {exclude:['createdAt', 'updatedAt']}}).then((imoveis)=>{
               res.status(200).json(imoveis)
           }).catch((error)=>{
            res.status(500).json(error)
           });
        }else if(locacaoVendaRural != null && tipoImovel != null && estado != null && cidade == null && bairro == null && precomin == null && precomax == null)
        {
            await Imoveis.imovel.findAll({where:{
                [Op.and]:[{id_user: data.id}, {status: locacaoVendaRural}, {tipo_imovel: tipoImovel}, {estado: estado}]
           }, attributes: {exclude:['createdAt', 'updatedAt']}}).then((imoveis)=>{
               res.status(200).json(imoveis)
           }).catch((error)=>{
            res.status(500).json(error)
           });
        }else if(locacaoVendaRural != null && tipoImovel != null && estado == null && cidade == null && bairro == null && precomin != null && precomax == null)
        {
            await Imoveis.imovel.findAll({where:{
                [Op.and]:[{id_user: data.id}, {status: locacaoVendaRural}, {tipo_imovel: tipoImovel}, {valor: {[Op.gte]: precomin}}]
           }, attributes: {exclude:['createdAt', 'updatedAt']}}).then((imoveis)=>{
               res.status(200).json(imoveis)
           }).catch((error)=>{
            res.status(500).json(error)
           });
        }else if(locacaoVendaRural != null && tipoImovel != null && estado == null && cidade == null && bairro == null && precomin == null && precomax != null)
        {
            await Imoveis.imovel.findAll({where:{
                [Op.and]:[{id_user: data.id}, {status: locacaoVendaRural}, {tipo_imovel: tipoImovel}, {valor: {[Op.lte]: precomax}}]
           }, attributes: {exclude:['createdAt', 'updatedAt']}}).then((imoveis)=>{
               res.status(200).json(imoveis)
           }).catch((error)=>{
            res.status(500).json(error)
           });
        }else if(locacaoVendaRural != null && tipoImovel != null && estado != null && cidade != null && bairro == null && precomin == null && precomax == null)
        {
            await Imoveis.imovel.findAll({where:{
                [Op.and]:[{id_user: data.id}, {status: locacaoVendaRural}, {tipo_imovel: tipoImovel}, {estado: estado}, {cidade: cidade}]
           }, attributes: {exclude:['createdAt', 'updatedAt']}}).then((imoveis)=>{
               res.status(200).json(imoveis)
           }).catch((error)=>{
            res.status(500).json(error)
           });
        }else if(locacaoVendaRural != null && tipoImovel != null && estado == null && cidade == null && bairro == null && precomin != null && precomax != null)
        {
            await Imoveis.imovel.findAll({where:{
                [Op.and]:[{id_user: data.id}, {status: locacaoVendaRural}, {tipo_imovel: tipoImovel}, {valor: {[Op.gte]: precomin}}, {valor: {[Op.lte]: precomax}}]
           }, attributes: {exclude:['createdAt', 'updatedAt']}}).then((imoveis)=>{
               res.status(200).json(imoveis)
           }).catch((error)=>{
            res.status(500).json(error)
           });
        }else if(locacaoVendaRural != null && tipoImovel != null && estado != null && cidade != null && bairro != null && precomin == null && precomax == null)
        {
            await Imoveis.imovel.findAll({where:{
                [Op.and]:[{id_user: data.id}, {status: locacaoVendaRural}, {tipo_imovel: tipoImovel}, {estado: estado}, {cidade: cidade}, {bairro: bairro}]
           }, attributes: {exclude:['createdAt', 'updatedAt']}}).then((imoveis)=>{
               res.status(200).json(imoveis)
           }).catch((error)=>{
            res.status(500).json(error)
           });
        }else if(locacaoVendaRural != null && tipoImovel != null && estado != null && cidade != null && bairro != null && precomin != null && precomax == null)
        {
            await Imoveis.imovel.findAll({where:{
                [Op.and]:[{id_user: data.id}, {status: locacaoVendaRural}, {tipo_imovel: tipoImovel}, {estado: estado}, {cidade: cidade}, {bairro: bairro}, {valor: {[Op.gte]: precomin}}]
           }, attributes: {exclude:['createdAt', 'updatedAt']}}).then((imoveis)=>{
               res.status(200).json(imoveis)
           }).catch((error)=>{
            res.status(500).json(error)
           });
        }else if(locacaoVendaRural != null && tipoImovel != null && estado != null && cidade != null && bairro != null && precomin == null && precomax != null)
        {
            await Imoveis.imovel.findAll({where:{
                [Op.and]:[{id_user: data.id}, {status: locacaoVendaRural}, {tipo_imovel: tipoImovel}, {estado: estado}, {cidade: cidade}, {bairro: bairro}, {valor: {[Op.lte]: precomax}}]
           }, attributes: {exclude:['createdAt', 'updatedAt']}}).then((imoveis)=>{
               res.status(200).json(imoveis)
           }).catch((error)=>{
            res.status(500).json(error)
           });
        }else if(locacaoVendaRural != null && tipoImovel != null && estado != null && cidade != null && bairro != null && precomin != null && precomax != null)
        {
            await Imoveis.imovel.findAll({where:{
                [Op.and]:[{id_user: data.id}, {status: locacaoVendaRural}, {tipo_imovel: tipoImovel}, {estado: estado}, {cidade: cidade}, {bairro: bairro}, {valor: {[Op.gte]: precomin}}, {valor: {[Op.lte]: precomax}}]
           }, attributes: {exclude:['createdAt', 'updatedAt']}}).then((imoveis)=>{
               res.status(200).json(imoveis)
           }).catch((error)=>{
            res.status(500).json(error)
           });
        }
    }
}