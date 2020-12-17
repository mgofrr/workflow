

const jwt = require('jsonwebtoken');
const { APP_SECRET } = require("../../config/config");;

const jwtVerify = (token) => {
    return jwt.verify(token, APP_SECRET);
}

const verifyToken = (req, authToken) => {
    if (req) {
        const authHeader = req.headers.authorization;
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            throw new Error('Não foi Possível autenticar usuário.');
        }
        const { userId } = jwtVerify(token);
        return userId;
    } else if (authToken) {
        
    }
}

const generateToken = async (user) => {
    if (!user) {
      throw new Error('No such user found')
    }

    return jwt.sign(user, APP_SECRET);
}

module.exports = {
    generateToken,
    verifyToken
};