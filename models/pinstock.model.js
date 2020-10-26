const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    symbol: {type: String, required: true},
    user: {type: String, required: true},
});

module.exports = PinStock = mongoose.model("pinStock", stockSchema);