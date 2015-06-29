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
    avaliacao: {
        media: Number,
        cinco: Number,
        quatro: Number,
        tres: Number,
        dois: Number,
        um: Number
    }
});

//create the model for products and expose it to our app
module.exports = mongoose.model('produtos', productsSchema);