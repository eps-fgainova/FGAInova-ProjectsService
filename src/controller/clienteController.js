const validator = require('validator'); // Biblioteca de validação de e-mails
const { Pessoa } = require('../model/pessoa');
const validatorUtil = require('../utils/validator');
const PessoaController = require('./pessoaController');

class ClienteController extends PessoaController {
  constructor(options) {
    if (options) {
      super(options);
    } else {
      super({ Model: Pessoa });
    }
  }

  async create(req, res) {
    const { nome, email, senha } = req.body;

    try {
      // Verifica se o e-mail é válido
      if (!validator.isEmail(email)) {
        throw new Error('Email inválido.');
      }

      // Verifica se o e-mail já existe na base de dados
      const emailExistente = await Pessoa.findOne({ email });
      if (emailExistente) {
        throw new Error('Email já cadastrado.');
      }

      // Validação de senha
      validatorUtil.validatePassword(senha);

      // Cria um novo cliente
      const cliente = new Pessoa({
        nome,
        email,
        senha,
      });

      // Salva o cliente no banco de dados
      const clienteSalvo = await cliente.save();

      res.status(201).send(clienteSalvo);
    } catch (err) {
      res.status(400).send({ erro: err.message, stack: err.stack });
    }
  }
}

module.exports = { ClienteController };
