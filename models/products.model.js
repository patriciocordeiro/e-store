'use strict'
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic'); // for elastic seach
var productsSchema = new mongoose.Schema({
    //    _id:Array,
    categoria: String,
    subcategoria: String,
    ref_PM: String,
    ref_fabricante: String,
    disponibilidade: {
        type: Number
    },
    preco: Number,
    descricao: String,
    imagens: String,
    tags: {
        type: String,
        //        es_indexed: true
    },
    caracteristicas: [{
        nome: String,
        valor: String
    }, ],


    //    name: String,
    //    categoria: String,
    //    marca: String,
    //    tamanho_tela: Number,
    //    camera: String,
    //    caracteristicas: String,
    //    memoria_interna: String,
    //    sistema_operacional: String,
    //    preco: Number,
    //    media_avaliacoes: Number,
    //    avaliacao_produto: [{
    //        //_id:false,
    //        titulo:String,
    //        avaliacao:Number,
    //        opiniao: String,
    //        nome: String,
    //        email: String
    //    }]
});
/*elastic search using mongoosastic*/
productsSchema.plugin(mongoosastic);

//create the model for products and expose it to our app
module.exports = mongoose.model('produtos', productsSchema);