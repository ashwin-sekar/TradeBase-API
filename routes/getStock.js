const PinStock = require('../models/pinstock.model');

const getStock = async(req,res) => {
    const pins = await PinStock.find({user: req.params.id});
    res.json(pins);
} 

module.exports = {
    getStock: getStock
}