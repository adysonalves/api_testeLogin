const Usuario = require("../models/Usuario");

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
            imagem: req.body.imagem

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
        const user = {
            email: req.body.email,
            senha: req.body.senha,
            tipoCadastro: req.body.tipoCadastro
        }

        const verificaUser = await Usuario.findOne({where:{
            email: user.email
        }, raw:true});

        if(verificaUser != null){
            if(verificaUser.tipoCadastro == 'App' && user.senha == senha){
               return res.json("Você está logado com a sua conta do app.")
            }

            if((verificaUser.tipoCadastro == "Google" || verificaUser.tipoCadastro == "Facebook") && user.email == verificaUser.email){
                return res.json("Você está logado com a sua conta social.")
            }

            res.json('Usuário não encontrado...')
        }

        
        
        console.log(verificaUser);
    } 
}