const express = require('express');
const auth = require('../services/auth-service');
const controller = require('../controllers/Bairro');
const bairrosRoutes = express.Router();


bairrosRoutes.get('/:cidade', auth.authorize, controller.listAll)

module.exports = bairrosRoutes;