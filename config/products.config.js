'use strict'
var products = require('../models/products.model');

var produtos = {};

//FILTER PRODUCTS BY SOME UNIQUE VALUE
exports.filtroComum = function(req, res) {
    var query = req.body[0];
    var display = req.body[1];
    products.find(query)
        .sort(display.orderBy)
        .limit(display.maxShowItem)
        .exec(function(err, data) {
            if (err) return err;
            res.json(data)
            //            return callback(data);
        });
};

//FILTER PRODUCTS BY RANGE OF VALUES
exports.filtroFaixa = function(req, callback) {
    products.find(req.body.categoria)
        .where('preco')
        .gt(req.body.menorPreco)
        .lt(req.body.maiorPreco)
        .exec(function(err, data) {
            if (err) return console.error(err);
            console.log("data retrieved: ", data);
            return callback(data);
        })
}
//FIND ALL PRODUCTS
exports.all = function(req, res) {
    products.find()
        .sort('preco')
        .limit(20)
        .exec(function(err, data) {
            if (err) return console.error(err);
            res.json(data)
        });
};

//FIND PRODUCTSBY CATEGORY
exports.category = function(req, res) {
    var query = req.params;
    products.find(query, function(err, data) {
        if (err) return console.error(err);
        res.json(data)
//        return callback(data);
    });
};




//module.exports = produtos;