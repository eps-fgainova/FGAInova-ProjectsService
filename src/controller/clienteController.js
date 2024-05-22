const { Cliente } = require('../model/cliente');
const { Pessoa } = require('../model/pessoa');
const validator = require('../utils/validator');
const PessoaController = require('./pessoaController');

class ClienteController extends PessoaController {
  constructor(options) {
    if (options) {
      super(options);
    } else {
      super({ Model: Cliente });
    }
  }

  async create(req, res) {
    const { nome, email, senha } = req.body;

    try {
      validator.validatePassword(senha);

      const cliente = new Pessoa({
        nome,
        email,
        senha,
      });

      const clienteSalvo = await cliente.save();

      res.status(201).send(clienteSalvo);
    } catch (err) {
      res.send({ erro: err.message, stack: err.stack });
    }
  }
}

module.exports = { ClienteController };
