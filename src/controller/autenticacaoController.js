const { pessoaFactory } = require('../factories/pessoaFactory');
const jwt = require('../utils/jwt');

async function signIn(req, res) {
  const { email, senha, tipo = 'Cliente' } = req.body;

  try {
    const pessoa = await pessoaFactory.findPessoa(tipo, email);

    if (!pessoa) {
      throw new Error(
        `Não foi possível encontrar nenhum usuário do tipo ${tipo} com o email informado`,
      );
    }
    if (pessoa.senha !== senha) {
      throw new Error('Senha incorreta');
    }
    const token = jwt.sign({ id: pessoa.id, tipo });

    // Convertendo o documento Mongoose para um objeto JavaScript puro
    const pessoaObj = pessoa.toObject();
    delete pessoaObj.senha;

    res.send({ pessoa: pessoaObj, token });
  } catch (error) {
    res.status(400).send({ erro: error.message });
  }
}

module.exports = { signIn };
