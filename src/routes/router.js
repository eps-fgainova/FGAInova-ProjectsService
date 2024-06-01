const { Router } = require('express');
const verificaToken = require('../midllewares/verificaToken');
const { upload } = require('../utils/multer');

const ProjetoController = require('../controller/ProjetoController');

const routes = new Router();

routes.get('/', (req, res) => {
  return res.send({ message: 'API Online! =) PROJETO' });
});

// Rotas de Projeto
routes.post('/projeto', verificaToken, upload.fields([
  { name: 'banner', maxCount: 1 },
  { name: 'logo', maxCount: 1 },
  { name: 'imagens', maxCount: 10 } // Permitir o upload de até 10 imagens
]), (req, res) => ProjetoController.create(req, res));

routes.get('/projeto', verificaToken, (req, res) => ProjetoController.list(req, res));
routes.get('/projeto/:id', verificaToken, (req, res) => ProjetoController.getById(req, res));

routes.put('/projeto/:id', verificaToken, upload.fields([
  { name: 'banner', maxCount: 1 },
  { name: 'logo', maxCount: 1 },
  { name: 'imagens', maxCount: 10 }
]), (req, res) => ProjetoController.update(req, res));

routes.delete('/projeto/:id', verificaToken, (req, res) => ProjetoController.delete(req, res));

routes.get('/projetos/usuario', verificaToken, (req, res) => ProjetoController.listByUser(req,res));

// Projetos - Rota sem autenticação para listar todos os projetos
routes.get('/projetos/all', (req, res) => ProjetoController.listAll(req, res));

// Projetos - Rota sem autenticação para listar os 3 primeiros projetos
routes.get('/projetos/top3', (req, res) => ProjetoController.listTopThree(req, res));

// Projetos - Rota sem autenticação para buscar projeto
routes.get('/projetos/public/:id', (req, res) => ProjetoController.getByIdPublic(req, res));

// Retornar os projetos relacionados ao id da pessoa

module.exports = routes;