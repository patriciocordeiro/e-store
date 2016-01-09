'use strict'
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local: {
        username: String,
        nome: String,
        sobrenome: String,
        email: String,
        password: String,
        resetPasswordToken:String,
        resetPasswordExpires:Date,
        sexo: String,
        cpf: String,
        birthDate: Date,
        telefone: String,
        celular: String,
        endereco: {
            tipoEndereco: String,
            cep: String,
            endereco: String,
            complemento:String,
            numero: String,
            referencia: String,
            bairro: String,
            cidade: String,
            estado: String
        },
        //        pedidos:{
        //            _id:ObjectId
        //        }

    },

    facebook: {
        id: String,
        token: String,
        email: String,
        name: String

    },

    pedidos:[
        {
            data: String,
            compras: [
                {
                    id: String,
                    quantidade: Number
                }
            ]
        }
    ],
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, this.local.password);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);