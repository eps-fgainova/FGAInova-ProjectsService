const { Router } = require('express');
const { ClienteController } = require('../controller/clienteController');
const AutenticacaoController = require('../controller/autenticacaoController');
const verificaToken = require('../midllewares/verificaToken');

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

module.exports = routes;
