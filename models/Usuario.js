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
    },
    uid_google:{
        type: DataTypes.STRING
    },
    uid_facebook:{
        type: DataTypes.STRING
    }
});


module.exports = Usuario;