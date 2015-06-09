var app = require("express")();
var server = require('http').Server(app);
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require('body-parser');

//use body parser
//var jsonParser = bodyParser.json();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

//enable cross domain access
app.use(cors());

//initialize the server
console.log("Iniciando servidor ...");
server.listen(3000);
console.log("listening");
//------------------------------------------

//connect to databas
mongoose.connect('mongodb://localhost/ecommerce');
//check if connected
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('connected to database')
});
//---------------------------------------------------------------------
//DEFINE A SCHEMA FOR PRODUCTS DATA MODEL
var produtosSchema = mongoose.Schema({
    name: String,
    categoria: String,
    marca: String,
    tamanho_tela: Number,
    camera: Number,
    caracteristicas: String,
    memoria_interna: String,
    sistema_operacional: String,
    preco: Number,
    avaliacao: {
        media: Number,
        cinco: Number,
        quatro: Number,
        tres: Number,
        dois: Number,
        um: Number
    }
});

var usersSchema = mongoose.Schema({
    //    _id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
})
// CREATE A DATA MODEL FOR PRODUCTS
var produtos = mongoose.model('produtos', produtosSchema);

// CREATE A DATA MODEL FOR USERS
var User = mongoose.model('users', usersSchema);

//connec to url produtos
app.post('/produtos', function(req, res) {
    console.log('connected')
    //FIND ALL PRODUCTS
    produtos.find()
        .sort('preco')
        .limit(20)
        .exec(function(err, doc) {
            if (err) return console.error(err);
            //        console.log("Retrieved Data", doc);
            res.send(doc); //send the data to client
        });
});

app.get('/produtos/:categoria', function(req, res) {
    //    console.log('connected')
    //FIND ALL PRODUCTS
    //console.log(req.params);
    var query = req.params;
    produtos.find(query, function(err, cat) {
        if (err) return console.error(err);
        console.log("Retrieved Data", cat);
        res.send(cat); //send the data to client
    });
});

app.post('/produtos/:categoria/:tipo_filtro', function(req, res) {
    //    console.log('connected')
    //FIND ALL PRODUCTS
    console.log(req.body);
    console.log(req.params.tipo_filtro);
    if (req.params.tipo_filtro == "filtro_comum") {
        var query = req.body[0];
        var display = req.body[1];
        //        query.categoria = req.body.categoria;

        //    console.log(query[0]
        //    query.val=(req.body.query);
        //    var jss = JSON.parse(query.val)
        //    var a = JSON.parse(query);
        //    console.log(typeof(query.val));
        console.log(query);
        produtos.find(query)
            .sort(display.orderBy)
            .limit(display.maxShowItem)
            .exec(function(err, dd) {
                if (err) return console.error(err);
                console.log("filter Data", dd);
                res.send(dd); //send the data to client
            });
    }
    // No serve não é necessário criar vários post para cada tipo de filtro
    // Cria-se if e else para que seja analisado o tipo de filtro 
    // TO DO: Caso ele não use nenhum filtro, pode-se utilizar um if para verificar se tipo_filtro está vazio
    else if (req.params.tipo_filtro == "filtro_faixa") {
        //console.log("Filtro faixa funcionando");
        var faixaQuery = {
            "categoria": req.body.categoria
        };
        /*var limit = {
            "$gt":req.body.menorPreco,
            "$lt":req.body.maiorPreco
        };*/
        produtos.find(faixaQuery)
            .where('preco')
            .gt(req.body.menorPreco)
            .lt(req.body.maiorPreco)
            .exec(function(err, dd) {
                if (err) return console.error(err);
                console.log("data retrieved: ", dd);
                res.send(dd); //send the data to client
            });

        //console.log(faixaQuery);
    }
});

