const Usuario = require("../models/Usuario");
const jtw = require('jsonwebtoken');



module.exports = class Usuarios{

    static async ListarTodos(req,res){
        const users = await Usuario.findAll({raw: true});

        if(!users.length > 0){
            return res.json("Nenhum usuário foi cadastrado...");
        }

        res.json(users);
    }

    static async AddUser(req,res){
        const user = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            senha: req.body.senha,
            tipoCadastro: req.body.tipoCadastro,
            imagem: req.body.imagem,
            uid_google: req.body.uid_google,
            uid_facebook: req.body.uid_facebook
        }

        if(user.uid_google == undefined || user.uid_google == null){
            user.uid_google = '';
        }

        if(user.uid_facebook == undefined || user.uid_facebook == null){
            user.uid_facebook = '';
        }

        await Usuario.create(user).then(data => {
            return res.json(data)
        }).catch(err => {
            res.json({error: `Ocorreu um erro: ${err}`});
        });

    }

    static async removeUsers(req,res){
        const id = req.params.id

        if(!id){
            return res.json("Informe o ID do registro que deseja excluir...")
        }

        await Usuario.destroy({where:{
            id: id
        }});
        res.redirect('/');

    }

    static async loginUser(req,res){
        const {email, senha, tipoCadastro} = req.body;

        const buscaUser = await Usuario.findOne({where:{email: email}, raw: true})
        
        
        console.log(verificaUser);
    } 
}