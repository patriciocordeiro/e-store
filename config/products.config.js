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

//FIND ONE PRODUCT
exports.unico = function(req, res, next) {
    console.log(req.body)
    products.findOne({
        _id: req.body.id
    }, function(err, data) {
        console.log(data)
        res.json([data])
    });
}

exports.myKart = function(req, res, next) {
    console.log("Meus ids enviados: ", req.body.ids);
    products.find()
        .where('_id')
        .in(req.body.ids)
        .exec(function(err, data) {
            //     { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
            if (err) throw err;
            console.log('Produtos retornados', data);
            res.json(data)

        });

    // Há duas vertentes
    // A primeira eh que todos os ids serão pesquisados e retornados ao usuário
    // A segunda que os ids idênticos serão eliminados, deixando para o angular contar os produtos iguais


    // Esse código foi baseado em 7.2.1
    // http://book.mixu.net/node/ch7.html
    //    var produtosCarrinho = [];
    //
    //    function final() {
    //        res.json(produtosCarrinho);
    //    }

    //    function getIds(id, callback) {
    //        products.findOne({
    //            _id: id
    //        }, function(err, data) {
    //            console.log(data);
    //            callback(data);
    //        });
    //    }
    //
    //    function pushData(id) {
    //        if (id) {
    //            getIds(id, function(result) {
    //                produtosCarrinho.push(result);
    //                return pushData(req.body.ids.shift());
    //            });
    //        } else {
    //            return final();
    //        }
    //    }
    //
    //    pushData(req.body.ids.shift());

}

exports.ratingProduct = function(req, res, next){
    console.log("Caracteristica do produto: ", req.body);

    var query = {};

    query.titulo = req.body.titulo;
    query.avaliacao = req.body.avaliacao;
    query.opiniao = req.body.opiniao;
    query.nome = req.body.nome;
    query.email = req.body.email;

    /*products.update({'_id':req.body.id},{'$push':{'avaliacao':req.body.avaliacao}}, function(err, data){
        if (err) throw err;
        console.log('Produto avaliado', data);
        res.json([{retorno:"Obrigado por avaliar"}]);
    });*/
    products.update({'_id':req.body.id}, {'$push':{'avaliacao_produto':query}}, function(err, data){
        if (err) throw err;
        console.log('Produto avaliado', data);
        res.json([{retorno:"Obrigado por avaliar"}]);
    });
}

exports.showRatingProduct = function(req, res, next){
    console.log("Produto para ser visualizado: ", req.body);

    /*products.update({'_id':req.body.id},{'$push':{'avaliacao':req.body.avaliacao}}, function(err, data){
        if (err) throw err;
        console.log('Produto avaliado', data);
        res.json([{retorno:"Obrigado por avaliar"}]);
    });*/
    //res.json([{retorno:"mostrando a avaliacao"}]);
    products.findOne({'_id':req.body.id}).exec(function(err, data){
        //var retorno = {};
        if (err) throw err;
        console.log('Produtos retornados', data.avaliacao);
        res.json([{avaliacao:data.avaliacao}]);
    });
}
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