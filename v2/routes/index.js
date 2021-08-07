const express = require('express');
const clientesRoutes = require('./clientes');

const routes = express.Router();

routes.get('/v2', (req, res)=>{
    res.send("certo")
});


routes.use('/v2/clientes', clientesRoutes);




module.exports = routes;