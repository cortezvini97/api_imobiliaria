const express = require('express');
const auth = require('../services/auth-service');
const controller = require('../controllers/Imovel');
const imoveisRoutes = express.Router();

imoveisRoutes.get('/destaques/:status', auth.authorize, controller.listAllDestaques);
imoveisRoutes.get('/listall/:status', auth.authorize, controller.listAll);
imoveisRoutes.get('/getimovel/:url', auth.authorize, controller.getImovel);
imoveisRoutes.get('/getImoveisRurais', auth.authorize, controller.getImoveisRurais);
imoveisRoutes.get('/getimoveisCategory/:categoria', auth.authorize, controller.getImoveisCategories);
imoveisRoutes.post('/getresultadobusca', auth.authorize, controller.getResultadoBusca);

module.exports = imoveisRoutes;