'use strict'
var User = require('../models/user.model')

exports.updateUserEndereco = function(req, res, next) {
    console.log('chegou do cliente')
    // asynchronous
    // User.findOne wont fire unless data is sent back
    var query = req.body.endereco

    User.update({
        'local.email': req.body.email
    }, {
        $set: {
            'local.endereco': query
        }
    }, function(err, user) {
        if (err) {
            console.log(err)
            res.send(201);
            //            return done(err)

        } else {
            console.log('Eendereço atualizado com sucesso', user)
            res.send(200);
            //            return done(null, user);
        }

    });
}

exports.updateDadosCadastrais = function(req, res, next) {
    console.log('chegou do cliente')
    // asynchronous
    // User.findOne wont fire unless data is sent back
    var query = req.body

    User.update({
        'local.email': req.body.email
    }, {
        $set: {
            'local': query
        }
    }, function(err, user) {
        if (err) {
            console.log(err)
            res.send(201);
            //            return done(err)

        } else {
            console.log('Dados atualizados com sucesso', user)
            res.send(200);
            //            return done(null, user);
        }

    });
}

exports.adicionaPedido = function(req, res, next){
    var pedido = {
        'data':req.body.data,
        'compras':req.body.compras
    }

    console.log("O meu pedido feito: ", pedido);

    User.update({'local.email':req.body.email}, {'$push':{'pedidos':pedido}}, function(err, data){
        if (err) throw err;

        res.send("OKAY");
    });
}

exports.recoverUser = function(req, res, next){
    console.log("Olha o que chegou aqui LOGGED USER: ", req.body);

    User.findOne({
        'local.email': req.body.email
    }, function(err, data) {
        data.local.password = "";
        data.facebook = "";
        res.json(data);
    });
}