module.exports = function(app, express, passport, User) {
    var router = express.Router();

    //    router.post('/login', passport.authenticate('login'), function(req, res) {
    //        console.log('usuario', req.user);
    //        res.send(req.user);
    //
    //    });

    router.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                console.log(err)
                return res.send(err.code);
                //                    return next(err);
            }
            if (!user) {
                console.log('User not found', err)

                return res.send({
                    user: false
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                res.send({
                    'local': req.user.local,
                    'pedidos': req.user.pedidos
                });
            });
            //        console.log('usuario', req.user);
            //        res.send(req.user);

        })(req, res, next);
    });
    router.post('/signup', passport.authenticate('local-signup'), function(req, res, next) {
        console.log(req.body)
        res.send(req.newUser)
    })
    router.get('/isloggedin', function(req, res, next) {
        res.send(req.isAuthenticated() ? req.user : {
            user: false
        });
    });

    router.get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            if (err)
                console.log(err);
            req.logOut();
//            res.redirect('/')

            res.send(200)


        })
        //        req.logOut();
    })

    //FACEBOOK
    router.get('/login/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }));

    router.get('/login/facebook/callback', passport.authenticate('facebook'), function(req, res, next) {
        //        console.log(req)
        res.send(req.user);
        //        successRedirect : '/home',
    });

    router.post('/user/addNewAddress', User.newAddress)
    router.post('/user/updateAddress', User.updateAddress);
    router.post('/user/removeAddress', User.removeAddress);
    router.post('/user/updateDadosCadastrais', User.updateDadosCadastrais);
    router.post('/user/adicionaPedido', User.adicionaPedido);
    router.post('/user/recoverUser', User.recoverUser);
    /*Forgot password*/
    router.post('/user/forgotPass', User.recoverPass);
    /*check the token validity for password reset*/
    router.post('/user/checkResetPassToken', User.checkResetPassToken);
    /*Reset password*/
    router.post('/user/resetPass', User.resetPass);

    app.use('/', router);
}
