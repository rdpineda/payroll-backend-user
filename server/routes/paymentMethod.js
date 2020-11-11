var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const PaymentMethod = require('../models');


//===================================================
//Obtener todas las empresas
//===================================================

app.get('/', function(req, res) {

    PaymentMethod.paymentMethod.findAll()
        .then(paymentMethod => {

            res.status(200).json({
                ok: true,
                paymentMethod: paymentMethod
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando metodos de pago',
                errors: err
            });
        })
});


// ==========================================
// Obtener una compañia por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    PaymentMethod.paymentMethod.findByPk(id)
        .then(paymentMethod => {

            if (!paymentMethod) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el metodo de pago con ' + id + 'no existe',
                    errors: { message: 'No existe un metodo de pago de pago con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                paymentMethod: paymentMethod

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un metodo de pago',
                errors: err
            });
        })

});


module.exports = app;