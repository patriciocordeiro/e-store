//var express = require('express');
//var router = express.Router();
//var produtos = require('../models/products');
//var mongoose = require('mongoose');
//
////console.log(product)
//
///* GET homevar mongoose = require('mongoose');
// page. */
//
////var produtosSchema = mongoose.Schema({
////    name: String,
////    categoria: String,
////    marca: String,
////    tamanho_tela: Number,
////    camera: String,
////    caracteristicas: String,
////    memoria_interna: String,
////    sistema_operacional: String,
////    preco: Number,
////    avaliacao: {
////        media: Number,
////        cinco: Number,
////        quatro: Number,
////        tres: Number,
////        dois: Number,
////        um: Number
////    }
////});
//
////var product = mongoose.model('produtos', produtosSchema);
//
////router.post('/produtos/:categoria/:tipo_filtro', function(req, res, next) {
////    products.findOne(function(err, produto) {
////        if (err) return console.error(err);
////        console.log(produto);
////         res.json(produto);
////    });
//
//
//router.post('/produtos/:categoria/filtro_comum', function(req, res) {
//    //    console.log('connected')
//    //FIND ALL PRODUCTS
//    var query = req.body[0];
//    var display = req.body[1];
//    produtos.find(query)
//        .sort(display.orderBy)
//        .limit(display.maxShowItem)
//        .exec(function(err, produtos) {
//            if (err) return console.error(err);
//            console.log("filter Data", produtos);
//            res.send(produtos); //send the data to client
//        });
//});
//
//router.post('/produtos/:categoria/filtro_faixa', function(req, res) {
////    var req.body.categoria = {
////        "categoria": req.body.categoria
////    };
//    produtos.find(req.body.categoria)
//        .where('preco')
//        .gt(req.body.menorPreco)
//        .lt(req.body.maiorPreco)
//        .exec(function(err, produtos) {
//            if (err) return console.error(err);
//            console.log("data retrieved: ", produtos);
//            res.send(produtos); //send the data to client
//        });
//});
//
//module.exports = router;