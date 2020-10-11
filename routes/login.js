const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({msg: "Fill all credentials"});
        }

        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!regex.test(email)) {
            return res.status(400).json({msg: "Enter a valid Email Address"});
        }

        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({msg: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: "Invalid credentials"});
        }
        const token = jwt.sign({id: user._id }, 'dYS}-*N;M~T$69gu');
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    handleLogin: handleLogin
}