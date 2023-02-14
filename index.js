require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const conn = require('./database/conn');
const rotaUsuarios = require('./routes/Home');
conn.sync()

app.use('/', rotaUsuarios)

try {
    conn.authenticate()
    app.listen(PORT, () => {
        console.log('Servidor rodando na porta: ', PORT )
    });
} catch (error) {
    console.log(error)
}

