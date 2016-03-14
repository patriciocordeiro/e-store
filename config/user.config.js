'use strict'
var User = require('../models/user.model');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

exports.newAddress = function(req, res) {
    console.log('requestt', req.body);
    User.findOneAndUpdate({
        'local.email': req.body.email
    }, {
        $push: {
            'local.endereco': req.body.addNewAddress
        }
    }, function(err, data) {
        if (err)
            console.log(err);
        console.log(data);
        res.json(data)
    })
},
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
};

exports.updateDadosCadastrais = function(req, res, next) {
    console.log('chegou do cliente', req.body)
    // asynchronous
    // User.findOne wont fire unless data is sent back
    var query = req.body.data
    console.log(query);
    User.findOne({
        'local.email': req.body.email
    }, function(err, user) {
        console.log('usuário', user)
        if (!user) {
            console.log(user)
            //            res.json({status: 'fail'});
            //return done(err)
        } else {
            //if the user is found but the password is wrong
            if (!user.validPassword(req.body.password)) {
                //            if (user.password != password) {
                console.log('invalid password')
                res.json({
                    status: 'wrong password'
                });
            } else {
                User.update({
                    'local.email': req.body.email
                }, {
                    $set: query
                }, function(err, user) {
                    console.log('TUDO CERTO');
                    res.json({status: user});
                    //            return done(null, user);	 
                });
            }

        }
    });
};

//exports.updateDadosCadastrais = function(req, res, next) {
//    console.log('chegou do cliente')
//    // asynchronous
//    // User.findOne wont fire unless data is sent back
//    var query = req.body
//    User.update({'local.email': req.body.email}, {$set: {'local': query}}, function(err, user) {
//        if (err) {
//            console.log(err)
//            res.json({status: 'fail'});
//            //return done(err)
//        } else {
//			//if the user is found but the password is wrong
//            if (!user.validPassword(password)) {
//                //            if (user.password != password) {
//                console.log('invalid password')
//               res.json({status: 'wrong password'});
//            }
//            console.log('Dados atualizados com sucesso', user)
//            res.json({
//                status: user
//            });
//            //            return done(null, user);
//        }
//    });
//};
exports.adicionaPedido = function(req, res, next) {
    var pedido = {
        'data': req.body.data,
        'compras': req.body.compras
    }

    console.log("O meu pedido feito: ", pedido);

    User.update({
        'local.email': req.body.email
    }, {
        '$push': {
            'pedidos': pedido
        }
    }, function(err, data) {
        if (err) throw err;

        res.send("OKAY");
    });
};


exports.recoverUser = function(req, res, next) {
    console.log("Olha o que chegou aqui LOGGED USER: ", req.body);

    User.findOne({
        'local.email': req.body.email
    }, function(err, data) {
        console.log("MEU DADO: ", data);
        if (data === null) {
            res.json({
                message: "nothing"
            })
        } else {
            data.local.password = "";
            data.facebook = "";
            res.json(data);
        };
    });
};

exports.recoverPass = function(req, res, next) {
    console.log('hello');
    console.log(req.body.email);

    async.waterfall([

        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                console.log('token');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({
                'local.email': req.body.email
            }, function(err, user) {
                if (!user) {
                    res.json({
                        user: false
                    })
                } else {
                    console.log(user.local.email);
                    user.local.resetPasswordToken = token;
                    user.local.resetPasswordExpires = Date.now() + 3600000 //1 hour
                    user.local.save(function(err) {
                        done(err, token, user);
                    });
                };
            });
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'paponcio6@gmail.com',
                    pass: 'pamila8081'
                }
            });
            var mailOptions = {
                headers: {
                    'My-Awesome-Header': '123'
                },
                to: user.local.email,
                from: 'paponcio6@gmail.com',
                subject: 'Recuperaçao de senha',
                text: 'Você está recebendo este email porque você ou alguém solicitou a redifinição da senha  da sua conta. \n\n' +
                    'Por favor click no link abaixo ou copie e cole-o no seu navegador para completar o processo de redifinição de senha: \n\n' +
                    'http://' + req.headers.host + '#/app/user/forgetPassword/' + token + '\n\n' + 'Este link irá experar em: ' + user.local.resetPaswordExpires + '\n\n' +
                    'Caso não tenha solicitado a redifinição de senha, por favor ignore esta mensagem e sua senha continuará inalterada.\n'

            };
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log(mailOptions);
                if (err) {
                    return console.log(err);
                }
                //                done(err, 'done');
                res.json({
                    user: 'emailSent'
                });
            });
        }

    ], function(err) {
        if (err) return next(err);
        res.json({
            user: err
        });
    });
};

exports.checkResetPassToken = function(req, res, next) {
    console.log(req.body);
    User.findOne({
        'local.resetPasswordToken': req.body.token,
        'local.resetPasswordExpires': {
            $gt: Date.now()
        }
    }, function(err, user) {
        if (!user) {

            res.json({
                token: 'fail'
            })
            return console.log('token', err);
        }
        res.json({
            token: 'ok'
        })
    })
}

exports.resetPass = function(req, res, next) {
    async.waterfall([

        function(done) {
            User.findOne({
                'local.resetPasswordToken': req.body.token,
                'local.resetPasswordExpires': {
                    $gt: Date.now()
                }
            }, function(err, user) {
                if (!user) {
                    res.json({
                        user: 'fail'
                    })
                    return console.log('token', err);
                }
                var newUser = new User();
                user.local.password = newUser.generateHash(req.body.password)
                //                user.local.resetPasswordToken = undefined;
                //                user.local.resetPasswordExpires = undefined;
                user.save(function(err) {
                    if (err)
                        console.log(err);
                    console.log(user);

                    res.json({
                        user: 'ok'
                    })
                });
                //                done(err, user);
            });
        },
        function(user, done) {
            console.log('estou no email');
            var smtpTransport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'paponcio6@gmail.com',
                    pass: 'pamila8081'
                }
            });
            var mailOptions = {
                headers: {
                    'My-Awesome-Header': '123'
                },
                to: user.local.email,
                from: 'paponcio6@gmail.com',
                subject: 'Sua senha foi alterada',
                text: 'Olá ' + user.local.nome + ',\n\n' +
                    'Está é uma confirmação de que a senha da sua conta ' + user.local.email + ' acabou de ser alterada.\n\n' +
                    'Acesse o link abaixo para realizar o seu login: \n' +
                    'http://' + req.headers.host + '#/app/user/login \n\n' +
                    'atenciosamente,\n' +
                    'P&M Eletrônica.'

            };
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log(mailOptions);
                if (err) {
                    return console.log(err);
                    res.json({
                        user: 'emailfail'
                    });
                }
                //                done(err, 'done');
                res.json({
                    user: 'emailSent'
                });
            });
        }

    ])
}