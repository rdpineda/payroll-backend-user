var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const PaymentFrequency = require('../models');


//===================================================
//Obtener todas las empresas
//===================================================

app.get('/', function(req, res) {

    PaymentFrequency.paymentFrequency.findAll()
        .then(paymentFrequency => {

            res.status(200).json({
                ok: true,
                paymentFrequency: paymentFrequency
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando frecuencia de pago',
                errors: err
            });
        })
});


// ==========================================
// Obtener una compañia por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    PaymentFrequency.paymentFrequency.findByPk(id)
        .then(paymentFrequency => {

            if (!paymentFrequency) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la frecuencia de pago con ' + id + 'no existe',
                    errors: { message: 'No existe una frecuencia de pago con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                paymentFrequency: paymentFrequency

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un frecuencia de pago',
                errors: err
            });
        })

});


module.exports = app;