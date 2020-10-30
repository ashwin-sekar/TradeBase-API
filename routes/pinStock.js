const PinStock = require('../models/pinstock.model');

const pinStock = async(req,res) => {
    const { symbol, user } = req.body;

    console.log(req.body);

    if(!symbol || !user ) {
        return res.status(401).json({msg: "Invalid request"});
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