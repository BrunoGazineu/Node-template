const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController')

// Home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.formPost)

// Rotas de contato
route.get('/contato', contatoController.paginaInicial)

module.exports = route;