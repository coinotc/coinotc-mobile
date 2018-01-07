var mongoose = require('mongoose');

module.exports = mongoose.model('order', {
    buyer: String,
    seller: String,
    crypto: String,
    country: String,
    fiat: String,
    price: Number,
    amount: Number,
    quantity: Number,
    payment: String,
    advertisement: String,
    limit: Number,
    finished: Boolean
});
