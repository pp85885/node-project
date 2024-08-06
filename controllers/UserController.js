const User = require('../models/User');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    await User.create({
        email,
        name,
        password
    });

    return res.send({
        status: true,
        message: 'User created'
    });
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({email, password});

    if (!user) {
        return res.send({ status: false, message: 'Invalid email or password !' });
    }

    return res.send({
        status: true,
        message: "logged in",
        data: user
    });
}

module.exports = { handleUserSignup, handleUserLogin }