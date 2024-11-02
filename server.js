import express from "express";
import dotenv from "dotenv";

// Carrega as variáveis do .env para process.env
dotenv.config();
const app = express();
const porta = "8081";

app.get('/', (req, res) => {
    res.send('<h1>Hello World!<br> Gb Aqui!</h1>');
})

app.listen(porta, () => {
    console.log(`Rodando sistema em: 'http:localhost:${porta}'`)
})