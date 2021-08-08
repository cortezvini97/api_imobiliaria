'use strict'
const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
var bodyParser = require('body-parser')

const config = dotenv.config();

const routes = require('./v2/routes/');

const {serverport} = config.parsed;

const app = express();

const server = http.createServer(app);

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.redirect('https://vcinsidedigital.com.br');
})
app.use("/v2",routes);

server.listen(serverport, ()=>{
    console.log(`Serividot inicializado na porta ${serverport}`)
});