app.post('/produtos/avaliar/:categoria/:avaliacao', function(req, res) {
    //    console.log('connected')
    //FIND ALL PRODUCTS
    //console.log(req.params);
    //var query = req.params;
    console.log("-----------");
    console.log(req.body);
    var avaliacao = {};
    var minhaMedia = {};

    // Criar a query antes de fazer o update no banco de dados
    // Primeiro recurar a media do banco de dados
    // Segundo verificar as estrelas para calcular a nova media
    var media = 0;
    produtos.find({
        '_id': req.body.id
    }, function(err, dd) {
        if (err) return console.error(err);
        console.log("data retrieved: ", dd);
        if (typeof dd[0]['avaliacao'].media !== "undefined") {
            media = dd[0]['avaliacao'].media;
            console.log("Minha media: ", media);
        } else {
            console.log("Media vazia!");
            media = 0;
        }
        //res.send(dd); //send the data to client
        switch (req.body.avaliacao) {
            case 'cinco':
                if (media == 0) {
                    media = 5
                } else {
                    media = (media + 5) / 2;
                }
                avaliacao['avaliacao.cinco'] = 1;
                minhaMedia['avaliacao.media'] = media;
                break;
            case 'quatro':
                if (media == 0) {
                    media = 4;
                } else {
                    media = (media + 4) / 2;
                }
                avaliacao['avaliacao.quatro'] = 1;
                minhaMedia['avaliacao.media'] = media;
                break;
            case 'tres':
                if (media == 0) {
                    media = 3;
                } else {
                    media = (media + 3) / 2;
                }
                avaliacao['avaliacao.tres'] = 1;
                minhaMedia['avaliacao.media'] = media;
                break;
            case 'dois':
                if (media == 0) {
                    media = 2;
                } else {
                    media = (media + 2) / 2;
                }
                avaliacao['avaliacao.dois'] = 1;
                minhaMedia['avaliacao.media'] = media;
                break;
            case 'um':
                if (media == 0) {
                    media = 1;
                } else {
                    media = (media + 1) / 2;
                }
                avaliacao['avaliacao.um'] = 1;
                minhaMedia['avaliacao.media'] = media;
                break;
        }

        //var av = "avaliacao.cinco";
        //console.log("minha variavel que nao chega", avaliacao);
        produtos.update({
            '_id': req.body.id
        }, {
            $set: minhaMedia
        }, {
            $inc: avaliacao
        }, function(err, raw) {
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });
        produtos.update({
            '_id': req.body.id
        }, {
            $inc: avaliacao
        }, function(err, raw) {
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        });
        //produtos.where({_id:req.body.id}).update({$inc:{'preco':1}});
        res.send('');
    });

});

//Search url
app.post('/produtos/search', function(req, res) {
    var searcQuery = req.body;
    console.log(searcQuery);

    produtos.find(searcQuery, function(err, searchData) {
        if (err) return handlleError(err);
        console.log('Search result data', searchData)
        res.send(searchData)
    });
});

app.post('/users/signup', function(req, res) {
    console.log(req.body.user)
    var user = new User({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: req.body.user.password
    })

    user.save(function(err, data) {
        if (err) {
            //            return handlleError(err);
            if (err.code == 1100) {
                err = 'Este e-mail já existe, tente outro e-mail.'
            }
        }
        console.log(data)

    })

    res.send({
        data: 'user created successfully'
    })

});

app.post('/users/login', function(req, res) {
    console.log(req.body)
    User.findOne({email: req.body.user.email, password: req.body.user.password})
//        .set('password', false)
        .exec(function(err, data) {
        if (err) return handleeError(err)
        console.log('user data', data);
        if (data) {
            var user={
                name: data.email
              }
            console.log(user)
            res.send(user)
            console.log('Usuario encontrado!');
   

        } else {
            res.send({data: 'email ou senha incorretos'})
        }
    
    })
        


});

////url /produtos/:getcategoria
////COMMOM FILTER
//var marca = "camera";
//var value = 10;
//var query = {};
//query[marca] = value;
//
////console.log(query)
////FIND LED TV
//produtos.find(query, function(err, doc) {
//    if (err) return console.error(err);
//    console.log("Retrieved Data", doc);
//});