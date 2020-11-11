var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../../middlewares/autenticacion');


//var SEED = require('../config/config').SEED;


var app = express();
const SpendingAccount = require('../models');


//===================================================
//Obtener todas las empresas
//===================================================

app.get('/', function(req, res) {

    /* var desde = req.query.desde || 0;
    desde = Number(desde); */

    /*  Usuario.user.findAll({ atributes: ['id', 'name', 'userName'] }, (err, usuarios) => { */

    SpendingAccount.spendingAccount.findAll()
        .then(spendingAccount => {

            res.status(200).json({
                ok: true,
                spendingAccount: spendingAccount
            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando cuentas de gasto',
                errors: err
            });
        })
});


// ==========================================
// Obtener una compañia por ID
// ==========================================

app.get('/:id', (req, res) => {
    var id = req.params.id;
    SpendingAccount.spendingAccount.findByPk(id)
        .then(spendingAccount => {

            if (!spendingAccount) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la cuenta de gasto con ' + id + 'no existe',
                    errors: { message: 'No existe una cuenta de gasto con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                spendingAccount: spendingAccount

            });
        })
        .catch(err => {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar una cuenta de gasto',
                errors: err
            });
        })

});


module.exports = app;