const { Pessoa } = require("../model/pessoa")


const pessoaFactory = {
    findPessoa (tipo, email) {
        switch(tipo){
            case 'Cliente':
                return Pessoa.findOne({ email })            
            default:
                return null
        }
    }
}

module.exports = { pessoaFactory }