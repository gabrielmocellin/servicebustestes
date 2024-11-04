const { delay, ServiceBusClient, ServiceBusMessage } = require("@azure/service-bus");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Classe criada para facilitar o envio e recebimento de mensagens.
 * Para funcionar, deve-se criar um arquivo .env e inserir as informações: 
 * CONNECTION_STRING; TOPIC_NAME; SUB_NAME
*/
class ServiceBusManager  {
    constructor () {
        this.connectionString = process.env.CONNECTION_STRING || "";
        this.topicName = process.env.TOPIC_NAME || "";
        this.subscriptionName = process.env.SUB_NAME || "";

        if (this.connectionString === "" || this.topicName === "" || this.subscriptionName === "") {
            throw Error("CONNECTION_STRING, TOPIC_NAME e SUB_NAME devem estar definidas no .env ");
        }
    }

    /**
     * Recebe e apresenta no terminal as mensagens recebidas do ServiceBus.
     */
    async receiveMessageFromSub () {
        let msgRecebidasArray = []
        const sbClient = new ServiceBusClient(this.connectionString);
        const receiver = sbClient.createReceiver(this.topicName, this.subscriptionName);

        const mensagemRecebidas = async (msgRecebida) => {
            let msgBody = msgRecebida.body;
            msgRecebidasArray.push(msgBody); // Salva mensagem recebida no array que será retornado
            let msgJSON = JSON.stringify(msgBody);
            console.log(`[MENSAGEM RECEBIDA]: ${msgJSON}`); // "[MENSAGEM RECEBIDA]: {'id': 1,'name':'Gabriel Mocellin'}"
        };
    
        const errosDisparados = async (error) => {
            console.log(error);
        };
        
        receiver.subscribe({
            processMessage: mensagemRecebidas,
            processError: errosDisparados
        });
        
        await delay(5000);
    
        await receiver.close();
        await sbClient.close();

        return msgRecebidasArray;
    }

    /**
     * Envia uma mensagem ao tópico especificado.
     * @param {Object} bodyContent - Conteúdo deve estar em formato de objeto para ser enviado.
     */
    async sendMessage (bodyContent) {
        const sbClient = new ServiceBusClient(this.connectionString);
        const sender = sbClient.createSender(this.topicName);
        const message = {
            contentType: "application/json",
            body: bodyContent
        };
        
        try {
            if (message.body) {
                await sender.sendMessages(message);
            } else {
                throw new Error("Mensagem vazia!");
            }
            console.log(`[MENSAGEM ENVIADA] Tópico: ${this.topicName}`);
            await sender.close();
        } finally {
            await sbClient.close();
        }
    }

    /**
     * Envia várias mensagens ao tópico especificado.
     * @param {Array} messagesArray - Conteúdo deve estar em formato de array para ser enviado.
     */
    async sendArrayOfMessages (messagesArray) {
        const sbClient = new ServiceBusClient(this.connectionString);
        const sender = sbClient.createSender(this.topicName);
        const messages = messagesArray.map((elemento) => ({
            body: elemento,
            contentType: "application/json"
        }));
        
        try {
            await sender.sendMessages(messages);
            console.log(`[MENSAGEM ENVIADA] Tópico: ${this.topicName}`);
            await sender.close();
        } finally {
            await sbClient.close();
        }
    }
}

module.exports = ServiceBusManager;