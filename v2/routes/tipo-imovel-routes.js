const express = require('express');
const auth = require('../services/auth-service');
const controller = require('../controllers/TipoImovel');
const tipoImovelRoutes = express.Router();


tipoImovelRoutes.get('/', auth.authorize, controller.listAll)

module.exports = tipoImovelRoutes;