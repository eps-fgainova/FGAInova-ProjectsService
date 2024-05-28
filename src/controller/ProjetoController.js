/* eslint-disable consistent-return */
const { Projeto } = require('../model/project');

class ProjetoController {
  async create(req, res) {
    try {
      const {
        titulo,
        descricao,
        descricaoCurta,
        linksRedesSociais,
        linkVideo,
        tags,
      } = req.body;
      const { pessoaId } = req;

      const projeto = new Projeto({
        titulo,
        descricao,
        descricaoCurta,
        linksRedesSociais,
        linkVideo,
        tags,
        pessoaId,
      });      

      await projeto.save();
      res.status(201).send(projeto);
    } catch (error) {
      res.status(400).send({ error: 'Erro ao criar projeto', details: error });
    }
  }

  async list(req, res) {    
    try {
      const projetos = await Projeto.find({ pessoaId: req.pessoaId });
      res.status(200).send(projetos);
    } catch (error) {
      res
        .status(400)
        .send({ error: 'Erro ao listar projetos', details: error });
    }
  }

  // async listAll(req, res) {
  //   try {
  //     const projetos = await Projeto.find({});
  //     res.status(200).send(projetos);
  //   } catch (error) {
  //     res.status(400).send({ error: 'Erro ao listar projetos', details: error });
  //   }
  // }

  async listAll(req, res) {
    try {
      const { titulo } = req.query;
      let query = {};
      
      if (titulo) {
        // Usando uma expressão regular para realizar uma busca case-insensitive
        query = { titulo: new RegExp(titulo, 'i') };
      }

      const projetos = await Projeto.find(query);
      res.status(200).send(projetos);
    } catch (error) {
      res.status(400).send({ error: 'Erro ao listar projetos', details: error });
    }
  }

  async listTopThree(req, res) {
    try {
      const projetos = await Projeto.find({}).limit(3);
      res.status(200).send(projetos);
    } catch (error) {
      res.status(400).send({ error: 'Erro ao listar projetos', details: error });
    }
  }

  async getById(req, res) {
    try {
      const projeto = await Projeto.findById(req.params.id);
      if (!projeto || projeto.pessoaId.toString() !== req.pessoaId) {
        return res.status(404).send({ error: 'Projeto não encontrado' });
      }
      res.status(200).send(projeto);
    } catch (error) {
      res.status(400).send({ error: 'Erro ao buscar projeto', details: error });
    }
  }


  async getByIdPublic(req, res) {
    try {
      const projeto = await Projeto.findById(req.params.id);
      if (!projeto) {
        return res.status(404).send({ error: 'Projeto não encontrado' });
      }
      res.status(200).send(projeto);
    } catch (error) {
      res.status(400).send({ error: 'Erro ao buscar projeto', details: error });
    }
  }

  async update(req, res) {
    try {
      const projeto = await Projeto.findById(req.params.id);
      if (!projeto || projeto.pessoaId.toString() !== req.pessoaId) {
        return res.status(404).send({ error: 'Projeto não encontrado' });
      }

      const {
        titulo,
        descricao,
        descricaoCurta,
        linksRedesSociais,
        linkVideo,
        tags,
      } = req.body;
      projeto.titulo = titulo || projeto.titulo;
      projeto.descricao = descricao || projeto.descricao;
      projeto.descricaoCurta = descricaoCurta || projeto.descricaoCurta;
      projeto.linksRedesSociais =
        linksRedesSociais || projeto.linksRedesSociais;
      projeto.linkVideo = linkVideo || projeto.linkVideo;
      projeto.tags = tags || projeto.tags;

      await projeto.save();
      res.status(200).send(projeto);
    } catch (error) {
      res
        .status(400)
        .send({ error: 'Erro ao atualizar projeto', details: error });
    }
  }

  async delete(req, res) {
    try {
      const projeto = await Projeto.findById(req.params.id);
      if (!projeto || projeto.pessoaId.toString() !== req.pessoaId) {
        return res.status(404).send({ error: 'Projeto não encontrado' });
      }

      await projeto.remove();
      res.status(200).send({ message: 'Projeto removido com sucesso' });
    } catch (error) {
      res
        .status(400)
        .send({ error: 'Erro ao remover projeto', details: error });
    }
  }
  
}

module.exports = new ProjetoController();
