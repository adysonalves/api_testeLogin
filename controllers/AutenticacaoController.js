const jwt = require('jsonwebtoken');
const secret = 'adhadfdkqwuhuhhuidhuihuiihi'

module.exports = class Autenticacao{

    static gerarToken(user){
        const payload = {userId: user.id};
        const options = {expiresIn: '1d'}
        return jwt.sign(payload, secret, options);
    } 

    static verificaToken(req,res,next){
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({message: "Faça login para acessar o contéudo!"});
        }

        jwt.verify(token, secret, (err, decoded) => {
            if(err){
                return res.status(401).json({message: 'Token inválido!'});
            }

            req.userId = decoded.userId;
            next();
        });
    }
}