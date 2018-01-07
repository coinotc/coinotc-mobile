var mongoose = require('mongoose');

module.exports = mongoose.model('adbuy', {
    visible: Boolean,
    crypto: String,
    target_price: Number,
    min_price: Number,
    max_price: Number,
    fiat: String,
    payment: String,
    limit: Number,
    advertisement: String,

});
