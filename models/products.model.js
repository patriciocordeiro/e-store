'use strict'
var mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
//    _id:Array,
    name: String,
    categoria: String,
    marca: String,
    tamanho_tela: Number,
    camera: String,
    caracteristicas: String,
    memoria_interna: String,
    sistema_operacional: String,
    preco: Number,
    avaliacao_produto: [{
        //_id:false,
        titulo:String,
        avaliacao:Number,
        opiniao: String,
        nome: String,
        email: String
    }]
});

//create the model for products and expose it to our app
module.exports = mongoose.model('produtos', productsSchema);