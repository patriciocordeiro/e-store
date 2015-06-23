'use strict'
var products = require('../models/products.model');

var produtos = {};

//FIND PRODUCTSBY CATEGORY
exports.category = function(req, res, next) {
    var query = req.body[0];
    var display = req.body[1];
    products.find(query)
        .sort(display.orderBy)
        .limit(display.maxShowItem)
        .exec(function(err, data) {
            if (err) return err;
            res.json(data)
        });
};


//FILTER PRODUCTS BY SOME UNIQUE VALUE
exports.filtroComum = function(req, res, next) {
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
exports.filtroFaixa = function(req, res, next) {
    console.log('Minha cat', req.body[1].maxShowItem)
    products.find({
        'categoria': req.body[0].categoria
    })
        .where('preco')
        .gt(req.body[0].menorPreco)
        .lt(req.body[0].maiorPreco)
        .limit(req.body[1].maxShowItem)
        .exec(function(err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
};


//FIND ALL PRODUCTS
exports.all = function(req, res, next) {
    products.find()
        .sort('preco')
        .limit(20)
        .exec(function(err, data) {
            if (err) return console.error(err);
            res.json(data)
        });
};

////FIND PRODUCTSBY CATEGORY
//exports.category = function(req, res) {
//    var query = req.params;
//    products.find(query, function(err, data) {
//        if (err) return console.error(err);
//        res.json(data)
//        //        return callback(data);
//    });
//};




//module.exports = produtos;