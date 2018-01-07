
var order = require('../models/orderinformation');
var mongoose = require('mongoose');

const apiurl = '/api/order';

module.exports = function (app) {
    app.get(apiurl,(req,res)=>{
        order.find((err,result)=>{
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).json(result);
        });
    })
    app.post(apiurl,(req,res)=>{
        let get = req.body;
        let send = new order();
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
    })
}
