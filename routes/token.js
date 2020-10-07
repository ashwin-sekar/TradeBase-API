const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const checkToken = async(req,res) => {
    try {
        const token = req.header("x-auth-token");
        if(!token) {
            return res.json(false);
        }
        
        const verified = jwt.verify(token, 'dYS}-*N;M~T$69gu');
        if(!verified) {
            return res.json(false);
        }

        const user = await User.findById(verified.id);
        if(!user) {
            return res.json(false);
        }

        return res.json(true);

    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    checkToken: checkToken
}