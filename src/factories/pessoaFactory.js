// const { Cliente } = require("../model/cliente")
const { Pessoa } = require("../model/pessoa")


const pessoaFactory = {
    createPessoa (tipo, email) {
        switch(tipo){
            case 'Cliente':
                return Pessoa.findOne({ email })            
            default:
                return null
        }
    }
}

module.exports = { pessoaFactory }