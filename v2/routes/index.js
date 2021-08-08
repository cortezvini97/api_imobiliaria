const express = require('express');
const clientesRoutes = require('./clientes-routes');
const estadosRoutes = require('./estados-routes');
const cidadeRoutes = require('./cidades-routes');
const bairrosRoutes = require('./bairros-routes');
const tipoImovelRoutes = require('./tipo-imovel-routes');
const imoveisRoutes = require('./imoveis-routes');
const routes = express.Router();


routes.use('/clientes', clientesRoutes);
routes.use('/estados', estadosRoutes);
routes.use('/cidades', cidadeRoutes);
routes.use('/bairros', bairrosRoutes);
routes.use('/tipoimoveis', tipoImovelRoutes);
routes.use('/imoveis', imoveisRoutes);



module.exports = routes;