var mongoose = require('mongoose');

module.exports = mongoose.model('adbuy', {
    visible: Boolean,
    owner: String,
    crypto: String,
    country: String,
    fiat: String,
    price: Number,
    min_price: Number,
    max_price: Number,
    fiat: String,
    payment: String,
    limit: Number,
    massage: String,
});
