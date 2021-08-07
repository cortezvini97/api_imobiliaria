const express = require('express');
const auth = require('../services/auth-service');
const controller = require('../controllers/Estado');
const estadosRoutes = express.Router();


estadosRoutes.get('/', auth.authorize, controller.listAll);

module.exports = estadosRoutes;