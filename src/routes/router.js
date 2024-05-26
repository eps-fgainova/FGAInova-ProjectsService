const { Router } = require('express');
const { ClienteController } = require('../controller/clienteController');
const AutenticacaoController = require('../controller/autenticacaoController');
const verificaToken = require('../midllewares/verificaToken');
const ProjetoController = require('../controller/ProjetoController');

const routes = new Router();

routes.get('/', (req, res) => {
  return res.send({ message: 'API Online! =)' });
});

// Autenticação
routes.post('/signin', AutenticacaoController.signIn);

// Cliente
const clienteController = new ClienteController();
routes.post('/cliente', (req, res) => clienteController.create(req, res));

// Retornar todos os clientes
routes.get('/cliente/all', verificaToken, (req, res) =>
  clienteController.index(req, res),
);
// Retornar info do usuário
routes.get('/cliente/:id', verificaToken, (req, res) =>
  clienteController.userInfoById(req, res),
);
routes.delete('/cliente/:email', verificaToken, (req, res) =>
  clienteController.destroy(req, res),
);
routes.put('/cliente/:email', verificaToken, (req, res) =>
  clienteController.update(req, res),
);

// Rotas de Projeto
routes.post('/projeto', verificaToken, (req, res) => ProjetoController.create(req, res));
routes.get('/projeto', verificaToken, (req, res) => ProjetoController.list(req, res));
routes.get('/projeto/:id', verificaToken, (req, res) => ProjetoController.getById(req, res));
routes.put('/projeto/:id', verificaToken, (req, res) => ProjetoController.update(req, res));
routes.delete('/projeto/:id', verificaToken, (req, res) => ProjetoController.delete(req, res));



module.exports = routes;
