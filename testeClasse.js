const ServiceBusManager = require("./ServiceBusManager.js");
const User = require("./Model/User.js");
let sbm = new ServiceBusManager();

async function main () {

    // Criado para enviar uma mensagem por vez
    // OBS: caso a mensagem esteja vazia (sbm.sendMessage()) será lançado um erro.
    await sbm.sendMessage(new User(1, "Testando primeiro teste"));
    await sbm.sendMessage(new User(2, "Olha ele ae"));
    await sbm.sendMessage(new User(3, "PUCPR testes"));
    
    // Criado para enviar várias mensagens de uma vez para o service bus
    // OBS: pelo que li, devemos nos limitar a mensagens menores que 1MB
    sbm.sendArrayOfMessages([
        new User(1, "Gabriel"),
        new User(2, "Gabriel"),
        new User(3, "Gabriel")
    ]);

    // Criado para receber e apresentar no terminal as mensagens contidas no service bus
    // OBS: lembrando que mesmo que estoure erro, a mensagem é apagada/consumida do service bus
    sbm.receiveMessageFromSub();
}

main();
