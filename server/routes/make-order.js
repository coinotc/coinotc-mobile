
var Order = require('../models/orderinformation');
var mongoose = require('mongoose');

const apiurl = '/api/order';

module.exports = function (app) {
    app.get(apiurl, (req, res) => {
        let finished = req.query.finished;
        Order.find({ finished: `${finished}` }, (err, result) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).json(result);
        });
    });
    app.post(apiurl, (req, res) => {
        let get = req.body;
        let send = new Order();
        send.buyer = mongoose.Types.ObjectId()
        send.seller = mongoose.Types.ObjectId();
        send.crypto = get.crypto;
        send.country = get.country;
        send.quantity = get.quantity;
        send.price = get.price;
        send.amount = get.amount;
        send.fiat = get.fiat;
        send.payment = get.payment;
        send.limit = get.limit;
        send.finished = get.finished;
        console.log(send);
        let error = send.validateSync();
        if (!error) {
            send.save(function (err, result) {
                res.status(201).json(result);
            });
        } else {
            console.log(error);
            res.status(500).send(error);
        }
    });
    app.put(apiurl, (req, res) => {
        let orderInformation = req.body;
        let newOrderInformation = new Order();
        newOrderInformation._id = orderInformation._id;
        newOrderInformation.finished = true;
        var error = newOrderInformation.validateSync();
        if (!error) {
            //console.log(user._id);
            Order.findByIdAndUpdate({ _id: orderInformation._id }, { $set: newOrderInformation }, { new: true }, (err, result) => {
                if (err) res.status(500).json(err);
                res.status(201).json(result);
            })
        }
    });

}
