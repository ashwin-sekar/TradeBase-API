const User = require("../models/user.model");
const bcrypt = require('bcryptjs');

const handleRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log(req.body);

        if(!name || !email || !password) {
            return res.status(400).json({msg: "Fill all fields"});
        }

        if(password.length < 5)
        {
            return res.status(400).json({msg: "Password length should be atleast 5 characters"});
        }

        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!regex.test(email)) {
            return res.status(400).json({msg: "Enter a valid Email Address"});
        }

        const existingUser = await User.findOne({email: email})
        if(existingUser) {
            return res.status(400).json({msg: "Account already exists"});
        }

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password,salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hash,
        });
        const saveUser = await newUser.save();
        res.json(saveUser.name);
    } catch(err) {
        res.status(500).json({error: err.message});
    }

}

module.exports = {
    handleRegister: handleRegister
};