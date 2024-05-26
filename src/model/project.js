const mongoose = require('mongoose');

const { Schema } = mongoose;

const projetoSchema = new Schema(
  {
    titulo: { required: true, type: String },
    descricao: { type: String },
    descricaoCurta: { type: String },
    linksRedesSociais: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
      linkedin: { type: String },
      youtube: { type: String },
    },
    linkVideo: { type: String },    
    tags: [{ type: String }],
    pessoaId: { type: Schema.Types.ObjectId, ref: 'Pessoa', required: true },
  },
  { collection: 'projeto' },
);

const Projeto = mongoose.model('Projeto', projetoSchema);

module.exports = { Projeto, projetoSchema };


