const { findUser } = require("../queries/auth");
const { verifyUserToken } = require("../services/auth");

async function verifyUser(req, res, next) {
    const token = req.cookies.uid;

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    try {
        const user = verifyUserToken(token);

        if(!user) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }

        const userInDB = await findUser(user.email);

        if(!userInDB) {
            return res.status(401).json({
                message: "User doesn't exist",
            });
        }

        const {
            password: userPassword,
            ...remainingUser
        } = user;

        req.user = remainingUser;
        next();
    }
    catch(err) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
}

module.exports = {
    verifyUser,
}
