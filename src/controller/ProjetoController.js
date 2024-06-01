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
      // Extrair URLs das imagens
      const bannerUrl = req.files.banner ? req.files.banner[0].path : null;
      const logoUrl = req.files.logo ? req.files.logo[0].path : null;
      const imagens = req.files.imagens ? req.files.imagens.map(file => file.path) : [];

      const projeto = new Projeto({
        titulo,
        descricao,
        descricaoCurta,
        linksRedesSociais,
        linkVideo,
        tags,
        pessoaId,
        bannerUrl,
        logoUrl,
        imagens,
      });      

      await projeto.save();
      res.status(201).send(projeto);
    } catch (error) {
      res.status(400).send({ error: 'Erro ao criar projeto', details: error });
    }
  }

  async list(req, res) {    
    try {
      const projetos = await Projeto.find({ aId: req.pessoaId });
      res.status(200).send(projetos);
    } catch (error) {
      res
        .status(400)
        .send({ error: 'Erro ao listar projetos', details: error });
    }
  }

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
        removedImages // Novo campo para URLs de imagens removidas
      } = req.body;
  
      projeto.titulo = titulo || projeto.titulo;
      projeto.descricao = descricao || projeto.descricao;
      projeto.descricaoCurta = descricaoCurta || projeto.descricaoCurta;
      projeto.linksRedesSociais = linksRedesSociais || projeto.linksRedesSociais;
      projeto.linkVideo = linkVideo || projeto.linkVideo;
      projeto.tags = tags || projeto.tags;
  
      // Lidar com novos arquivos de imagem
      if (req.files) {
        if (req.files.banner) {
          projeto.bannerUrl = req.files.banner[0].path; // Salve o caminho do arquivo
        }
        if (req.files.logo) {
          projeto.logoUrl = req.files.logo[0].path; // Salve o caminho do arquivo
        }
        if (req.files.imagens) {
          const newImagePaths = req.files.imagens.map(file => file.path);
          projeto.imagens = [...projeto.imagens, ...newImagePaths]; // Adicione novas imagens
        }
      }
  
      // Remover imagens conforme necessário
      if (removedImages && removedImages.length > 0) {
        projeto.imagens = projeto.imagens.filter(imageUrl => !removedImages.includes(imageUrl));
        // Lógica adicional para excluir os arquivos fisicamente, se necessário
      }
  
      await projeto.save();
      res.status(200).send(projeto);
    } catch (error) {
      res.status(400).send({ error: 'Erro ao atualizar projeto', details: error });
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

  async listByUser(req, res) {
    try {
      const projetos = await Projeto.find({ pessoaId: req.pessoaId });
      res.status(200).send(projetos);
    } catch (error) {
      res.status(400).send({ error: 'Erro ao listar projetos do usuário', details: error });
    }
  }
  
}

module.exports = new ProjetoController();
