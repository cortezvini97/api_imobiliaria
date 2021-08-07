const express = require('express');
const auth = require('../services/auth-service');
const controller = require('../controllers/Cidade');
const cidadeRoutes = express.Router();

cidadeRoutes.get('/:estado', auth.authorize, controller.listAll);

module.exports = cidadeRoutes;