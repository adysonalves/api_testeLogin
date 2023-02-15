const Usuario = require("../models/Usuario");
const jtw = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Autenticacao = require('./AutenticacaoController');



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

        user.senha = await bcrypt.hash(req.body.senha, 10)

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

        // DADOS RECEBIDOS DO FRONTEND
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
  
        // BUSCA OS DADOS DO USUÁRIO NO BANCO DE DADOS
        const buscaUser = await Usuario.findOne({where:{email: user.email}, raw: true});

        // Caso exista um usuário cadastrado com esse e-mail:
        if(buscaUser != null){

            // Verifica se o usuário está logando com uma conta criada diretamente no App, se sim, ele verifica se as informações batem e gera o token:
            if(buscaUser.tipoCadastro == 'APP' && await bcrypt.compare(user.senha, buscaUser.senha)){
                const token = Autenticacao.gerarToken(buscaUser);
                console.log('Você está logado com e-mail e senha');
                return res.json(token);
            }

            // Verifica se o usuário está tentando logar com sua conta Google, caso sim, ele compara as informações e gera o token:
            if(buscaUser.tipoCadastro == 'GOOGLE' && await bcrypt.compare(user.uid_google, buscaUser.uid_google)){
                const token = Autenticacao.gerarToken(buscaUser);
                return console.log('Você está logado com sua conta google');
            }

            // Verifica se o usuário está tentando logar com sua conta Google, caso sim, ele compara as informações e gera o token:
            if(buscaUser.tipoCadastro == 'FACEBOOK' && await bcrypt.compare(user.uid_facebook,buscaUser.uid_facebook)){
                const token = Autenticacao.gerarToken(buscaUser);
                return console.log('Você está logado com sua conta do Facebook');
            }

            // Em caso de dados inválidos ou conta criada com o app, sem login social seja inexistente, ele retorna esse erro:
            console.log('E-mail ou senha inválidos!');

        }

        
        // Caso o usuário tente logar com uma conta Google ou Facebook e não seja cadastrado no App, ele verifica se existe o UID e prossegue para o cadastro:
        if(user.uid_google || user.uid_facebook){
            
            // Criptografa UID google:
            if(user.uid_google){
                const uid_GoogleCrypt = await bcrypt.hash(user.uid_google, 10);
                user.uid_google = uid_GoogleCrypt;
            }

            // Criptografa UID Facebook:
            if(user.uid_facebook){
                const uid_FacebookCrypt = await bcrypt.hash(user.uid_facebook, 10);
                user.uid_facebook = uid_FacebookCrypt;
            }

            // Cria a conta com o Social Login:
            await Usuario.create(user).then(data => {
                return console.log('Conta social criada com sucesso, usando sua conta: ', user.tipoCadastro);
            });
        }
    } 
}