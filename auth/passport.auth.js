LocalStrategy = require('passport-local').Strategy;
FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user.model')
var configAuth = require('../config/Auth.config');
//Parameters

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        console.log('serializing user', user)
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user', user)
            done(err, user);
        });
    });
    /*LOCAL SIGNUP*/
    //     we are using named strategies since we have one for login and one for signup
    //     by default, if there was no name, it would just be called 'local'
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        function(req, email, password, done) {
            console.log('chegou do cliente', req.body)
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                User.findOne({
                    'local.email': email
                }, function(err, user) {

                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        console.log('Usuário já existe');
                        return done(null, false, {
                            message: 'The email already exists'
                        });
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();
                        // set the user's local credentials
                        newUser.local.nome = req.body.nome;
                        newUser.local.sobrenome = req.body.sobrenome;
                        newUser.local.email = req.body.email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.sexo = req.body.sexo;
                        newUser.local.birthDate = req.body.birthDate;
                        newUser.local.telefone = req.body.telefone;
                        newUser.local.celular = req.body.celular;
                        newUser.local.endereco.tipoEndereco = req.body.tipoEndereco;
                        newUser.local.endereco.cep = req.body.cep;
                        newUser.local.endereco.endereco = req.body.endereco;
                        newUser.local.endereco.complemento = req.body.complemento;
                        newUser.local.endereco.numero = req.body.numero;
                        newUser.local.endereco.referencia = req.body.referencia;
                        newUser.local.endereco.bairro = req.body.bairro;
                        newUser.local.endereco.cidade = req.body.cidade;
                        newUser.local.endereco.estado = req.body.estado;

                        //Save the user in the database
                        newUser.save(function(err) {
                            if (err) {
                                console.log('Error in Saving user: ' + err);
                                throw err;
                                 return err;

                            }
                            return done(null, newUser);
                        });

                    }
                });
            });

            //        console.log('Executado com sucesso')
        }));

    passport.use('local-login', new LocalStrategy({

        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback

    }, function(req, email, password, done) {
        console.log(email)
        //find a user whose email is the same as the forms email
        //we are checking to see if the user trying to login already exists
        User.findOne({
            'local.email': email
        }, function(err, user) {
            console.log(user)
            //              console.log('ola', user.validPassword(password))
            if (err) {
                console.log('erro')
                return done(err);
            }
            //if no user is found, return the message
            if (!user) {
                console.log('invalid username');
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            //req.flash is the way to set flashdata using connect-flash
            //if the user is found but the password is wrong
            if (!user.validPassword(password)) {
                //            if (user.password != password) {
                console.log('invalid password')
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            } //create the loginMessage and save it to session as flashdata

            //all is well, return sucessful user
            console.log(user)
            return done(null, user);

        });
    }));

    //---------------------------------------------------------------------
    //---------------------------------------------------------------------

    passport.use('facebook-login', new FacebookStrategy({
            // pull in our app id and secret from our auth.config.js file
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL
            //facebook will send back the token and profile
        }, function(token, refreshToken, profile, done) {
            //asynchronous
            process.nextTick(function() {
                //find the user in the database based on their facebook id
                User.findOne({
                    'facebook.id': profile.id
                }, function(err, user) {
                    //if there is an error, stop everything and return 
                    if (err)
                        return done(err);
                    if (user) {
                        //user find return the user
                        return done(null, user);
                    } else {
                        //user not found, create the user in the database
                        var newUser = new User();
                        newUser.facebook.id = profile.id; //set the users facebook id
                        newUser.facebook.token = token;
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;
                        //Save user to db
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });
            });

        }

    ));
}