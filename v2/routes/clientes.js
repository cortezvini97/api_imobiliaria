const express = require('express');
const controller = require('../controllers/Cliente');
const auth = require('../services/auth-service');
const clientesRoutes = express.Router();



clientesRoutes.get('/', auth.authorize ,controller.listAll);

clientesRoutes.post('/login',controller.login);



module.exports = clientesRoutes;