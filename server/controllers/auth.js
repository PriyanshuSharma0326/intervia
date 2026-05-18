const { createHmac, randomBytes } = require('node:crypto');
const { createUser, findUser } = require('../queries/auth');
const { createUserJWT } = require('../services/auth');
const { cookieOptions } = require('../lib/configs');

async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = await findUser(email);

    if(!user) {
        return res.status(404).json({
            message: `No user found with email address ${email}`,
        });
    }

    const hashedPassword = createHmac('sha256', process.env.HASH_SALT)
            .update(password)
            .digest('hex');

    if(user.password !== hashedPassword) {
        return res.status(401).json({
            message: "Incorrect password",
        });
    }

    const token = createUserJWT(user);

    const {
        password: userPassword,
        ...remainingUser
    } = user;

    res.cookie("uid", token, cookieOptions);

    return res.status(200).json({
        message: "Credentials verified",
        data: remainingUser,
    });
}

async function handleSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = createHmac('sha256', process.env.HASH_SALT)
            .update(password)
            .digest('hex');

        const user = await createUser(name, email, hashedPassword);

        const token = createUserJWT(user);

        const {
            password: userPassword,
            ...remainingUser
        } = user;

        res.cookie("uid", token, cookieOptions);

        return res.status(201).json({
            message: "User created",
            data: remainingUser,
        });
    }
    catch(err) {
        return res.status(500).json({
            message: "Error while creating user",
            error: err
        });
    }
}

async function handleLogout(req, res) {
    res.clearCookie("uid", cookieOptions);

    return res.status(200).json({
        message: "Logged out successfully",
    });
}

module.exports = {
    handleLogin,
    handleSignup,
    handleLogout,
}
