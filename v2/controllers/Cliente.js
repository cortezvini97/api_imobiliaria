const Clientes = require('../models/Clientes.js');
const auth = require('../services/auth-service.js');
var bcryptjs = require('bcryptjs');

module.exports = {
    /*listAll: async (req, res)=>
    {
        await Clientes.clientes.findAll({attributes: {exclude: ['senha', 'api_key', 'chave', 'palavra_secreta', 'login', 'createdAt', 'updatedAt', 'cnpj']}}).then((clientes)=>{
            res.status(200).json(clientes);
        }).catch((error)=>{
            res.status(500).json(error);
        })
    },*/
    login: async(req, res)=>
    {
        await Clientes.clientes.findAll({where: {empresa: req.body.empresa}, attributes: {exclude: ['createdAt','updatedAt']}}).then((user)=>{

            if(user.length > 0)
            {
                const senha = req.body.senha;

                const userDados = user[0];

                let senhaUserEncrypt = userDados.senha;

                senhaUserEncrypt = senhaUserEncrypt.replace('$2y$', '$2a$');

                bcryptjs.compare(senha, senhaUserEncrypt).then((bool)=>{
                    if(bool == true)
                    {
                       let token = auth.token(userDados);
                        res.status(201).json({msg: "Usuário Logado com Sucesso.", token: token})
                    }else
                    {
                     res.status(401).json({msg: "Usuário Inválido", token: null})
                    }
                }).catch((error)=>{
                    res.status(401).json({msg: "Usuário Inválido", token: null})
               });

            }else
            {
                res.status(401).json({msg: "Usuário Inválido", token: null})
            }

        }).catch((error)=>{
            res.status(500).json(error)
        });
        
        
    }
}