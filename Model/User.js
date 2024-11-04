/**
 * Classe criada para facilitar o envio e recebimento de mensagens.
 * Para funcionar, deve-se criar um arquivo .env e inserir as informações: 
 * CONNECTION_STRING; TOPIC_NAME; SUB_NAME
*/
class User {
    constructor (id, name) {
        this.id = id
        this.name = name
    }
}

module.exports = User;