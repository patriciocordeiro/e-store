'use strict'
var products = require('../models/products.model');

/*Elastic search*/
exports.es = function(req, res, next) {
    console.log('elastic query terms', req.params);
    products.search({
        query_string: {
            query: req.body.terms
        }
    }, function(err, results) {
        if (err)
            console.log(err);
        console.log('results:', results);
        var data = {
            response: results.hits.hits,
            total: results.hits.total
        }
        console.log(data)
        res.json(data)
    });
}


//FIND PRODUCTSBY CATEGORY
exports.category = function(req, res, next) {
    var query = new RegExp(req.body.subcategoria, "i")
    console.log(req.body.subcategoria);
    //    var query = req.body.category;
    console.log(query);
    //    var display = req.body[1];
    products.find({
        subcategoria: query
    })
    //        .sort(query.prdOrderBy)
    .limit(20)
        .exec(function(err, data) {
            if (err) {
                console.log(err);
                return err;
            }
            console.log(data);
            res.json({
                data: data
            });
        });
};


//FILTER PRODUCTS: CUMULATIVE FILTERING
//exports.filtroComum = function(req, res, next) {
//    var query = req.body[0];
//    var display = req.body[1];
//    console.log(query.filtroComum);
//    products.find(query.filtroComum)
//        .limit(display.maxShowItem)
//        .sort(display.orderBy)
//        .exec(function(err, data) {
//            if (err) {
//                console.log('erro', err);
//                return err;
//            }
//            res.json(data);
//        });
//};

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

}

var soma = 0;
var items = [];

function series(item) {
    if (item) {
        console.log("soma atual: " + soma + " avaliacao do item: " + item.avaliacao);
        soma = soma + item.avaliacao;
        console.log("Nova soma: ", soma);
        return series(items.shift());
    } else {
        return soma;
    }
}

exports.ratingProduct = function(req, res, next) {
    console.log("Caracteristica do produto: ", req.body);

    var query = {};

    query.titulo = req.body.titulo;
    query.avaliacao = req.body.avaliacao;
    query.opiniao = req.body.opiniao;
    query.nome = req.body.nome;
    query.email = req.body.email;

    var avaliacoes = 0;
    var media = 0;
    var tamanho = 0;
    var soma_avaliacoes = 0;
    soma = 0;
    items = [];

    /*
        Sempre que for adicionado for avaliado um produto no banco de dados, uma nova média eh calculada
        O produto eh encontrado, as avaliações são obtidas e então eh calculado uma nova média.
        Então essa média substitui a que já estava
    */
    products.findOne({
        _id: req.body.id
    }, function(err, dado) {
        //console.log(data)
        //res.json([data])

        items = dado.avaliacao_produto;
        console.log("ITEMS: ", items.length);
        tamanho = items.length;


        if (dado.avaliacao_produto) {
            soma_avaliacoes = series(items.shift());

            media = (soma_avaliacoes + query.avaliacao) / (tamanho + 1);
            console.log("Olha a media: " + media + " query.avaliacao: " + query.avaliacao + " tamanho: " + tamanho);

            products.update({
                '_id': req.body.id
            }, {
                '$push': {
                    'avaliacao_produto': query
                }
            }, function(err, data) {
                if (err) throw err;
                //console.log('Produto avaliado PUSH', data);

                products.update({
                    '_id': req.body.id
                }, {
                    '$set': {
                        'media_avaliacoes': media
                    }
                }, function(err, prodMedia) {
                    if (err) throw err;
                    //console.log('Produto avaliado SET', prodMedia);
                    res.json([{
                        retorno: "Obrigado por avaliar"
                    }]);
                });
            });
        } else {
            products.update({
                '_id': req.body.id
            }, {
                '$push': {
                    'avaliacao_produto': query
                }
            }, function(err, data) {
                if (err) throw err;

                media = query.avaliacao;

                products.update({
                    '_id': req.body.id
                }, {
                    '$set': {
                        'media_avaliacoes': media
                    }
                }, function(err, prodMedia) {
                    if (err) throw err;
                    console.log('Produto avaliado SET', prodMedia);
                    res.json([{
                        retorno: "Obrigado por avaliar"
                    }]);
                });
            });
        }

    });
}

exports.showRatingProduct = function(req, res, next) {
    console.log("Produto para ser visualizado: ", req.body);
    products.findOne({
        '_id': req.body.id
    }).exec(function(err, data) {
        if (err) throw err;
        console.log('Produtos retornados', data.avaliacao);
        res.json([{
            avaliacao: data.avaliacao
        }]);
    });
}