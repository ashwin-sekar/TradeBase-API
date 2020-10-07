const User = require('../models/user.model');

const delUser = async (req,res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.user);
        res.json(deleteUser);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    delUser: delUser
}