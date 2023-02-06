require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const conn = require('./database/conn');
const rotaUsuarios = require('./routes/Home')

app.use('/', rotaUsuarios)

console.log(process.env)

try {
    conn.authenticate()
    app.listen(PORT, () => {
        console.log('Servidor rodando na porta: ', PORT )
    });
} catch (error) {
    console.log(error)
}

