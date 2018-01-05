var Order = require('../models/order');

const ORDERS_API_URL = '/api/orders';

module.exports = function (app) {

    //SEARCH & GET PROJECTS
    app.get(ORDERS_API_URL, (req, res) => {
        var query = {};
        Order.find(query, (err, orders) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                // return;
            }
            res.status(200).json(orders);
        });
    });

}