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
                res.send(req.user.local);
            });
            //        console.log('usuario', req.user);
            //        res.send(req.user);

        })(req, res, next);
    });
    router.post('/signup', passport.authenticate('local-signup'), function(req, res) {
        //     router.post('/users/signup',  function(req, res) {

        console.log('executado')
        console.log(req.body)
        res.send(req.newUser)
        //      console.log('hello', req.body.email) 
    })

    //    router.post('/signup', function(req, res) {
    //        //     router.post('/users/signup',  function(req, res) {
    //
    //        console.log('executado')
    //        console.log(req.body.newUser)
    //        res.send(req.newUser)
    //        //      console.log('hello', req.body.email) 
    //    })

    router.get('/isloggedin', function(req, res, next) {
        res.send(req.isAuthenticated() ? req.user : {
            user: false
        });
    });

    router.get('/logout', function(req, res) {
        req.logOut();
        res.send(200)
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

    router.post('/user/updateAddress', User.updateUserEndereco);
    router.post('/user/updateDadosCadastrais', User.updateDadosCadastrais);
    router.post('/user/adicionaPedido', User.adicionaPedido);

    app.use('/', router);
}
//module.exports = function(app, express) {
//    var router = express.Router();
//    router.get('/users/login', function(req, res, next) {
//
//        res.send('exists');
//
//    });
//    
//    app.use('/', router);
//}