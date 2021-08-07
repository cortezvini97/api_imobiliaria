const express = require('express');
const clientesRoutes = require('./clientes-routes');
const estadosRoutes = require('./estados-routes');
const cidadeRoutes = require('./cidades-routes');
const bairrosRoutes = require('./bairros-routes');
const tipoImovelRoutes = require('./tipo-imovel-routes')
const routes = express.Router();


routes.get('/', (req, res)=>{
    res.redirect('https://vcinsidedigital.com.br');
})

routes.use('/v2/clientes', clientesRoutes);
routes.use('/v2/estados', estadosRoutes);
routes.use('/v2/cidades', cidadeRoutes);
routes.use('/v2/bairros', bairrosRoutes);
routes.use('/v2/tipoimoveis', tipoImovelRoutes);



module.exports = routes;