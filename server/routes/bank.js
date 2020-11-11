var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const Bank = require('../models');


//===================================================
//Obtener todas las empresas
//===================================================

app.get('/', function(req, res) {

    Bank.bank.findAll()
        .then(bank => {

            res.status(200).json({
                ok: true,
                bank: bank
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando bancos',
                errors: err
            });
        })
});


// ==========================================
// Obtener una compañia por ID
// ==========================================

app.get('/:id/bank', (req, res) => {
    var id = req.params.id;
    // Bank.bank.findByPk(id)
    Bank.bank.findAll({ where: { id: id } })
        .then(bank => {

            if (!bank) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'el banco con ' + id + 'no existe',
                    errors: { message: 'No existe un banco con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                bank: bank

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un banco',
                errors: err
            });
        })

});


module.exports = app;