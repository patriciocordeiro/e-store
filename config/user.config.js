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