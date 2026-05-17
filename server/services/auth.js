const JWT = require('jsonwebtoken');

function createUserJWT(user) {
    const token = JWT.sign({ ...user }, process.env.JWT_SECRET);
    return token;
}

function verifyUserToken(token) {
    const user = JWT.verify(token, process.env.JWT_SECRET);
    return user;
}

module.exports = {
    createUserJWT, 
    verifyUserToken,
}
