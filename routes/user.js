const User = require('../models/user.model');

const handleUser = async(req,res) => {
    const user = await User.findById(req.user);
    res.json({
        name: user.name,
        id: user._id,
    });
} 

module.exports = {
    handleUser: handleUser
}