const { DataTypes } = require('sequelize');
const conn = require('../database/conn');

const Usuario = conn.define('usuario', {
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoCadastro:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imagem:{
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = Usuario;