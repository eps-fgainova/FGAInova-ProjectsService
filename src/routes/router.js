const { Router } = require('express');
const verificaToken = require('../midllewares/verificaToken');

const ProjetoController = require('../controller/ProjetoController');

const routes = new Router();

routes.get('/', (req, res) => {
  return res.send({ message: 'API Online! =) PROJETO' });
});

// Rotas de Projeto
routes.post('/projeto', verificaToken, (req, res) => ProjetoController.create(req, res));
routes.get('/projeto', verificaToken, (req, res) => ProjetoController.list(req, res));
routes.get('/projeto/:id', verificaToken, (req, res) => ProjetoController.getById(req, res));
routes.put('/projeto/:id', verificaToken, (req, res) => ProjetoController.update(req, res));
routes.delete('/projeto/:id', verificaToken, (req, res) => ProjetoController.delete(req, res));

// Projetos - Rota sem autenticação para listar todos os projetos
routes.get('/projetos/all', (req, res) => ProjetoController.listAll(req, res));

// Projetos - Rota sem autenticação para listar os 3 primeiros projetos
routes.get('/projetos/top3', (req, res) => ProjetoController.listTopThree(req, res));

// Projetos - Rota sem autenticação para buscar projeto
routes.get('/projetos/public/:id', (req, res) => ProjetoController.getByIdPublic(req, res));

module.exports = routes;