var mongoose = require('mongoose');

module.exports = mongoose.model('order', {
    buyer: mongoose.Schema.Types.ObjectId,
    seller: mongoose.Schema.Types.ObjectId,
    crypto: String,
    quantity: Number,
    price: Number,
    amount: Number,
    fiat: String,
    payment: String,
    limit: Number,
    finished: Boolean,
});
