const PinStock = require('../models/pinstock.model');

const pinStock = async(req,res) => {
    const { symbol, user } = req.body;

    if(!symbol || !user ) {
        return res.status(401).json({msg: "Invalid request"});
    }

    const exist = PinStock.find({symbol: symbol, user: user});
    if(exist) {
        return res.status(401).json({msg: "You have already pinned this stock"});
    }

    const newStock = new PinStock({
        symbol: symbol,
        user: user, 
    });
    const saveStock = await newStock.save();
    res.json(saveStock);
} 

module.exports = {
    pinStock: pinStock
}